(function(){
  if(/quiz\.html/.test(location.pathname)) return;

  var s = document.createElement('style');
  s.textContent = [
    '.qb{position:fixed;bottom:24px;right:24px;z-index:100;display:flex;align-items:center;gap:10px;',
    'background:#C4844E;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:15px;',
    'font-weight:400;letter-spacing:.01em;padding:14px 22px 14px 18px;border-radius:50px;',
    'box-shadow:0 4px 20px rgba(196,132,78,.45),0 0 0 0 rgba(196,132,78,.4);',
    'cursor:pointer;text-decoration:none;transition:transform .25s,box-shadow .25s;',
    'animation:qbPulse 3s ease-in-out infinite}',
    '.qb:hover{transform:scale(1.06);box-shadow:0 6px 28px rgba(196,132,78,.55)}',
    '.qb svg{flex:0 0 auto}',
    '@keyframes qbPulse{0%,100%{box-shadow:0 4px 20px rgba(196,132,78,.45),0 0 0 0 rgba(196,132,78,.4)}',
    '50%{box-shadow:0 4px 20px rgba(196,132,78,.45),0 0 0 8px rgba(196,132,78,0)}}',
    '@media(max-width:540px){.qb{bottom:16px;right:16px;font-size:14px;padding:12px 18px 12px 14px}}'
  ].join('');
  document.head.appendChild(s);

  var a = document.createElement('a');
  a.href = 'quiz.html';
  a.className = 'qb';
  a.setAttribute('aria-label','Take the 2-minute procurement quiz');
  a.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#fff" stroke-width="1.5"/><path d="M7.5 7.5a2.5 2.5 0 0 1 4.6 1.3c0 1.7-2.5 1.7-2.5 3.2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="15" r=".8" fill="#fff"/></svg>Take the Quiz';

  document.body.appendChild(a);
})();
