const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px'
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const dotsContainer = carousel.querySelector('[data-carousel-dots]');

  if (!track || slides.length === 0 || !prevButton || !nextButton || !dotsContainer) {
    return;
  }

  let currentIndex = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir para foto ${index + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
    });
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  updateCarousel();
});

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');

if (lightbox && lightboxImage) {
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-lightbox-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const imageSrc = trigger.getAttribute('data-image-src');
      const imageAlt = trigger.getAttribute('data-image-alt') || '';

      if (!imageSrc) {
        return;
      }

      lightboxImage.src = imageSrc;
      lightboxImage.alt = imageAlt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((element) => {
    element.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
