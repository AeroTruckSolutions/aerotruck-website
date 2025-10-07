// script.js
document.addEventListener('DOMContentLoaded', function(){
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(mainNav.style.display === 'block') mainNav.style.display = '';
      else mainNav.style.display = 'block';
    });
  }

  // Footer year
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-section, .animate-slide-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        // if we only want animation once, unobserve
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // Truck subtle parallax follow on scroll (small effect)
  const truck = document.getElementById('truckImg');
  if(truck){
    // Also animate it to slide in when observed (using the intersection observer above)
    io.observe(truck);

    // Add parallax on scroll
    window.addEventListener('scroll', function(){
      const rect = truck.getBoundingClientRect();
      // compute a value based on distance from center
      const offset = Math.max(-120, Math.min(120, (window.innerHeight / 2 - rect.top) * 0.06));
      truck.style.transform = `translateX(${Math.min(0, 40 - offset)}px) translateY(${offset*0.05}px) scale(1)`;
    }, { passive: true });
  }

  // Smooth anchor scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Very small performance safeguard: reduce heavy scroll work on small devices
  if(window.innerWidth < 600){
    // ease off parallax
    if(truck) truck.style.transition = 'transform 600ms ease';
  }
});
