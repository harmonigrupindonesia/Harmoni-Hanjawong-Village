const firebaseConfig = {
  apiKey: "AIzaSyB23y997c7gYXBKfG_2AxXYOmHDvO7lFwk",
  authDomain: "unit-hgi.firebaseapp.com",
  projectId: "unit-hgi",
  storageBucket: "unit-hgi.firebasestorage.app",
  messagingSenderId: "491852581871",
  appId: "1:491852581871:web:6e72d69d0c4325b4ebc41a",
  measurementId: "G-HXHTNC0CLK",
};

const FIREBASE_VERSION = "13.0.0";

function parseNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function setTextIfExists(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = String(value);
  }
}

async function ambilTitle() {
  // Pastikan elemen data unit memang ada di halaman.
  const targetIds = ["unit-sold", "unit-ava", "unit-sold2", "unit-ava2"];

  const hasTarget = targetIds.some((id) => document.getElementById(id));

  if (!hasTarget) {
    return;
  }

  try {
    // Firebase SDK hanya diunduh ketika fungsi dijalankan.
    const [appModule, firestoreModule] = await Promise.all([
      import(
        `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`
      ),
      import(
        `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`
      ),
    ]);

    const { initializeApp, getApps, getApp } = appModule;

    const { doc, getDoc, getFirestore } = firestoreModule;

    // Hindari inisialisasi app Firebase berulang.
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

    const db = getFirestore(app);

    const docRef = doc(db, "siteplan", "harmoni-hanjawong-village");

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("Dokumen siteplan tidak ditemukan.");
      return;
    }

    const data = docSnap.data();

    const bf = parseNumber(data.bf);
    const dp = parseNumber(data.dp);
    const ls = parseNumber(data.ls);
    const jml = parseNumber(data.jml);

    const soldMes = parseNumber(data["sold-mes"]);
    const jmlMes = parseNumber(data["jml-mes"]);

    const totalSold = bf + dp + ls;
    const available = jml - totalSold;
    const availableMes = jmlMes - soldMes;

    setTextIfExists("unit-sold", totalSold);
    setTextIfExists("unit-ava", available);
    setTextIfExists("unit-sold2", `${soldMes}m²`);
    setTextIfExists("unit-ava2", `${availableMes}m²`);
  } catch (error) {
    console.error("Gagal mengambil data unit:", error);
  }
}

ambilTitle();
