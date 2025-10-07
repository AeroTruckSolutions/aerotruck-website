// script.js: nav toggle, reveal animations, truck slide-in + headlights blink, small parallax
document.addEventListener('DOMContentLoaded', function() {
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (mainNav.style.display === 'block') mainNav.style.display = '';
      else mainNav.style.display = 'block';
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // === Truck slide-in + headlights blink ===
  const truck = document.querySelector('.truck');
  const headlights = document.querySelector('.headlights');

  if (truck) {
    const truckObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          truck.classList.add('in-view');
          // Blink headlights after arrival
          setTimeout(() => {
            if (headlights) {
              headlights.classList.add('blink');
              setTimeout(() => {
                headlights.classList.remove('blink');
                headlights.style.opacity = '0.15';
              }, 1900);
            }
          }, 900);
          obs.unobserve(truck);
        }
      });
    }, { threshold: 0.4 });

    truckObserver.observe(truck);

    // Small scroll parallax for truck
    window.addEventListener('scroll', function() {
      const rect = truck.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top) * 0.03;
      truck.style.transform = `translateX(${Math.min(0, 40 - offset)}px) translateY(${offset * 0.1}px)`;
    }, { passive: true });
  }

  // Smooth internal anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Contact form validation (contact.html)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      const name = form.quer
