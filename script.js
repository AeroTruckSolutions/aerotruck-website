// script.js – Professional night version (truck animation, smooth scroll, reveal)
document.addEventListener("DOMContentLoaded", () => {

  // ===== Update Footer Year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Smooth Scrolling for internal links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ===== Reveal Animation on Scroll =====
  const revealEls = document.querySelectorAll(".reveal-up");
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObs.observe(el));

  // ===== Truck Animation (only on index.html) =====
  const truck = document.querySelector(".truck-container img");
  const headlights = document.getElementById("headlights");

  if (truck) {
    // slide-in observer
    const truckObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          truck.classList.add("truck-in");
          setTimeout(() => {
            // blink headlights 3 times
            if (headlights) {
              headlights.style.opacity = "1";
              let count = 0;
              const blink = setInterval(() => {
                headlights.style.opacity = headlights.style.opacity === "1" ? "0.1" : "1";
                count++;
                if (count >= 6) {
                  clearInterval(blink);
                  headlights.style.opacity = "0.25";
                }
              }, 250);
            }
          }, 2200);
          obs.unobserve(truck);
        }
      });
    }, { threshold: 0.4 });
    truckObs.observe(truck);
  }

  // ===== Optional: Parallax Truck Effect =====
  window.addEventListener("scroll", () => {
    const t = document.querySelector(".truck-container img");
    if (t) {
      const rect = t.getBoundingClientRect();
      const offset = rect.top * 0.05;
      t.style.transform = `translateX(0px) translateY(${offset}px)`;
    }
  });

});
