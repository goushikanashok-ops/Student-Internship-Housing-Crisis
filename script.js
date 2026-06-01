/* ─────────────────────────────────────────────────────
   script.js — Intern Housing Watch
   Handles: nav scroll shadow, active nav links,
            hamburger menu, scroll animations,
            back-to-top button
───────────────────────────────────────────────────── */

// ── 1. NAV SCROLL SHADOW ────────────────────────────
// Adds a subtle shadow to the navbar once the user scrolls

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ── 2. ACTIVE NAV LINK HIGHLIGHTING ─────────────────
// Highlights the nav link for whichever section is on screen

const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

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
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// ── 3. HAMBURGER MOBILE MENU ─────────────────────────
// Opens/closes the mobile dropdown menu

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
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

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});


// ── 4. SMOOTH SCROLL FOR ALL ANCHOR LINKS ───────────
// Handles the hero CTA button and nav links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});


// ── 5. SCROLL-TRIGGERED ANIMATIONS ──────────────────
// Fades in elements marked with .animate-on-scroll

const animatedElements = document.querySelectorAll('.animate-on-scroll');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animationObserver.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold: 0.12
});

animatedElements.forEach(el => animationObserver.observe(el));


// ── 6. BACK TO TOP BUTTON ────────────────────────────
// Smooth scrolls back to the top when clicked

const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
