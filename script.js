/* ============================================================
   🎂 BIRTHDAY WEBSITE — SHARED JS  (Performance Edition)
   ============================================================ */

// ── Detect mobile once ────────────────────────────────────────
const IS_MOBILE = window.innerWidth <= 768 ||
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ── Apply config names everywhere ────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.CONFIG || {};
  document.querySelectorAll('[data-name]').forEach(el => {
    el.textContent = cfg.SISTER_NAME || el.textContent;
  });
  document.querySelectorAll('[data-nick]').forEach(el => {
    el.textContent = cfg.SISTER_NICKNAME || el.textContent;
  });

  initMusic();
  initTransitionFadeIn();

  // Fewer particles on mobile to avoid lag
  spawnFloatingHearts();
  if (!IS_MOBILE) spawnPetals();
});

// ── Music ─────────────────────────────────────────────────────
let audio = null;
let musicPlaying = false;

function initMusic() {
  const cfg = window.CONFIG || {};
  const btn = document.getElementById('music-btn');
  if (!btn) return;

  const src = cfg.MUSIC_FILE || '';
  if (src) {
    audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
  }
  btn.addEventListener('click', toggleMusic);
}

function toggleMusic() {
  const btn = document.getElementById('music-btn');
  if (!audio) {
    btn.title = 'Add a music file in config.js → MUSIC_FILE';
    return;
  }
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    btn.classList.remove('playing');
    btn.textContent = '🎵';
  } else {
    audio.play().catch(() => {});
    musicPlaying = true;
    btn.classList.add('playing');
    btn.textContent = '🎶';
  }
}

// ── Page fade-in ──────────────────────────────────────────────
function initTransitionFadeIn() {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.45s ease';
    document.body.style.opacity    = '1';
  });
}

// ── Navigate with fade ────────────────────────────────────────
function navigateTo(url) {
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    overlay.classList.add('transitioning');
    overlay.style.pointerEvents = 'all';
  }
  // Smaller burst on mobile
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, IS_MOBILE ? 10 : 22);
  setTimeout(() => { window.location.href = url; }, 480);
}

// ── Floating Hearts ───────────────────────────────────────────
function spawnFloatingHearts() {
  const container = document.querySelector('.hearts-container');
  if (!container) return;

  const HEARTS = ['❤️','🩷','💕','💗','💖'];
  // Far fewer on mobile
  const count = IS_MOBILE ? 10 : 24;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'heart-float';
    h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    const size = 0.8 + Math.random() * 1.2;
    h.style.cssText = `
      left:${Math.random() * 100}%;
      bottom:-50px;
      font-size:${size}rem;
      animation-duration:${8 + Math.random() * 14}s;
      animation-delay:${Math.random() * 12}s;
    `;
    container.appendChild(h);
  }
}

// ── Rose Petals (desktop only) ────────────────────────────────
function spawnPetals() {
  const container = document.querySelector('.petals-container');
  if (!container) return;

  const PETALS = ['🌸','🌺','🌷','🌹'];
  const count = 10;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    p.style.cssText = `
      left:${Math.random() * 100}%;
      font-size:${0.7 + Math.random() * 0.8}rem;
      animation-duration:${10 + Math.random() * 12}s;
      animation-delay:${Math.random() * 12}s;
    `;
    container.appendChild(p);
  }
}

// ── Heart burst (click / transition) ─────────────────────────
function burstHearts(cx, cy, count = 18) {
  const HEARTS = ['❤️','🩷','💖','✨'];
  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.style.cssText = `
      position:fixed;
      left:${cx}px; top:${cy}px;
      pointer-events:none; z-index:9000;
      font-size:${0.9 + Math.random() * 0.9}rem;
      will-change:transform,opacity;
    `;
    h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const dist  = 50 + Math.random() * 150;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    h.animate([
      { opacity: 1,   transform: `translate(-50%,-50%) scale(0.5)` },
      { opacity: 0.8, transform: `translate(calc(-50% + ${tx * 0.5}px), calc(-50% + ${ty * 0.4}px)) scale(1.1)` },
      { opacity: 0,   transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.7)` },
    ], { duration: 800 + Math.random() * 500, easing: 'ease-out' })
    .finished.then(() => h.remove());
  }
}

// ── Sparkle on tap/click (skip on mobile to reduce jank) ─────
if (!IS_MOBILE) {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary,.nav-btn,.music-btn')) return;
    createSparkle(e.clientX, e.clientY);
  });
}

function createSparkle(x, y) {
  const SHAPES = ['✨','💫','🌟'];
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  s.style.cssText = `left:${x}px; top:${y}px; font-size:1.1rem;`;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1300);
}

// ── Typewriter helper ─────────────────────────────────────────
function typeWriter(element, text, speed = 45) {
  return new Promise(resolve => {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i++];
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

// ── IntersectionObserver reveal ───────────────────────────────
function revealOnScroll() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target); // fire only once
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', revealOnScroll);

// ── Particle canvas (lightweight version on mobile) ───────────
function initParticleCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // On mobile, skip canvas entirely — use CSS background instead
  if (IS_MOBILE) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }, 250);
  });

  // Fewer, bigger particles = cheaper to draw
  const particles = Array.from({ length: 70 }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     0.6 + Math.random() * 1.8,
    dx:    (Math.random() - 0.5) * 0.25,
    dy:    -(0.1 + Math.random() * 0.3),
    alpha: 0.2 + Math.random() * 0.5,
    hue:   320 + Math.random() * 60,
  }));

  let running = true;
  let lastTime = 0;
  const FPS = 30; // cap at 30fps — enough for ambient particles
  const INTERVAL = 1000 / FPS;

  function draw(now) {
    if (!running) return;
    requestAnimationFrame(draw);
    if (now - lastTime < INTERVAL) return;
    lastTime = now;

    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},85%,72%,${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -8)  { p.y = H + 8; p.x = Math.random() * W; }
      if (p.x < 0 || p.x > W) p.dx *= -1;
    });
  }

  // Pause when tab not visible
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(draw);
  });

  requestAnimationFrame(draw);
}

// ── Fireworks (capped on mobile) ─────────────────────────────
function launchFirework(canvas) {
  if (IS_MOBILE) return; // skip fireworks on mobile
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const x = 80 + Math.random() * (W - 160);
  const y = 60 + Math.random() * (H * 0.4);
  const hue = Math.random() * 360;
  const count = 30 + Math.floor(Math.random() * 20);

  const sparks = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      hue: hue + Math.random() * 30,
      size: 1 + Math.random() * 2,
    };
  });

  let frame = 0;
  function step() {
    sparks.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},100%,60%,${s.alpha})`;
      ctx.fill();
      s.x += s.vx; s.y += s.vy;
      s.vy += 0.09;
      s.alpha -= 0.022;
      s.size  *= 0.99;
    });
    if (++frame < 70 && sparks.some(s => s.alpha > 0)) requestAnimationFrame(step);
  }
  step();
}

// ── Confetti ──────────────────────────────────────────────────
function launchConfetti(count = 60) {
  // Halve on mobile
  const n = IS_MOBILE ? Math.floor(count / 2) : count;
  const COLORS = ['#ff6b9d','#ffd700','#c0184a','#7c3aed','#ff88b8','#fff'];

  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    c.style.cssText = `
      position:fixed;
      top:${15 + Math.random() * 20}%;
      left:${Math.random() * 100}%;
      width:${4 + Math.random() * 5}px;
      height:${4 + Math.random() * 5}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      z-index:8000;
      pointer-events:none;
      will-change:transform,opacity;
    `;
    document.body.appendChild(c);
    c.animate([
      { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${(Math.random()-0.5)*160}px, ${180 + Math.random()*320}px) rotate(${Math.random()*720}deg)`, opacity: 0 },
    ], {
      duration: 1000 + Math.random() * 900,
      delay: Math.random() * 350,
      easing: 'ease-out',
    }).finished.then(() => c.remove());
  }
}
