// script.js: nav toggle, reveal animations, truck slide-in + headlights blink, small parallax
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
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // Truck slide-in + headlights blink on index page
  const truck = document.getElementById('truckImg');
  const headlights = document.getElementById('headlights');
  if(truck){
    const truckObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          truck.classList.add('in-view');
          // Blink after slide
          setTimeout(() => {
            if(headlights){
              headlights.classList.add('blink');
              setTimeout(() => {
                if(headlights){
                  headlights.classList.remove('blink');
                  headlights.style.opacity = '0.14';
                }
              }, 1900);
            }
          }, 700);
          obs.unobserve(truck);
        }
      });
    }, { threshold: 0.4 });
    truckObserver.observe(truck);

    // small scroll parallax for truck
    window.addEventListener('scroll', function(){
      const rect = truck.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top) * 0.03;
      truck.style.transform = `translateX(${Math.min(0, 40 - offset)}px) translateY(${offset * 0.1}px)`;
    }, { passive: true });
  }

  // Smooth anchor scrolling (internal links)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if(t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Basic contact form validation (contact pages)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      if(!name || !email || !name.value.trim() || !email.value.trim()){
        e.preventDefault();
        alert('Prašome užpildyti savo vardą ir el. paštą.');
      }
    });
  }
});
