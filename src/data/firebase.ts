// src/data/firebase.ts
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// Krok 2: Sprawdzamy, czy wszystkie kluczowe zmienne istnieją.
// Jeśli którejś brakuje, aplikacja "głośno krzyknie" w konsoli, zamiast wysyłać błędne zapytanie.
if (!projectId || !apiKey) {
  throw new Error('Nie znaleziono kluczowych zmiennych środowiskowych Firebase. Sprawdź swój plik .env');
}

const firebaseConfig: FirebaseOptions = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Krok 3: Inicjalizacja Firebase (bez zmian)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
