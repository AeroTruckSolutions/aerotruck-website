document.addEventListener('DOMContentLoaded', () => {
  // Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Truck animation + headlights blink
  const truck = document.getElementById('truckImg');
  const headlights = document.getElementById('headlights');

  if (truck) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          truck.classList.add('in-view');
          setTimeout(() => {
            headlights.classList.add('blink');
            setTimeout(() => headlights.classList.remove('blink'), 2200);
          }, 1200);
          obs.unobserve(truck);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(truck);
  }
});
