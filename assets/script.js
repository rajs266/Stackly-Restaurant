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

  document.querySelectorAll('a, button, .menu-card, .team-card, .blog-card, .special-card, .menu-full-card, .plan-card, .contact-info-card, .value-card, .gallery-item, .about-feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); cursorRing.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
  });
})();

/* ── Hamburger Menu ── */
(function () {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if (!ham || !mob) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });

  mob.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Navbar Scroll + Back-to-Top ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const btn = document.getElementById('back-top');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

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
