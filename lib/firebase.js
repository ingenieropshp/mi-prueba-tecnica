import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd_nMH0p4KuNx3iH37-QuoFVyejGJXzpM",
  authDomain: "pruebatecnica-bb940.firebaseapp.com",
  projectId: "pruebatecnica-bb940",
  storageBucket: "pruebatecnica-bb940.firebasestorage.app",
  messagingSenderId: "376809030562",
  appId: "1:376809030562:web:42fe563d911e712392e8fb",
  measurementId: "G-HCDSS30TYZ"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos lo que la app necesita (Firestore y Auth)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();