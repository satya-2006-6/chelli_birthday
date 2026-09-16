/* ============================================================
   🎂 BIRTHDAY WEBSITE — SHARED JS
   script.js — utilities available on every page
   ============================================================ */

// ── Apply config names everywhere ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.CONFIG || {};
  document.querySelectorAll('[data-name]').forEach(el => {
    el.textContent = cfg.SISTER_NAME || el.textContent;
  });
  document.querySelectorAll('[data-nick]').forEach(el => {
    el.textContent = cfg.SISTER_NICKNAME || el.textContent;
  });

  initMusic();
  initTransitionOverlay();
  spawnFloatingHearts();
  spawnPetals();
});

// ── Music ──────────────────────────────────────────────────
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
    btn.title = 'No music file set in config.js';
    btn.style.opacity = '0.5';
    return;
  }
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    btn.classList.remove('playing');
    btn.innerHTML = '🎵';
  } else {
    audio.play().catch(() => {});
    musicPlaying = true;
    btn.classList.add('playing');
    btn.innerHTML = '🎶';
  }
}

// ── Page Transition ────────────────────────────────────────
function initTransitionOverlay() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;
  // fade in on load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
}

function navigateTo(url, delay = 600) {
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    overlay.classList.add('transitioning');
    // burst hearts
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 30);
  }
  setTimeout(() => { window.location.href = url; }, delay);
}

// ── Floating Hearts (canvas) ───────────────────────────────
function spawnFloatingHearts() {
  const container = document.querySelector('.hearts-container');
  if (!container) return;
  const HEARTS = ['❤️','🩷','💕','💗','💖','💝','🌹','✨'];
  const count = window.innerWidth < 600 ? 18 : 32;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'heart-float';
    h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    const size = 0.8 + Math.random() * 1.4;
    h.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -60px;
      font-size: ${size}rem;
      animation-duration: ${6 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(h);
  }
}

// ── Rose Petals ────────────────────────────────────────────
function spawnPetals() {
  const container = document.querySelector('.petals-container');
  if (!container) return;
  const PETALS = ['🌸','🌺','🌷','🌹'];
  const count = window.innerWidth < 600 ? 8 : 14;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${0.7 + Math.random() * 0.9}rem;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ── Burst Hearts (for button clicks) ─────────────────────
function burstHearts(cx, cy, count = 20) {
  const HEARTS = ['❤️','🩷','💖','💕','✨'];
  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.style.cssText = `
      position:fixed; left:${cx}px; top:${cy}px;
      pointer-events:none; z-index:9000;
      font-size:${1 + Math.random()}rem;
      transform:translate(-50%,-50%);
    `;
    h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 180;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    h.animate([
      { opacity: 1, transform: 'translate(-50%,-50%) scale(0.5)' },
      { opacity: 0.9, transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty * 0.4}px)) scale(1.2)` },
      { opacity: 0,   transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty}px)) scale(0.8)` },
    ], { duration: 900 + Math.random() * 600, easing: 'ease-out' })
    .finished.then(() => h.remove());
  }
}

// ── Sparkles on click ─────────────────────────────────────
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn-primary, .nav-btn, .music-btn, .memory-card, .photo-card')) return;
  createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
  const SHAPES = ['✨','⭐','💫','🌟'];
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  s.style.cssText = `
    left:${x}px; top:${y}px; font-size:1.2rem;
    transform:translate(-50%,-50%);
  `;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1500);
}

// ── Typewriter helper ──────────────────────────────────────
function typeWriter(element, text, speed = 40) {
  return new Promise(resolve => {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i++];
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

// ── Reveal animation helper ────────────────────────────────
function revealOnScroll() {
  const els = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', revealOnScroll);

// ── Particle Canvas ────────────────────────────────────────
function initParticleCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 0.5 + Math.random() * 1.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: -(0.1 + Math.random() * 0.4),
    alpha: 0.2 + Math.random() * 0.6,
    hue: 320 + Math.random() * 60,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < 0 || p.x > W) p.dx *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Fireworks ─────────────────────────────────────────────
function launchFirework(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const x = 100 + Math.random() * (W - 200);
  const y = 80 + Math.random() * (H * 0.4);
  const hue = Math.random() * 360;
  const count = 40 + Math.floor(Math.random() * 30);

  const sparks = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
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
  function animateSparks() {
    sparks.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},100%,60%,${s.alpha})`;
      ctx.fill();
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.08;
      s.alpha -= 0.018;
      s.size *= 0.99;
    });
    frame++;
    if (frame < 80 && sparks.some(s => s.alpha > 0)) requestAnimationFrame(animateSparks);
  }
  animateSparks();
}

// ── Confetti ───────────────────────────────────────────────
function launchConfetti(count = 80) {
  const COLORS = ['#ff6b9d','#ffd700','#c0184a','#7c3aed','#ff88b8','#fff'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    c.style.cssText = `
      position:fixed;
      top:${20 + Math.random() * 20}%;
      left:${Math.random() * 100}%;
      width:${4 + Math.random() * 6}px;
      height:${4 + Math.random() * 6}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      z-index:8000;
      pointer-events:none;
    `;
    document.body.appendChild(c);
    c.animate([
      { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${(Math.random()-0.5)*200}px, ${200 + Math.random()*400}px) rotate(${Math.random()*720}deg)`, opacity: 0 },
    ], { duration: 1200 + Math.random() * 1000, delay: Math.random() * 400, easing: 'ease-out' })
    .finished.then(() => c.remove());
  }
}
