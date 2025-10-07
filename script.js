/* ========== AEROTRUCK - interactive JS ========== */
/* Responsibilities:
   - update footer year
   - reveal-on-scroll elements
   - start truck drive-in animation and headlights blink
   - small parallax on scroll for truck reflection
   - contact form validation & mailto fallback
*/

document.addEventListener('DOMContentLoaded', () => {
  // footer year auto-update
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Reveal on scroll (generic)
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

  // Truck animation logic (home page)
  const truckImg = document.querySelector('.truck');
  const headlights = document.querySelector('.headlights');

  function startTruckSequence(){
    if(!truckImg) return;
    // start drive-in after short delay to allow header/hero to render
    setTimeout(() => {
      truckImg.classList.add('drive-in'); // CSS handles transform/opacity

      // after truck completed motion, start blink sequence
      setTimeout(() => {
        if(headlights){
          // blink sequence (3 blinks)
          let blinks = 0;
          const blinkInterval = setInterval(() => {
            headlights.classList.toggle('blink-anim');
            blinks++;
            if(blinks >= 6){
              clearInterval(blinkInterval);
              // leave a soft dim glow
              headlights.classList.add('blink-anim');
              headlights.style.opacity = '0.28';
            }
          }, 350);
        }
      }, 1800);
    }, 650);
  }

  // If truck in DOM and visible, start via observer; otherwise try immediate
  if(truckImg){
    const tIo = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          startTruckSequence();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    tIo.observe(truckImg);
  }

  // small parallax effect for truck on scroll
  window.addEventListener('scroll', () => {
    const t = document.querySelector('.truck');
    if(!t) return;
    const rect = t.getBoundingClientRect();
    const offset = Math.max(-12, Math.min(40, (window.innerHeight/2 - rect.top) * 0.02));
    t.style.transform = `translateX(${offset}px)`;
  }, { passive: true });

  // Contact form: simple validation + mailto fallback
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';
      if(!name || !email){
        alert('Please enter your name and email.');
        return;
      }
      // Build mailto fallback
      const subject = encodeURIComponent('Website Inquiry from ' + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:info@aerotrucksolutions.com?subject=${subject}&body=${body}`;
    });
  }

}); // DOMContentLoaded
