/* robin.syihab.st — landing page: wall of code + editor buffer
   Animasi ala hancore.dev/glimpse.js: caret berkedip, typing bertempo,
   typo lalu dikoreksi, warna per token, karakter menguap (vanish). */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.node'));
  var buffer = document.getElementById('buffer');
  var input = document.querySelector('.filter-input');
  var tree = document.getElementById('tree');
  var active = 0;
  var helpOpen = false;
  var lastG = 0;

  if (!nodes.length) return;

  /* ------------------------------------------------------------------ theme */
  var KEY = 'robin-landing-theme';
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setTheme(t) {
    doc.setAttribute('data-landing-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    document.dispatchEvent(new CustomEvent('landing:theme', { detail: t }));
  }
  var s = stored();
  if (s === 'light' || s === 'dark') doc.setAttribute('data-landing-theme', s);
  Array.prototype.forEach.call(document.querySelectorAll('[data-theme-key]'), function (el) {
    el.addEventListener('click', function () {
      setTheme(doc.getAttribute('data-landing-theme') === 'dark' ? 'light' : 'dark');
    });
  });

  /* ---------------------------------------------------------- caret & typing */
  var titleSeq = 0, cmdSeq = 0;

  function newCaret() {
    var c = document.createElement('span');
    c.className = 'caret';
    return c;
  }

  /* ngetik karakter demi karakter, dengan caret yang nempel di ekor teks */
  function typeInto(el, text, speed, seq) {
    if (!el) return;
    el.textContent = '';
    var caret = newCaret();
    el.appendChild(caret);
    var i = 0;
    (function step() {
      if (seq !== titleSeq) return;
      if (i >= text.length) return;
      caret.insertAdjacentText('beforebegin', text.charAt(i++));
      setTimeout(step, speed);
    })();
  }

  function typeTitle(el) {
    if (!el || reduceMotion) return;
    var text = el.textContent;
    var seq = ++titleSeq;
    var speed = Math.max(6, Math.min(15, Math.round(820 / Math.max(1, text.length))));
    typeInto(el, text, speed, seq);
  }

  function revealBuffer() {
    if (!buffer || reduceMotion) return;
    ['d-meta', 'd-desc', 'd-url', 'd-open'].forEach(function (cls, k) {
      var el = buffer.querySelector('.' + cls);
      if (el) el.style.animationDelay = (0.1 + k * 0.06) + 's';
    });
  }

  /* boot ala hancore: tiga kedip lalu ketik perintahnya */
  function bootCmdline() {
    var cmd = document.querySelector('[data-cmd]');
    if (!cmd) return;
    var cmdText = 'nvim ~/blog/posts';
    if (reduceMotion) { cmd.textContent = cmdText; return; }
    var caret = newCaret();
    cmd.appendChild(caret);
    var seq = ++cmdSeq;
    var i = 0;
    function tick() {
      if (seq !== cmdSeq) return;
      if (i >= cmdText.length) {
        setTimeout(function () {
          if (seq !== cmdSeq) return;
          cmd.textContent = '';
          cmd.appendChild(caret);
        }, 2800);
        return;
      }
      caret.insertAdjacentText('beforebegin', cmdText.charAt(i++));
      setTimeout(tick, 52 + Math.random() * 78);
    }
    setTimeout(tick, 3 * 620);
  }

  /* ------------------------------------------------------------ buffer pane */
  function render(i) {
    var node = nodes[i];
    if (!node) return;
    active = i;
    nodes.forEach(function (n, k) {
      var on = k === i;
      n.classList.toggle('is-active', on);
      var g = n.querySelector('.glyph');
      if (g) g.textContent = on ? '\u25B8' : '\u00B7';
      if (on) n.setAttribute('aria-current', 'true'); else n.removeAttribute('aria-current');
    });

    var slug = node.getAttribute('data-slug') || '';
    var tpl = node.nextElementSibling;
    if (buffer && tpl && tpl.tagName === 'TEMPLATE') {
      var frag = tpl.content.cloneNode(true);
      var open = document.createElement('a');
      open.className = 'd-open';
      open.href = node.getAttribute('href');
      open.innerHTML = 'open <span class="key">\u21B5</span>';
      frag.appendChild(open);
      buffer.replaceChildren.apply(buffer, Array.prototype.slice.call(frag.children));
      buffer.scrollTop = 0;
      typeTitle(buffer.querySelector('.d-title'));
      revealBuffer();
    }
    helpOpen = false;

    var tf = document.querySelector('[data-tabfile]');
    if (tf) tf.textContent = slug + '.md';
    var wb = document.querySelector('[data-winbar]');
    if (wb) wb.textContent = 'posts/' + slug + '.md';
    var sp = document.querySelector('[data-status-path]');
    if (sp) sp.textContent = '~/blog/posts/' + slug + '.md';
    var pos = document.querySelector('[data-status-pos]');
    if (pos) pos.textContent = (i + 1) + '/' + nodes.length;
  }

  function visible() {
    return nodes.filter(function (n) { return !n.classList.contains('is-hidden'); });
  }

  function move(step) {
    var list = visible();
    if (!list.length) return;
    var cur = list.indexOf(nodes[active]);
    if (cur === -1) cur = 0;
    var next = Math.max(0, Math.min(list.length - 1, cur + step));
    var el = list[next];
    render(nodes.indexOf(el));
    if (el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }

  function renderHelp() {
    if (!buffer) return;
    titleSeq++;
    helpOpen = true;
    var rows = [
      ['j / \u2193', 'artikel berikutnya'],
      ['k / \u2191', 'artikel sebelumnya'],
      ['g g', 'ke paling atas'],
      ['G', 'ke paling bawah'],
      ['enter \u21B5', 'buka artikel'],
      ['/', 'cari / filter artikel'],
      ['esc', 'bersihkan pencarian'],
      ['?', 'tutup bantuan ini']
    ];
    var html = '<div class="d-title">Bantuan</div><div class="d-meta">keyboard</div><div class="help">';
    rows.forEach(function (r) {
      html += '<div class="help-row"><span class="key">' + r[0] + '</span><span class="help-text">' + r[1] + '</span></div>';
    });
    html += '</div>';
    buffer.innerHTML = html;
  }

  /* ----------------------------------------------------------- filtering */
  function applyFilter(q) {
    q = (q || '').trim().toLowerCase();
    nodes.forEach(function (n) {
      var hay = (n.getAttribute('data-slug') + ' ' + n.getAttribute('data-title') + ' ' + n.textContent).toLowerCase();
      n.classList.toggle('is-hidden', q !== '' && hay.indexOf(q) === -1);
    });
    var walk = tree ? tree.children : [];
    for (var i = 0; i < walk.length; i++) {
      var el = walk[i];
      if (!el.classList || !el.classList.contains('year')) continue;
      var group = walk[i + 1];
      var has = false;
      if (group && group.classList && group.classList.contains('year-group')) {
        has = group.querySelectorAll('.node:not(.is-hidden)').length > 0;
        group.classList.toggle('is-hidden', !has);
      }
      el.classList.toggle('is-hidden', !has);
    }
    var list = visible();
    if (list.length && list.indexOf(nodes[active]) === -1) render(nodes.indexOf(list[0]));
  }

  if (input) input.addEventListener('input', function () { applyFilter(input.value); });

  /* ------------------------------------------------------------ keyboard */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      if (e.key === 'Escape') { e.target.value = ''; applyFilter(''); e.target.blur(); }
      if (e.key === 'Enter') {
        var list = visible();
        if (list.length) window.location.href = list[0].getAttribute('href');
      }
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case 'j': case 'ArrowDown': e.preventDefault(); move(1); break;
      case 'k': case 'ArrowUp': e.preventDefault(); move(-1); break;
      case 'g':
        if (Date.now() - lastG < 700) {
          var top = visible()[0];
          if (top) { render(nodes.indexOf(top)); if (top.scrollIntoView) top.scrollIntoView({ block: 'nearest' }); }
        }
        lastG = Date.now();
        break;
      case 'G':
        var l = visible();
        if (l.length) render(nodes.indexOf(l[l.length - 1]));
        break;
      case 'Enter':
        e.preventDefault();
        window.location.href = nodes[active].getAttribute('href');
        break;
      case '/':
        e.preventDefault();
        if (input) input.focus();
        break;
      case '?':
        e.preventDefault();
        if (helpOpen) render(active); else renderHelp();
        break;
      case 'Escape':
        if (helpOpen) render(active);
        break;
    }
  });

  /* ---------------------------------------------- wall of code (tile engine) */
  (function () {
    var canvas = document.querySelector('.wall');
    if (!canvas || !canvas.getContext || window.innerWidth <= 760) return;
    var ctx = canvas.getContext('2d');

    var CW = 7.9, CH = 14, FONT = '13px "IBM Plex Mono", ui-monospace, monospace';
    var TICK = 55;
    var VANISH = [14, 42];
    var DIM = 1.2;
    var MSG_ALPHA = 0.85;
    var GLYPHS = '\u2591\u2592\u2593/\\<>+=*#%&@$0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var NEAR = { ';': ':', ':': ';', '(': '[', ')': ']', '=': '-', '-': '=', '.': ',', ',': '.', '/': '?', '+': '=', '*': '8', '&': '7', '!': '1', '?': '/' };
    var KIND = { comment: 0.42, keyword: 0.95, string: 0.7, func: 0.85, ident: 0.58, punct: 0.38, number: 0.7 };
    var KEYWORDS = 'const|let|var|return|await|async|function|import|export|from|if|else|for|new|of|in|true|false|null|this|class|try|catch'.split('|');
    var MESSAGES = [
      ['saya menulis', 'supaya berpikir', 'lebih jernih.'],
      ['soal teknologi,', 'kadang soal hidup,', 'dan apa pun di antaranya.']
    ];
    var TITLES = nodes.map(function (n) { return (n.getAttribute('data-title') || '').trim(); }).filter(Boolean);

    var cols = 0, rows = 0, field = [], hot = {}, typers = [], fixes = [];
    var msg = null, ticks = 0, dpr = 1, timer = null, msgTimer = null, live = false;

    function ink() {
      var v = getComputedStyle(doc).getPropertyValue('--wall-ink').trim();
      return v || '235, 230, 219';
    }
    function rand(a, b) { return a + Math.random() * (b - a); }
    function idx(x, y) { return y * cols + x; }

    function paint(i, ch, a) {
      var x = (i % cols) * CW, y = Math.floor(i / cols) * CH;
      ctx.clearRect(x - 1, y - 1, CW + 2, CH + 2);
      if (!ch) return;
      ctx.globalAlpha = a;
      ctx.fillText(ch, x, y + 11);
      ctx.globalAlpha = 1;
    }

    function put(i, ch, a) {
      hot[i] = { ch: ch, a: a, d: a / rand(VANISH[0], VANISH[1]) };
      paint(i, ch, a);
    }

    /* teks + alpha per karakter (komentar redup, keyword terang, dst.) */
    function typed(text, kind) {
      var alphas = [], i;
      if (kind) {
        for (i = 0; i < text.length; i++) alphas.push(KIND[kind]);
        return { text: text, alphas: alphas };
      }
      var tokens = text.match(/\/\/.*$|'[^']*'|"[^"]*"|[A-Za-z_][A-Za-z0-9_]*|\d+|\s+|./g) || [text];
      tokens.forEach(function (tok) {
        var a = KIND.ident;
        if (tok.indexOf('//') === 0) a = KIND.comment;
        else if (/^['"]/.test(tok)) a = KIND.string;
        else if (/^\d/.test(tok)) a = KIND.number;
        else if (/^[A-Za-z_]/.test(tok)) a = KEYWORDS.indexOf(tok) > -1 ? KIND.keyword : (/^[a-z][a-z0-9]*$/.test(tok) ? KIND.func : KIND.ident);
        else if (/^\s+$/.test(tok)) a = 0;
        else a = KIND.punct;
        for (var k = 0; k < tok.length; k++) alphas.push(a);
      });
      return { text: text, alphas: alphas };
    }

    function makeLine(w) {
      var t = (TITLES[Math.floor(Math.random() * TITLES.length)] || 'catatan kecil').toLowerCase()
        .replace(/[^a-z0-9 -]/g, ' ').replace(/\s+/g, ' ').replace(/^ | $/g, '');
      var words = t.split(' ').filter(Boolean);
      function slug(n) {
        var out = [];
        for (var i = 0; i < n; i++) out.push(words[Math.floor(Math.random() * words.length)] || 'notes');
        return out.join('-');
      }
      var r = Math.random();
      if (r < 0.5) return typed('// ' + t.slice(0, w - 3), 'comment');
      if (r < 0.72) return typed("const " + slug(2) + " = await tulis('" + slug(3) + "')" , null);
      if (r < 0.88) return typed('export function ' + slug(1) + '(draft) {', null);
      return typed('# ' + slug(3) + ' -- ' + slug(2), 'comment');
    }

    function spawn(kind) {
      var isMsg = kind === 'message';
      var lines = [], w, i;
      if (isMsg) {
        var m = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        w = 30;
        m.forEach(function (l) { lines.push(typed(l, null)); });
      } else {
        w = Math.round(rand(20, 38));
        var n = 2 + Math.floor(Math.random() * 2);
        for (i = 0; i < n; i++) lines.push(makeLine(w));
      }
      var len = 0;
      lines.forEach(function (l) { len = Math.max(len, l.text.length); });
      var col = isMsg ? Math.max(2, Math.round((cols - len) / 2)) : Math.round(rand(3, Math.max(4, cols - len - 3)));
      var row = Math.round(rand(1, Math.max(2, rows - lines.length - 2)));
      return { lines: lines, col: col, row: row, li: 0, ci: 0, acc: 0, hold: 0, done: false, msg: isMsg };
    }

    function drawCaret(t, show) {
      var i = idx(t.col + t.ci, t.row + t.li);
      if (i < 0 || i >= cols * rows) return;
      var x = (i % cols) * CW, y = Math.floor(i / cols) * CH;
      ctx.clearRect(x - 1, y - 1, CW + 2, CH + 2);
      var h = hot[i];
      if (h) paint(i, h.ch, h.a);
      if (!show) return;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(x, y + 3, CW - 1.5, CH - 5);
      ctx.globalAlpha = 1;
    }

    function step(t) {
      if (t.hold > 0) { t.hold--; return; }
      if (t.done) return;
      var line = t.lines[t.li];
      if (!line) { t.done = true; t.hold = t.msg ? 110 : 45; return; }
      t.acc++;
      if (t.acc % (t.msg ? 3 : 2)) return;
      if (t.ci >= line.text.length) {
        if (t.li >= t.lines.length - 1) { t.done = true; t.hold = t.msg ? 110 : 45; return; }
        t.li++; t.ci = 0; t.hold = t.msg ? 6 : 3;
        return;
      }
      var ch = line.text.charAt(t.ci);
      var a = (line.alphas[t.ci] || KIND.ident) * (t.msg ? (MSG_ALPHA / KIND.func) : DIM);
      var i = idx(t.col + t.ci, t.row + t.li);
      if (i >= 0 && i < cols * rows && ch !== ' ') {
        if (!t.msg && Math.random() < 0.06 && NEAR[ch]) {
          put(i, NEAR[ch], a);
          fixes.push({ i: i, ch: ch, a: a, at: performance.now() + 150 + Math.random() * 130 });
        } else {
          put(i, ch, a);
        }
      }
      t.ci++;
    }

    function frame() {
      ticks++;
      if (document.hidden) return;

      var i, k, c;
      var churn = Math.max(3, Math.round(cols * rows / 5000));
      for (k = 0; k < churn; k++) {
        i = Math.floor(Math.random() * cols * rows);
        if (hot[i]) continue;
        c = field[i] || (field[i] = {});
        c.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        c.a = rand(0.02, 0.055);
        paint(i, c.ch, c.a);
      }

      for (i = 0; i < typers.length; i++) {
        step(typers[i]);
        if (typers[i].done && typers[i].hold <= 0) typers[i] = spawn('code');
      }
      if (msg) {
        step(msg);
        if (msg.done && msg.hold <= 0) msg = null;
      }

      if (fixes.length) {
        var now = performance.now();
        fixes = fixes.filter(function (f) {
          if (f.at > now) return true;
          put(f.i, f.ch, f.a);
          return false;
        });
      }

      for (var key in hot) {
        var h = hot[key];
        h.a -= h.d;
        if (h.a <= 0.015) { delete hot[key]; paint(key, '', 0); }
        else paint(key, h.ch, h.a);
      }

      var blink = Math.floor(ticks / 9) % 2 === 0;
      for (i = 0; i < typers.length; i++) drawCaret(typers[i], blink);
      if (msg) drawCaret(msg, blink);
    }

    function repaint() {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (var i = 0; i < cols * rows; i++) if (field[i]) paint(i, field[i].ch, field[i].a);
      for (var key in hot) paint(key, hot[key].ch, hot[key].a);
    }

    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      var w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT;
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = 'rgb(' + ink() + ')';
      cols = Math.max(1, Math.ceil(w / CW));
      rows = Math.max(1, Math.ceil(h / CH));
      field = [];
      hot = {};
      fixes = [];
      typers = [];
      msg = null;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < cols * rows; i++) {
        field[i] = { ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)], a: rand(0.02, 0.055) };
        paint(i, field[i].ch, field[i].a);
      }
    }

    function start() {
      resize();
      if (reduceMotion) return;
      live = true;
      setTimeout(function () { if (live) typers.push(spawn('code')); }, 700);
      setTimeout(function () { if (live) typers.push(spawn('code')); }, 1500);
      setTimeout(function () { if (live) typers.push(spawn('code')); }, 2700);
      setTimeout(function () { if (live) typers.push(spawn('code')); }, 3900);
      timer = setInterval(frame, TICK);
      msgTimer = setInterval(function () {
        if (!msg) msg = spawn('message');
      }, 17000);

      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
          ctx.fillStyle = 'rgb(' + ink() + ')';
          resize();
        }, 250);
      });
      document.addEventListener('landing:theme', function () {
        ctx.fillStyle = 'rgb(' + ink() + ')';
        repaint();
      });
    }

    start();
  })();

  /* ------------------------------------------------------------------ start */
  nodes.forEach(function (n, i) {
    if (i < 14) n.style.animationDelay = (i * 26) + 'ms';
  });
  render(0);
  bootCmdline();

  /* jam live di statusline (biar ada tanda "hidup") */
  (function clock() {
    var el = document.querySelector('[data-clock]');
    if (!el) return;
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var d = new Date();
      el.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    tick();
    setInterval(tick, 1000);
  })();
})();
