(() => {
  const STYLE_ID = "review-slider-styles";

  // CSS hanya ditambahkan satu kali.
  function addReviewStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      .review-slider {
        width: 90%;
        margin: auto;
        overflow: hidden;
        position: relative;
      }

      .review-track {
        display: flex;
        transition: transform 0.5s ease-in-out;
      }

      .review {
        flex: 0 0 100%;
        box-sizing: border-box;
        background: #fff;
        margin: 10px;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .review .author {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
      }

      .review .rating {
        color: gold;
        margin-bottom: 10px;
      }

      .review .text {
        font-style: italic;
        font-size: 14px;
        line-height: 1.4;
      }

      @media (min-width: 600px) {
        .review {
          flex: 0 0 50%;
        }
      }

      @media (min-width: 900px) {
        .review {
          flex: 0 0 33.333%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .review-track {
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function getSlidesPerView() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function createReviewElement(review, showStars) {
    const item = document.createElement("div");
    item.className = "review";

    const author = document.createElement("p");
    author.className = "author";
    author.textContent = review.author_name ?? "";

    item.appendChild(author);

    if (showStars) {
      const rating = document.createElement("p");
      rating.className = "rating";

      const ratingValue = Math.max(
        0,
        Math.min(5, Number.parseInt(review.rating, 10) || 0),
      );

      rating.textContent = "⭐".repeat(ratingValue);
      item.appendChild(rating);
    }

    const text = document.createElement("p");
    text.className = "text";
    text.textContent = `"${review.text ?? ""}"`;

    item.appendChild(text);

    return item;
  }

  function startSlider(track, totalReviews, interval) {
    let currentIndex = 0;
    let timer = null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function getPageCount() {
      return Math.max(1, Math.ceil(totalReviews / getSlidesPerView()));
    }

    function updateSlider() {
      const pageCount = getPageCount();

      currentIndex = currentIndex % pageCount;

      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function stopSlider() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }

    function runSlider() {
      stopSlider();

      if (document.hidden || reducedMotion.matches || getPageCount() <= 1) {
        return;
      }

      timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % getPageCount();
        updateSlider();
      }, interval);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopSlider();
      } else {
        runSlider();
      }
    });

    reducedMotion.addEventListener("change", runSlider);

    let resizeTimer = null;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        currentIndex = 0;
        updateSlider();
        runSlider();
      }, 150);
    });

    updateSlider();
    runSlider();
  }

  window.loadReviews = async function (containerId, options = {}) {
    const {
      jsonPath = "json/review.json",
      maxReviews = 5,
      showStars = true,
      interval = 3000,
    } = options;

    const container = document.getElementById(containerId);

    if (!container) {
      console.warn(`Container review "${containerId}" tidak ditemukan.`);
      return;
    }

    addReviewStyles();

    try {
      const response = await fetch(jsonPath);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Format data review harus berupa array.");
      }

      const reviews = data.slice(0, Math.max(0, Number(maxReviews) || 0));

      container.replaceChildren();

      if (reviews.length === 0) {
        container.textContent = "Belum ada ulasan.";
        return;
      }

      const slider = document.createElement("div");
      slider.className = "review-slider";

      const track = document.createElement("div");
      track.className = "review-track";

      reviews.forEach((review) => {
        track.appendChild(createReviewElement(review, showStars));
      });

      slider.appendChild(track);
      container.appendChild(slider);

      startSlider(
        track,
        reviews.length,
        Math.max(1000, Number(interval) || 3000),
      );
    } catch (error) {
      console.error("Gagal memuat review:", error);

      container.textContent = "Gagal memuat ulasan.";
    }
  };
})();
