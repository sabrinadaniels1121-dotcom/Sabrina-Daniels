(() => {
  const carousel = document.querySelector('.illustration-carousel');
  const track = document.querySelector('.illustration-track');
  const slides = [...document.querySelectorAll('.illustration-slide')];
  const prev = document.querySelector('[data-illustration-prev]');
  const next = document.querySelector('[data-illustration-next]');

  if (!carousel || !track || !slides.length || !prev || !next) return;

  let active = 0;
  let pointerStart = 0;
  let dragging = false;

  const slideStep = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
  const update = () => {
    track.style.transform = `translateX(${-active * slideStep()}px)`;
  };
  const move = (direction) => {
    active = (active + direction + slides.length) % slides.length;
    update();
  };

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  window.addEventListener('resize', update);

  track.addEventListener('pointerdown', (event) => {
    if (event.target.closest('video, button, iframe')) return;
    pointerStart = event.clientX;
    dragging = true;
    track.classList.add('is-dragging');
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener('pointerup', (event) => {
    if (!dragging) return;
    const delta = event.clientX - pointerStart;
    if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
    track.classList.remove('is-dragging');
    dragging = false;
  });
  track.addEventListener('pointercancel', () => {
    track.classList.remove('is-dragging');
    dragging = false;
  });
})();
