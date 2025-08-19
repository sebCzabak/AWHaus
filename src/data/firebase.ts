import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvHhxyet8XgucuuzJHL8DCdZd-RwCZtGQ',
  authDomain: 'awhaus-strona.firebaseapp.com',
  projectId: 'awhaus-strona',
  storageBucket: 'awhaus-strona.firebasestorage.app',
  messagingSenderId: '539909281156',
  appId: '1:539909281156:web:e91c0124ae939d6815f9d1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
