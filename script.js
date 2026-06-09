/* ============================================================
   SAKYA GROUP — Global JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll behaviour ─────────────────────────── */
  const navbar = document.querySelector('.navbar');
  const scrollHandler = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler();

  /* ── Active nav link ─────────────────────────────────── */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const isHome = (href === 'index.html' || href === '/') &&
                   (path.endsWith('index.html') || path === '/' || path.endsWith('/'));
    const isMatch = href !== 'index.html' && href !== '/' && path.includes(href.replace('.html',''));
    if (isHome || isMatch) a.classList.add('active');
  });

  /* ── Hamburger menu ──────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks?.classList.toggle('open');
  });
  // Close on link click
  navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  /* ── Intersection Observer fade-up ───────────────────── */
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* ── Hero particles ──────────────────────────────────── */
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${Math.random() > 0.7 ? 3 : 2}px;
        height: ${Math.random() > 0.7 ? 3 : 2}px;
        animation-duration: ${8 + Math.random() * 14}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ── Globe animation ─────────────────────────────────── */
  const globe = document.getElementById('globe-svg');
  if (globe) {
    let angle = 0;
    const icons = globe.querySelectorAll('.orbit-icon');
    const R = 115;
    const offsets = [0, 72, 144, 216, 288];
    const animate = () => {
      icons.forEach((icon, i) => {
        const a = ((angle + offsets[i]) * Math.PI) / 180;
        const x = 160 + R * Math.cos(a);
        const y = 160 + R * 0.38 * Math.sin(a);
        const scale = 0.7 + 0.3 * (Math.sin(a) + 1) / 2;
        const opacity = 0.5 + 0.5 * (Math.sin(a) + 1) / 2;
        icon.setAttribute('transform', `translate(${x},${y}) scale(${scale.toFixed(3)})`);
        icon.style.opacity = opacity.toFixed(3);
      });
      angle += 0.25;
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── Form submit feedback ────────────────────────────── */
  const form = document.querySelector('form[data-netlify]');
  if (form) {
    form.addEventListener('submit', e => {
      const btn = form.querySelector('.btn-submit');
      if (btn) { btn.textContent = '✔ Sent! We\'ll be in touch.'; btn.disabled = true; }
    });
  }

});
