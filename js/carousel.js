/**
 * Карусель фото в карточках услуг
 * Стрелки + обновление точек-индикаторов при скролле/свайпе
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card__carousel').forEach(carousel => {
    const gallery = carousel.querySelector('.service-card__gallery');
    const card = carousel.closest('.service-card');
    const dots = card ? card.querySelectorAll('.service-card__dot') : [];
    const prevBtn = carousel.querySelector('.carousel-arrow--prev');
    const nextBtn = carousel.querySelector('.carousel-arrow--next');

    if (!gallery) return;

    const getSlideWidth = () => gallery.querySelector('.service-card__photo')?.offsetWidth || gallery.offsetWidth;

    // Обновить активную точку
    const updateDots = () => {
      const index = Math.round(gallery.scrollLeft / getSlideWidth());
      dots.forEach((dot, i) => {
        dot.classList.toggle('service-card__dot--active', i === index);
      });
    };

    // Стрелки
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
      });
    }

    // Обновление точек при скролле (свайп или стрелки)
    let scrollTimer;
    gallery.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateDots, 60);
    }, { passive: true });
  });
});
