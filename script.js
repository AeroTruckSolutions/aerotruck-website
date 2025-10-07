// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Set current years in footers
  const yrs = new Date().getFullYear();
  for (let i=1;i<=6;i++) {
    const el = document.getElementById('year' + (i===1 ? '' : i));
    // some pages use different ids - ensure fallback
    if (el) el.textContent = yrs;
  }
  // universal year targets
  const yearEls = document.querySelectorAll('#year, #year2, #year3, #year4, #year5, #year6');
  yearEls.forEach(e => e.textContent = yrs);

  // nav toggle
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const ul = btn.parentElement.querySelector('ul');
      if (ul) ul.classList.toggle('show');
    });
  });

  // Truck parallax: move slightly as user scrolls
  const truck = document.getElementById('truckImg');
  const truckWrap = document.getElementById('truckWrap');
  if (truck) {
    window.addEventListener('scroll', onScrollTruck, {passive:true});
    function onScrollTruck() {
      const rect = truckWrap.getBoundingClientRect();
      // calculate offset percentage inside viewport
      const vh = window.innerHeight;
      const centerOffset = (rect.top + rect.height/2 - vh/2) / (vh/2);
      // clamp -1..1
      const clamped = Math.max(-1, Math.min(1, centerOffset));
      const x = clamped * -20; // move left/right (px)
      const y = Math.abs(clamped) * -6; // small vertical shift
      truck.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // subtle opacity change
      const op = 1 - Math.abs(clamped) * 0.08;
      truck.style.opacity = op;
    }
    // initial call
    onScrollTruck();
  }

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = a.getAttribute('href');
      if (href.length>1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Contact form (simple client-side demo)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Message sent (demo). Replace this with your form handling / POST endpoint.');
      form.reset();
    });
  }
});
