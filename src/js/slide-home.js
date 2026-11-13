const slides = [
  {
    image: "./assets/img/hero-slider/harmonihanjawongvillage0.webp",
    link: "https://wa.me/6285211300632?text=Hallo%20Ka%20Sera%2C%20Saya%20Mau%20Info%20Lebih%20Lanjut%20Tentang%20Kavling%20Harmoni%20Hanjawong%20Village",
  },
  {
    image: "./assets/img/hero-slider/harmonihanjawongvillage1.webp",
    link: "https://wa.me/6285211300632?text=Hallo%20Ka%20Sera%2C%20Saya%20Mau%20Info%20Lebih%20Lanjut%20Tentang%20Kavling%20Harmoni%20Hanjawong%20Village",
  },
  {
    image: "./assets/img/hero-slider/harmonihanjawongvillage2.webp",
    link: "https://wa.me/6282310779907?text=Hallo%20Ka%20Tita%2C%20Saya%20Mau%20Info%20Lebih%20Lanjut%20Tentang%20Kavling%20Harmoni%20Hanjawong%20Village",
  },
];

const slidesContainer = document.getElementById("slides");
const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");

if (slidesContainer && slides.length > 0) {
  let currentSlide = 0;
  let autoplayInterval = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  slides.forEach((slide, index) => {
    const item = document.createElement("div");
    item.className = "min-w-full";

    const link = document.createElement("a");
    link.href = slide.link;

    const image = document.createElement("img");
    image.src = slide.image;
    image.alt =
      index === 0
        ? "Harmoni Hanjawong Village"
        : `Pemandangan Harmoni Hanjawong Village ${index + 1}`;
    image.className = "block w-full h-auto";
    image.width = 1920;
    image.height = 1080;
    image.decoding = "async";

    // Slide pertama adalah gambar awal yang ditampilkan.
    if (index === 0) {
      image.fetchPriority = "high";
    } else {
      image.loading = "lazy";
    }

    link.appendChild(image);
    item.appendChild(link);
    slidesContainer.appendChild(item);
  });

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function stopAutoplay() {
    if (autoplayInterval !== null) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (document.hidden || prefersReducedMotion.matches || slides.length <= 1) {
      return;
    }

    autoplayInterval = setInterval(nextSlide, 5000);
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  prefersReducedMotion.addEventListener("change", startAutoplay);

  updateSlider();
  startAutoplay();
}
