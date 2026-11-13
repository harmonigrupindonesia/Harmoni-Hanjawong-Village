import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB23y997c7gYXBKfG_2AxXYOmHDvO7lFwk",
  authDomain: "unit-hgi.firebaseapp.com",
  projectId: "unit-hgi",
  storageBucket: "unit-hgi.firebasestorage.app",
  messagingSenderId: "491852581871",
  appId: "1:491852581871:web:6e72d69d0c4325b4ebc41a",
  measurementId: "G-HXHTNC0CLK",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function ambilTitle() {
  try {
    const docRef = doc(db, "siteplan", "harmoni-hanjawong-village");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dataBf = docSnap.get("bf");
      const dataDp = docSnap.get("dp");
      const dataLs = docSnap.get("ls");
      const dataJml = docSnap.get("jml");
      const dataMesSold = docSnap.get("sold-mes");
      const dataMesJml = docSnap.get("jml-mes");

      const bf = parseInt(dataBf) || 0;
      const dp = parseInt(dataDp) || 0;
      const ls = parseInt(dataLs) || 0;
      const jml = parseInt(dataJml) || 0;
      const soldMes = parseInt(dataMesSold) || 0;
      const jmlMes = parseInt(dataMesJml) || 0;

      const ttl = bf + dp + ls;
      const ss = jml - ttl;
      const ss2 = jmlMes - soldMes;

      document.getElementById("bf-out").innerText = `BOOKING = ${bf}`;
      document.getElementById("dp-out").innerText = `DP = ${dp}`;
      document.getElementById("ls-out").innerText = `LUNAS= ${ls}`;
      document.getElementById("ttl-out").innerText = `TOTAL = ${ttl}`;
      document.getElementById("ss-out").innerText = `AVAILABLE = ${ss}`;
      document.getElementById("jml-out").innerText = `JUMLAH = ${jml}`;
      document.getElementById("mes-sold-out").innerText =
        `TOTAL = ${soldMes}m²`;
      document.getElementById("mes-jml-out").innerText = `AVAILABLE = ${ss2}m²`;
    } else {
      console.log("Dokumen tidak ditemukan");
    }
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

ambilTitle();
