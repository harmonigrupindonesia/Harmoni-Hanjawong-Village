document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSurvei");

  if (!form) return;

  const nomorWhatsApp = "6282310779907";

  const inputNama = document.getElementById("nama");
  const inputNomorHP = document.getElementById("nomorHP");
  const inputDomisili = document.getElementById("domisili");
  const inputTanggal = document.getElementById("tanggal");
  const inputJam = document.getElementById("jam");
  const inputAgensi = document.getElementById("agensi");

  // Tanggal minimum adalah hari ini.
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  inputTanggal.min = `${year}-${month}-${day}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validasi form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nama = inputNama.value.trim();
    const nomorHP = inputNomorHP.value.trim();
    const domisili = inputDomisili.value.trim();
    const tanggal = inputTanggal.value;
    const jam = inputJam.value;
    const agensi = inputAgensi.value.trim();

    // Parsing tanggal tanpa masalah perbedaan timezone.
    const [tahun, bulan, hari] = tanggal.split("-").map(Number);

    const tanggalObj = new Date(tahun, bulan - 1, hari);

    // Mendapatkan nama hari dalam bahasa Indonesia.
    const namaHari = tanggalObj.toLocaleDateString("id-ID", {
      weekday: "long",
    });

    // Format tanggal: dd/mm/yyyy
    const tanggalFormat = `${String(hari).padStart(2, "0")}/${String(
      bulan,
    ).padStart(2, "0")}/${tahun}`;

    // Format jam 24 jam.
    const jamFormat = jam;

    // Format pesan WhatsApp.

    const pesan = [
      "*FORM SURVEI KAVLING HARMONI HANJAWONG VILLAGE*",
      "",
      "\u{1F464} Nama Konsumen : " + nama,
      "\u{1F4DE} No HP : " + nomorHP,
      "\u{1F4CD} Domisili : " + domisili,
      "\u{1F4C5} Hari/Tanggal : " + namaHari + ", " + tanggalFormat,
      "\u{23F0} Jam : " + jamFormat + " WIB",
      "",
      "AGENSI : " + (agensi || "-"),
    ].join("\n");

    // Encoding pesan untuk WhatsApp
    const encodedPesan = encodeURIComponent(pesan);

    // URL WhatsApp
    const urlWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${encodedPesan}`;

    // Buka WhatsApp
    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
  });
});
