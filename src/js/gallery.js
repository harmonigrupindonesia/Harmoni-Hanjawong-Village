const galleryPhotos = [
  {
    src: "../assets/img/gallery/1.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 1",
    caption: "Dokumentasi Harmoni Hanjawong Village 01",
  },
  {
    src: "../assets/img/gallery/2.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 2",
    caption: "Dokumentasi Harmoni Hanjawong Village 02",
  },
  {
    src: "../assets/img/gallery/3.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 3",
    caption: "Dokumentasi Harmoni Hanjawong Village 03",
  },
  {
    src: "../assets/img/gallery/4.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 4",
    caption: "Dokumentasi Harmoni Hanjawong Village 04",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village1.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 1",
    caption: "Dokumentasi Harmoni Hanjawong Village 01",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village2.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 2",
    caption: "Dokumentasi Harmoni Hanjawong Village 02",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village3.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 3",
    caption: "Dokumentasi Harmoni Hanjawong Village 03",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village4.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 4",
    caption: "Dokumentasi Harmoni Hanjawong Village 04",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village5.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 5",
    caption: "Dokumentasi Harmoni Hanjawong Village 05",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village6.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 6",
    caption: "Dokumentasi Harmoni Hanjawong Village 06",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village7.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 7",
    caption: "Dokumentasi Harmoni Hanjawong Village 07",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village8.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 8",
    caption: "Dokumentasi Harmoni Hanjawong Village 08",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village9.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 9",
    caption: "Dokumentasi Harmoni Hanjawong Village 09",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village10.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 10",
    caption: "Dokumentasi Harmoni Hanjawong Village 10",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village11.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 11",
    caption: "Dokumentasi Harmoni Hanjawong Village 11",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village12.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 12",
    caption: "Dokumentasi Harmoni Hanjawong Village 12",
  },
  {
    src: "../assets/img/gallery/Harmoni-Hanjawong-Village13.webp",
    alt: "Foto dokumentasi Harmoni Hanjawong Village nomor 13",
    caption: "Dokumentasi Harmoni Hanjawong Village 13",
  },
];

const firstRow = document.getElementById("marquee-row-one");
const secondRow = document.getElementById("marquee-row-two");
const dialog = document.getElementById("photo-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogCaption = document.getElementById("dialog-caption");

function makeGalleryItem(photo, index, duplicate = false) {
  const item = document.createElement("figure");
  item.className = "gallery-card relative shrink-0";
  if (duplicate) item.setAttribute("aria-hidden", "true");

  const button = document.createElement("button");
  button.type = "button";
  button.className =
    "group relative block h-full w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-thirdLight";
  button.setAttribute("aria-label", `Lihat foto ${index + 1}: ${photo.alt}`);
  if (duplicate) {
    button.tabIndex = -1;
    button.setAttribute("aria-hidden", "true");
  }

  const image = document.createElement("img");
  image.src = photo.src;
  image.alt = duplicate ? "" : photo.alt;
  image.width = 780;
  image.height = 440;
  image.loading = index < 4 ? "eager" : "lazy";
  image.decoding = "async";
  image.className =
    "h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110";
  if (index < 4) image.fetchPriority = "high";

  const overlay = document.createElement("span");
  overlay.className =
    "pointer-events-none absolute inset-0 bg-primaryLight/0 transition duration-300 group-hover:bg-primaryLight/15";
  button.append(image, overlay);

  if (!duplicate) {
    button.addEventListener("click", () => {
      dialogImage.src = photo.src;
      dialogImage.alt = photo.alt;
      dialogCaption.textContent = photo.caption;
      dialog.showModal();
    });
  }

  item.append(button);
  return item;
}

function populateMarquee(track, photos, reverseOrder = false) {
  const orderedPhotos = reverseOrder ? [...photos].reverse() : photos;
  const fragment = document.createDocumentFragment();

  orderedPhotos.forEach((photo, index) => {
    fragment.append(makeGalleryItem(photo, index));
  });

  // Duplikasi untuk membuat loop marquee seamless. Salinan disembunyikan dari pembaca layar.
  orderedPhotos.forEach((photo, index) => {
    fragment.append(makeGalleryItem(photo, index, true));
  });

  track.append(fragment);
}

const firstHalf = galleryPhotos.slice(0, Math.ceil(galleryPhotos.length / 2));
const secondHalf = galleryPhotos.slice(Math.ceil(galleryPhotos.length / 2));

// Kedua baris menggunakan seluruh foto; urutan berbeda agar kolase lebih dinamis.
populateMarquee(firstRow, galleryPhotos);
populateMarquee(secondRow, [...galleryPhotos].reverse(), true);

document.getElementById("jumlah-foto").textContent = String(
  galleryPhotos.length,
);
document.getElementById("year").textContent = new Date().getFullYear();

document
  .getElementById("close-dialog")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
