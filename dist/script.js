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
