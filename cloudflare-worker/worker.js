const ALLOWED_ORIGINS = [
  "https://procurawest.ca",
  "https://www.procurawest.ca"
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": corsOrigin,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateLimitKey = `rate:${ip}`;
    const current = parseInt(await env.RATE_LIMIT?.get(rateLimitKey) || "0");
    if (current >= 10) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": corsOrigin }
      });
    }

    try {
      const { email, groups, fields } = await request.json();

      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.MAILERLITE_API_KEY}`
        },
        body: JSON.stringify({ email, groups, fields })
      });

      const data = await res.json();

      if (env.RATE_LIMIT) {
        await env.RATE_LIMIT.put(rateLimitKey, String(current + 1), { expirationTtl: 60 });
      }

      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": corsOrigin
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": corsOrigin
        }
      });
    }
  }
};
