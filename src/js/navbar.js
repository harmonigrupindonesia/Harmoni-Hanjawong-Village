(() => {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");

  // Hentikan script jika elemen tidak tersedia di halaman
  if (!btn || !menu) return;

  // Atur status menu
  const setMenuState = (isOpen) => {
    menu.classList.toggle("hidden", !isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  };

  // Toggle menu ketika tombol diklik
  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    setMenuState(!isOpen);
  });

  // Tutup menu setelah tautan di dalamnya diklik
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  // Tutup menu dengan tombol Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  // Tutup menu ketika pengguna mengklik area di luar menu
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedButton = btn.contains(event.target);
    const menuIsOpen = !menu.classList.contains("hidden");

    if (!clickedInsideMenu && !clickedButton && menuIsOpen) {
      setMenuState(false);
    }
  });
})();
