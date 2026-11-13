(() => {
  const POPUP_DELAY = 3000;
  const POPUP_ID = "harmoni-promo-popup";
  const CLOSED_KEY = "harmoniPromoClosed";

  const promoImage =
    "https://harmonihanjawongvillage.co.id/assets/img/view-promo.webp";

  const whatsappUrl =
    "https://wa.me/6282310779907?text=Hallo%20Ka%20Admin%2C%20Saya%20Mau%20Promo%20800%20ribuan%20Kavling%20Harmoni%20Hanjawong%20Village";

  let popupTimer = null;

  function wasClosed() {
    try {
      return sessionStorage.getItem(CLOSED_KEY) === "true";
    } catch {
      return false;
    }
  }

  function markAsClosed() {
    try {
      sessionStorage.setItem(CLOSED_KEY, "true");
    } catch {
      // Popup tetap dapat ditutup jika sessionStorage tidak tersedia.
    }
  }

  function createPopup() {
    if (document.getElementById(POPUP_ID) || wasClosed() || document.hidden) {
      return;
    }

    const popup = document.createElement("div");
    popup.id = POPUP_ID;
    popup.className =
      "fixed bottom-0 left-0 right-0 p-2 grid place-items-center z-50";

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className =
      "close-popup absolute -top-6 right-0 h-5 w-12 " +
      "bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer";
    closeButton.textContent = "X Close";
    closeButton.setAttribute("aria-label", "Tutup promo");

    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.className = "block";
    link.setAttribute("aria-label", "Hubungi admin untuk promo");

    const imageWrapper = document.createElement("div");
    imageWrapper.className =
      "w-full mx-auto flex items-center justify-center " +
      "rounded-xl overflow-hidden";

    const imageContainer = document.createElement("div");
    imageContainer.className =
      "h-full w-60 lg:w-120 shadow-lg shadow-black/30 bg-amber-400";

    const image = document.createElement("img");
    image.src = promoImage;
    image.alt = "Promo Harmoni Hanjawong Village";
    image.className = "h-full w-full object-cover";
    image.loading = "eager";
    image.decoding = "async";

    imageContainer.appendChild(image);
    imageWrapper.appendChild(imageContainer);
    link.appendChild(imageWrapper);

    wrapper.appendChild(closeButton);
    wrapper.appendChild(link);
    popup.appendChild(wrapper);

    closeButton.addEventListener("click", () => {
      popup.remove();
      markAsClosed();
    });

    document.body.appendChild(popup);
  }

  function clearPopupTimer() {
    if (popupTimer !== null) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
  }

  function schedulePopup() {
    clearPopupTimer();

    if (document.hidden || wasClosed() || document.getElementById(POPUP_ID)) {
      return;
    }

    popupTimer = setTimeout(() => {
      popupTimer = null;
      createPopup();
    }, POPUP_DELAY);
  }

  function initializePromo() {
    if (wasClosed()) return;

    schedulePopup();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearPopupTimer();
      } else {
        schedulePopup();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePromo, {
      once: true,
    });
  } else {
    initializePromo();
  }
})();
