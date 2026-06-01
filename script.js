/* ─────────────────────────────────────────────────────
   script.js — Student Internship Housing Crisis
   Works on both index.html and report.html
───────────────────────────────────────────────────── */

// ── 1. NAV SCROLL SHADOW ────────────────────────────

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ── 2. ACTIVE NAV LINK HIGHLIGHTING (index only) ────
// Only runs when section[id] elements exist on the page

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));
}


// ── 3. HAMBURGER MOBILE MENU ─────────────────────────

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  isOpen ? closeMobileMenu() : openMobileMenu();
});

function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-label', 'Close menu');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-label', 'Open menu');
}

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});


// ── 4. SMOOTH SCROLL FOR SAME-PAGE ANCHOR LINKS ─────
// Only intercepts links that start with # (same-page links)
// Links to other pages like report.html navigate normally

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});


// ── 5. SCROLL-TRIGGERED ANIMATIONS ──────────────────

const animatedElements = document.querySelectorAll('.animate-on-scroll');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animationObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => animationObserver.observe(el));


// ── 6. BACK TO TOP BUTTON ────────────────────────────

const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
