import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnnD9k6SIyaSVM9HLz95xqKBZgSsCbxwo",
  authDomain: "invitations-37aa7.firebaseapp.com",
  projectId: "invitations-37aa7",
  storageBucket: "invitations-37aa7.firebasestorage.app",
  messagingSenderId: "792866877699",
  appId: "1:792866877699:web:15dc591608e3f0d3c03936",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Default Settings ────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  brideName: "Hiba M",
  groomName: "Rishan M",
  weddingDate: "2026-07-11T00:00:00",
  brideParents: "Abbas & Sainaba",
  groomParents: "Abdul khader & Rasiya",
  brideTagline: "Mulayankyi House, kottoppadam, Mannarkkad",
  groomTagline: "Mulakkal house, Pazhaya Lakkidi, Ottappalam",
  brideSiblings: "",
  groomSiblings: "",
  venue: "Msp Auditorium",
  venueAddress: "perimpadari, Bhimanad",
  venueMapsUrl: "https://maps.app.goo.gl/KQUEaMpjeG533nd89?g_st=iw",
  events: [
    { id: "nikah", name: "Nikah", icon: "heart", date: "July 11, 2026", time: "Saturday", venue: "Msp Auditorium" },
  ],
  bankAccount: "Hiba M",
  bankName: "",
  bankACNo: "",
  upiId: "",
  contactWhatsapp: "",
  contactPhone: "",
  contactEmail: "",
};

// ─── RSVP ────────────────────────────────────────────────────────────────────

export async function submitRSVP(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");
  existing.push({ id: Date.now().toString(), ...record });
  localStorage.setItem("rsvps", JSON.stringify(existing));
}

export async function getRSVPs() {
  return JSON.parse(localStorage.getItem("rsvps") || "[]");
}

// ─── Wishes ──────────────────────────────────────────────────────────────────

export async function submitWish(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("wishes") || "[]");
  existing.push({ id: Date.now().toString(), ...record });
  localStorage.setItem("wishes", JSON.stringify(existing));
}

export async function getWishes() {
  const stored = localStorage.getItem("wishes");
  let localWishes = [];
  if (stored) {
    localWishes = JSON.parse(stored);
  } else {
    const defaults = [
      {
        id: "default-1",
        name: "Fathima & Family",
        message: "May your journey together be full of love, laughter, and endless happiness! Congratulations Hiba & Rishan!",
        submittedAt: "2026-06-20T10:00:00.000Z"
      },
      {
        id: "default-2",
        name: "Rahima",
        message: "Wishing you both a lifetime of beautiful memories and strong love. MashaAllah!",
        submittedAt: "2026-06-20T11:00:00.000Z"
      },
      {
        id: "default-3",
        name: "Shahida & Family",
        message: "So thrilled to celebrate your special day! Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair!",
        submittedAt: "2026-06-21T09:00:00.000Z"
      }
    ];
    localStorage.setItem("wishes", JSON.stringify(defaults));
    localWishes = defaults;
  }
  return localWishes.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings() {
  let settings = DEFAULT_SETTINGS;
  try {
    const snap = await getDoc(doc(db, "config", "settings"));
    if (snap.exists()) {
      settings = { ...DEFAULT_SETTINGS, ...snap.data() };
    } else {
      const stored = localStorage.getItem("weddingSettings");
      if (stored) settings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (err) {
    console.warn("Firestore settings read failed:", err.message);
    const stored = localStorage.getItem("weddingSettings");
    if (stored) settings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  }

  // Migrate any old venue/name data to the new Hiba & Rishan details
  const oldNames = ["Aaliya", "Ibrahim", "Diksha", "Rahul", "Hiba", "Rishan"];
  const oldVenues = ["Emmu Auditorium", "Grand Pearl Banquet", "The Royal Pearl Palace"];
  if (
    oldNames.includes(settings.brideName) ||
    oldNames.includes(settings.groomName) ||
    oldVenues.some(v => settings.venue?.includes(v))
  ) {
    settings = { ...settings, ...DEFAULT_SETTINGS };
    // Write corrected names back to Firestore permanently
    try {
      await setDoc(doc(db, "config", "settings"), settings, { merge: true });
    } catch (e) {
      console.warn("Failed to migrate settings to Firestore", e);
    }
    try {
      localStorage.setItem("weddingSettings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to migrate settings to localStorage", e);
    }
  }

  return settings;
}

export async function updateSettings(data) {
  try {
    await setDoc(doc(db, "config", "settings"), data, { merge: true });
  } catch (err) {
    console.warn("Firestore settings write failed:", err.message);
    const current = JSON.parse(localStorage.getItem("weddingSettings") || "{}");
    localStorage.setItem("weddingSettings", JSON.stringify({ ...current, ...data }));
  }
}
