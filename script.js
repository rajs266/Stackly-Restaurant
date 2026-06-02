/* ============================================================
   STACKLY RESTAURANT — SHARED SCRIPT
   Loaded by every page. Page-specific code stays inline.
   ============================================================ */

/* ── Page Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('loaded');
  }, 700);
});

/* ── Custom Cursor (desktop only) ── */
(function () {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = (mouseX - 6) + 'px';
    cursor.style.top  = (mouseY - 6) + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX - 18) * 0.12;
    ringY += (mouseY - ringY - 18) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .menu-card, .team-card, .blog-card, .special-card, .menu-full-card, .plan-card, .contact-info-card, .value-card, .about-feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); cursorRing.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
  });
})();

/* ── Hamburger Menu ── */
(function () {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if (!ham || !mob) return;
  const desktopQuery = window.matchMedia('(min-width: 993px)');

  function closeMobileMenu() {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.classList.remove('no-scroll');
    ham.setAttribute('aria-expanded', 'false');
  }

  function syncMenuToViewport() {
    if (desktopQuery.matches) closeMobileMenu();
  }

  ham.setAttribute('aria-expanded', 'false');

  ham.addEventListener('click', () => {
    const willOpen = !ham.classList.contains('open');
    ham.classList.toggle('open', willOpen);
    mob.classList.toggle('open', willOpen);
    document.body.classList.toggle('no-scroll', willOpen);
    ham.setAttribute('aria-expanded', String(willOpen));
  });

  mob.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });

  // Screen resize ஆகும்போது மெனுவை ரீசெட் செய்ய
  window.addEventListener('resize', syncMenuToViewport);
  window.addEventListener('orientationchange', syncMenuToViewport);
  window.addEventListener('pageshow', syncMenuToViewport);

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', syncMenuToViewport);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(syncMenuToViewport);
  }

  syncMenuToViewport();
})();

/* ── Navbar Scroll + Back-to-Top ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const btn = document.getElementById('back-top');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

(function () {
  const btn = document.getElementById('back-top');
  if (!btn || btn.dataset.backTopBound) return;
  btn.dataset.backTopBound = '1';

  function scrollPageTop() {
    const root = document.scrollingElement || document.documentElement;
    root.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function launchBackTop() {
    if (btn.classList.contains('launching')) return;
    btn.classList.remove('launching');
    void btn.offsetWidth;
    btn.classList.add('launching');
    scrollPageTop();
    setTimeout(() => btn.classList.remove('launching'), 1100);
  }

  btn.addEventListener('click', launchBackTop);
})();

/* ── Reveal on Scroll ── */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

/* ── Counter Animation ── */
(function () {
  const countEls = document.querySelectorAll('[data-count]');
  if (!countEls.length) return;
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObs.observe(el));

  function animateCount(el) {
    const target = +el.getAttribute('data-count');
    let cur = 0;
    const inc = target / 60;
    const step = () => {
      cur += inc;
      if (cur < target) {
        el.textContent = Math.floor(cur) + '+';
        requestAnimationFrame(step);
      } else {
        el.textContent = target + '+';
      }
    };
    step();
  }
})();

/* ── Toast Notification ── */
function triggerToast(emoji, msg) {
  const toast = document.getElementById('foodToast');
  const msgEl  = document.getElementById('toastMsg');
  const emoEl  = toast ? toast.querySelector('.food-toast-emoji') : null;
  if (!toast || !msgEl) return;
  if (emoEl) emoEl.textContent = emoji || '✓';
  msgEl.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── Confetti Burst ── */
function confettiBurst() {
  const colors = ['#FF4500', '#FFD700', '#FF6B35', '#00C9A7', '#fff'];
  for (let i = 0; i < 22; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.cssText = `left:${Math.random()*100}vw;top:0;background:${colors[i % colors.length]};animation-delay:${Math.random()*1.2}s;animation-duration:${2+Math.random()*2}s;transform:rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

/* ── Button click ripple ── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  btn.classList.remove('wiggle-click');
  void btn.offsetWidth; /* reflow */
  btn.classList.add('wiggle-click');
  setTimeout(() => btn.classList.remove('wiggle-click'), 420);
});

/* ── Reservation Form ── */
function handleReservation(e) {
  e.preventDefault();
  confettiBurst();
  triggerToast('🎉', 'Table booked! See you soon!');
  // Optionally reset after short delay
  setTimeout(() => e.target.reset(), 3000);
}

/* ── Newsletter Form ── */
function handleNewsletter(e) {
  e.preventDefault();
  triggerToast('✉', 'Subscribed! Tasty updates incoming!');
  e.target.reset();
}
