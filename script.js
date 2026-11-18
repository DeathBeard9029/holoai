'use strict';

/* Сайт HoloAI: падающий код на фоне и переключение языка ru/en.
   Русский текст — в разметке, английский — в словаре ниже. Внешних запросов нет. */

/* ─── Падающий код ─── */
(function rain() {
  const canvas = document.getElementById('rain');
  const g = canvas.getContext('2d');
  const CHARS = '01アイウエオカキクケコサシスセソタチツテト<>{}[]=;/+*$#';
  const STEP = 24;          // ширина колонки
  const FRAME_MS = 70;      // скорость
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cols = [];
  let w = 0;
  let h = 0;
  let last = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = [];
    for (let x = 6; x < w; x += STEP) {
      if (Math.random() < 0.3) continue; // часть колонок пустая — фон не мешает тексту
      cols.push({ x, y: Math.random() * h * 1.5 - h * 0.5, len: 5 + Math.floor(Math.random() * 14), speed: 0.5 + Math.random() });
    }
    draw();
  }

  function draw() {
    g.clearRect(0, 0, w, h);
    g.font = '18px Consolas, monospace';
    for (const c of cols) {
      for (let i = 0; i < c.len; i++) {
        const y = c.y + i * 22;
        if (y < -20 || y > h + 20) continue;
        const head = i === c.len - 1;
        g.fillStyle = head ? 'rgba(226,244,248,0.55)' : `rgba(143,200,214,${0.03 + (i / c.len) * 0.16})`;
        g.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], c.x, y);
      }
    }
  }

  function tick(now) {
    if (now - last >= FRAME_MS) {
      last = now;
      for (const c of cols) {
        c.y += 22 * c.speed * 0.5;
        if (c.y > h + 40) c.y = -c.len * 22 - Math.random() * 200;
      }
      draw();
    }
    if (!document.hidden) requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !reduced) requestAnimationFrame(tick); });
  resize();
  if (!reduced) requestAnimationFrame(tick);
}());

/* ─── Язык ─── */
(function i18n() {
  const EN = {
    'nav.features': 'Features',
    'nav.plans': 'Plans',
    'nav.start': 'Get started',
    'nav.faq': 'FAQ',
    'nav.get': 'Get a key',
    'hero.sub': 'Holocos AI assistant for your Windows desktop',
    'hero.get': 'Get a key on Boosty',
    'hero.write': 'Message the author',
    'hero.note': 'Version 0.5v · BETA · Windows 10 and 11',
    'f.title': 'Features',
    'f.win.t': 'Holographic windows',
    'f.win.d': 'Glass windows with a "dot → line → window" animation, blurred background and falling code. Two themes: Classic and HoloAI.',
    'f.chat.t': 'AI chat',
    'f.chat.d': 'Claude and Gemini with your own API keys: streaming replies, attachments with images, PDF and text. Keys are stored encrypted.',
    'f.rei.t': 'Holocos on your desktop',
    'f.rei.d': 'The assistant is a gray rotating rhombus: it hovers above the taskbar, answers in a speech bubble and reacts to your words and mood. You can pick him up with the mouse, and in Demo he can break into cubes and come back together.',
    'f.voice.t': 'Voice and vision <span class="tag">Demo</span>',
    'f.voice.d': 'Talk to Holocos, hear his answers, control windows and music with voice commands. With your permission Holocos sees the active window and can help.',
    'f.tools.t': 'Tools',
    'f.tools.d': 'Notes, tasks with reminders, timer and Pomodoro, weather, calculator and converter, quick launch, mini system monitor.',
    'f.music.t': 'Player',
    'f.music.d': 'A mini player with a spectrum shows what is playing on your computer and keeps history and favorites.',
    'p.title': 'Plans',
    'p.lead': 'HoloAI runs with a license key. The author sends the key after you subscribe on Boosty.',
    'p.beta.sub': 'For everyday use',
    'p.beta.1': 'Holographic windows and themes',
    'p.beta.2': 'AI chat with your own API keys',
    'p.beta.3': 'Holocos on your desktop',
    'p.beta.4': 'Notes, tasks, player, tools',
    'p.beta.5': 'No voice or vision for Holocos, no initiative of his, console AI clients or cube decay effect',
    'p.demo.sub': 'All features, new builds first',
    'p.demo.1': 'Everything in Beta',
    'p.demo.2': 'Voice: speech recognition, Holocos\'s voice, voice commands',
    'p.demo.3': 'Holocos\'s vision and his initiative',
    'p.demo.4': 'Console AI clients: Claude Code, Gemini CLI, Codex CLI',
    'p.demo.5': 'Holocos breaking into cubes and reassembling on threads',
    'p.choose': 'Subscribe on Boosty',
    's.title': 'Get started',
    's.1.t': 'Subscribe',
    's.1.d': 'Choose the Beta or Demo level on Boosty. The author will send your personal HAI1-… license key in messages.',
    's.2.t': 'Download the installer',
    's.2.d': 'The archive with HoloAI-Setup.exe and instructions is in the subscribers\' post. No admin rights needed.',
    's.3.t': 'Paste the key',
    's.3.d': 'The installer asks for the key on the "License key" page. Paste it in full; spaces and line breaks are fine.',
    'q.title': 'FAQ',
    'q.1.q': 'What does HoloAI run on?',
    'q.1.a': 'Windows 10 or 11 (64-bit), about 400 MB of disk space.',
    'q.2.q': 'Is the AI included in the subscription?',
    'q.2.a': 'No. The chat works with your own Claude or Gemini API keys, which you add in the API Keys window. The subscription unlocks the program itself.',
    'q.3.q': 'Do I need the internet?',
    'q.3.a': 'The license key is checked on your computer, offline. The internet is needed for AI replies, weather and exchange rates.',
    'q.4.q': 'Windows says "Windows protected your PC"',
    'q.4.a': 'The program is not signed with a paid certificate yet. Click "More info" → "Run anyway".',
    'q.5.q': 'Where is my data stored?',
    'q.5.a': 'Settings, notes, history and API keys stay on your computer only. Keys are encrypted by Windows.',
    'q.6.q': 'Who makes the project?',
    'q.6.a': 'One developer, DeathBeard. The project is written in JavaScript (Electron and Node.js). Send ideas and bug reports on Telegram.',
    'foot.by': 'Author:',
    'foot.note': 'HoloAI is beta software.',
  };
  const TITLE = { ru: document.title, en: 'HoloAI — Holocos AI assistant for Windows' };
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const RU = new Map(nodes.map((n) => [n, n.innerHTML])); // русский — как в разметке
  const btn = document.getElementById('lang');

  function apply(lang) {
    for (const n of nodes) n.innerHTML = lang === 'en' ? (EN[n.dataset.i18n] || RU.get(n)) : RU.get(n);
    document.documentElement.lang = lang;
    document.title = TITLE[lang];
    btn.textContent = lang === 'en' ? 'RU' : 'EN';
    try { localStorage.setItem('holoai-lang', lang); } catch { /* хранилище недоступно — язык на один визит */ }
  }

  let saved = null;
  try { saved = localStorage.getItem('holoai-lang'); } catch { saved = null; }
  // По умолчанию: русский для ru/uk/be, иначе английский
  let lang = saved === 'ru' || saved === 'en' ? saved : (/^(ru|uk|be)/i.test(navigator.language || '') ? 'ru' : 'en');
  btn.addEventListener('click', () => {
    lang = lang === 'en' ? 'ru' : 'en';
    apply(lang);
  });
  apply(lang);
}());
