(() => {
  const darkToggle = document.querySelector("#dark-toggle");
  const html = document.documentElement;
  const themeIcon = document.querySelector("#theme-icon");

  // Baca tema yang tersimpan dengan aman
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (error) {
    // Gunakan tema default jika localStorage tidak tersedia
  }

  // Terapkan tema awal
  const isLightTheme = savedTheme === "light";

  html.classList.toggle("dark", !isLightTheme);

  if (darkToggle) {
    // Checked berarti tema terang
    darkToggle.checked = isLightTheme;
  }

  // Sinkronkan icon jika tersedia
  const updateThemeIcon = (isLight) => {
    if (!themeIcon) return;

    // Gunakan gambar icon yang sama seperti kode sebelumnya
    themeIcon.src =
      "https://harmonihanjawongvillage.co.id/assets/icon/logo-icon.png";
  };

  updateThemeIcon(isLightTheme);

  // Perubahan tema saat checkbox digunakan
  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      const useLightTheme = darkToggle.checked;

      html.classList.toggle("dark", !useLightTheme);

      try {
        localStorage.setItem("theme", useLightTheme ? "light" : "dark");
      } catch (error) {
        // Tema tetap bisa berubah meskipun tidak dapat disimpan
      }

      updateThemeIcon(useLightTheme);
    });
  }
})();
