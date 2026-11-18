// Arkirámica — intro del logo, header, reveals, carrusel de marcas y mapa.
const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) document.querySelectorAll('.hero__video').forEach((v) => v.pause());

/* ---------- Intro: el logo se escribe y aterriza en el header (FLIP) ---------- */
(function intro() {
  const el = document.getElementById('intro');
  if (!root.classList.contains('intro') || !el) {
    root.classList.add('ready');
    el?.remove();
    return;
  }
  const logo = el.querySelector('.intro__logo');
  const curtain = el.querySelector('.intro__curtain');
  const line = el.querySelector('.intro__line');
  const target = document.querySelector('.header__logo .logo');
  let done = false;

  const finish = (fast) => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    cleanup();
    try { sessionStorage.setItem('arkIntro', '1'); } catch (e) {}

    // Si se saltó a media escritura, lleva el logo a su estado final.
    logo.getAnimations({ subtree: true }).forEach((a) => a.finish());

    const from = logo.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const s = to.width / from.width;
    const dur = fast ? 380 : 620;
    const easing = 'cubic-bezier(.65,0,.35,1)';

    root.classList.add('ready');
    line.animate({ opacity: [0.7, 0] }, { duration: 200, fill: 'forwards' });
    logo.querySelectorAll('.tag').forEach((t) => t.animate({ opacity: [1, 0] }, { duration: 220, fill: 'forwards' }));
    curtain.animate({ clipPath: ['inset(0 0 0 0)', 'inset(0 0 100% 0)'] }, { duration: dur + 120, easing, fill: 'forwards' });
    const fly = logo.animate(
      { transform: ['none', `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${s})`] },
      { duration: dur, easing, fill: 'forwards' }
    );
    fly.finished.finally(() => {
      root.classList.remove('intro');
      setTimeout(() => el.remove(), 140);
    });
  };

  const skip = () => finish(true);
  const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
  const cleanup = () => events.forEach((e) => window.removeEventListener(e, skip));
  events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
  const timer = setTimeout(() => finish(false), 2150);
})();

/* ---------- Header ---------- */
(function header() {
  const h = document.getElementById('header');
  const toggle = h.querySelector('.header__toggle');
  const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open) => {
    h.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!h.classList.contains('open')));
  h.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
})();

/* ---------- Reveals con scroll ---------- */
(function reveals() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return items.forEach((i) => i.classList.add('in'));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
  );
  items.forEach((i) => io.observe(i));
})();

/* ---------- Carrusel de marcas: deriva lenta + arrastre con inercia + flechas + teclado ---------- */
(function marquee() {
  const region = document.getElementById('marquee');
  if (!region) return;
  const track = region.querySelector('.marquee__track');
  const firstSet = region.querySelector('.marquee__set');
  if (reduce) return; // con movimiento reducido queda como scroll horizontal nativo

  const DRIFT = 32; // px por segundo
  let x = 0, setW = 0, itemW = 0;
  let vel = 0;            // inercia tras soltar (px/s)
  let speed = 0;          // deriva actual (rampa suave hacia DRIFT)
  let paused = false, visible = false, dragging = false;
  let glide = null;       // animación de flechas {from, to, t0, dur}
  let last = performance.now();

  const measure = () => {
    setW = firstSet.getBoundingClientRect().width;
    itemW = firstSet.firstElementChild.getBoundingClientRect().width;
  };
  measure();
  window.addEventListener('resize', measure);

  const apply = () => {
    if (setW) x = ((x % setW) - setW) % setW; // siempre en (-setW, 0]
    track.style.transform = `translate3d(${x}px,0,0)`;
  };

  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (visible && !dragging) {
      if (glide) {
        const p = Math.min(1, (now - glide.t0) / glide.dur);
        const e = 1 - Math.pow(1 - p, 4);
        x = glide.from + (glide.to - glide.from) * e;
        if (p === 1) glide = null;
      } else {
        const goal = paused ? 0 : DRIFT;
        speed += (goal - speed) * Math.min(1, dt * 5);
        x -= speed * dt;
        if (Math.abs(vel) > 4) { x += vel * dt; vel *= Math.pow(0.05, dt); } else vel = 0;
      }
      apply();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = performance.now(); }).observe(region);

  region.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') paused = true; });
  region.addEventListener('pointerleave', () => { paused = false; });
  region.addEventListener('focusin', () => { paused = true; });
  region.addEventListener('focusout', () => { paused = false; });

  // Arrastre
  let startX = 0, startOffset = 0, lastX = 0, lastT = 0;
  region.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true; glide = null; vel = 0; speed = 0;
    startX = lastX = e.clientX; startOffset = x; lastT = performance.now();
    region.setPointerCapture(e.pointerId);
    region.classList.add('dragging');
  });
  region.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    x = startOffset + (e.clientX - startX);
    const dt = (now - lastT) / 1000;
    if (dt > 0) vel = 0.7 * ((e.clientX - lastX) / dt) + 0.3 * vel;
    lastX = e.clientX; lastT = now;
    apply();
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false;
    region.classList.remove('dragging');
    if (performance.now() - lastT > 80) vel = 0;
    vel = Math.max(-2400, Math.min(2400, vel));
    if (e.pointerType !== 'mouse') paused = false;
    last = performance.now();
  };
  region.addEventListener('pointerup', end);
  region.addEventListener('pointercancel', end);

  // Flechas y teclado
  const step = (dir) => {
    const from = glide ? glide.to : x;
    vel = 0;
    glide = { from: x, to: from - dir * itemW, t0: performance.now(), dur: 460 };
  };
  document.querySelectorAll('.marcas__ctrl .arrow').forEach((b) =>
    b.addEventListener('click', () => step(Number(b.dataset.dir)))
  );
  region.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });
})();

/* ---------- Mapa: cambia de sucursal ---------- */
(function mapa() {
  const frame = document.getElementById('mapa');
  const btns = document.querySelectorAll('.card__map');
  btns.forEach((b) =>
    b.addEventListener('click', () => {
      frame.src = b.dataset.map;
      frame.title = `Mapa de la sucursal ${b.dataset.name}`;
      btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
      if (window.matchMedia('(max-width: 1040px)').matches) {
        frame.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      }
    })
  );
})();
