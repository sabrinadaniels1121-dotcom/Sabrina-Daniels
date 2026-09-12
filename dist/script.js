const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const slides = [...document.querySelectorAll('.carousel-slide')];
const previous = document.querySelector('[data-carousel-prev]');
const next = document.querySelector('[data-carousel-next]');
let activeSlide = 0;
let dragStart = 0;
let dragOffset = 0;
let isDragging = false;

function positionCarousel() {
  if (!carousel || !track || !slides.length) return;
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
  const offset = (carousel.clientWidth - slideWidth) / 2 - activeSlide * (slideWidth + gap);
  track.style.transform = `translateX(${offset}px)`;
}

function moveCarousel(direction) {
  activeSlide = Math.max(0, Math.min(slides.length - 1, activeSlide + direction));
  positionCarousel();
}

previous?.addEventListener('click', () => moveCarousel(-1));
next?.addEventListener('click', () => moveCarousel(1));
window.addEventListener('resize', positionCarousel);
window.addEventListener('load', positionCarousel);

track?.addEventListener('pointerdown', (event) => {
  isDragging = true;
  dragStart = event.clientX;
  dragOffset = 0;
  track.classList.add('is-dragging');
  track.setPointerCapture(event.pointerId);
});
track?.addEventListener('pointermove', (event) => {
  if (!isDragging) return;
  dragOffset = event.clientX - dragStart;
  const current = track.style.transform.match(/-?\d+(?:\.\d+)?/);
  const base = current ? Number(current[0]) : 0;
  track.style.transform = `translateX(${base + dragOffset}px)`;
  dragStart = event.clientX;
});
track?.addEventListener('pointerup', () => {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove('is-dragging');
  if (Math.abs(dragOffset) > 14) moveCarousel(dragOffset < 0 ? 1 : -1);
  else positionCarousel();
});
track?.addEventListener('pointercancel', () => { isDragging = false; track.classList.remove('is-dragging'); positionCarousel(); });
