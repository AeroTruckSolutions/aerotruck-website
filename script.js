// ✅ Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (nav) {
        if (!expanded) {
          nav.style.display = 'flex';
          nav.style.flexDirection = 'column';
          nav.style.gap = '12px';
          nav.style.position = 'absolute';
          nav.style.right = '20px';
          nav.style.top = '70px';
          nav.style.background = 'rgba(6,7,10,0.95)';
          nav.style.padding = '14px';
          nav.style.borderRadius = '12px';
        } else {
          nav.style.display = '';
          nav.style.position = '';
          nav.style.top = '';
          nav.style.right = '';
          nav.style.background = '';
          nav.style.padding = '';
          nav.style.borderRadius = '';
          nav.style.gap = '';
        }
      }
    });
  }

  // ✅ Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ✅ Truck animation (entry + lights blinking)
  const truck = document.querySelector('.truck-animation');
  if (truck) {
    // Start truck entry animation
    truck.classList.add('truck-animated');

    // Simulate headlights flashing (optional)
    setTimeout(() => {
      truck.style.filter = 'brightness(1.4) drop-shadow(0 0 18px rgba(255,255,180,0.6))';
    }, 2200); // when truck finishes entering

    setTimeout(() => {
      truck.style.filter = 'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.2))';
    }, 2700);

    setTimeout(() => {
      truck.style.filter = 'brightness(1.3) drop-shadow(0 0 16px rgba(255,255,200,0.5))';
    }, 3100);

    setTimeout(() => {
      truck.style.filter = 'brightness(1) drop-shadow(0 0 8px rgba(255,255,255,0.2))';
    }, 3500);
  }
});
