import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Configuración de Firebase proporcionada por el usuario
const firebaseConfig = {
  apiKey: "AIzaSyCFTAtBG8NLRhs-p-1wtzGlGkvi5EYziLI",
  authDomain: "alpackaai.xyz",
  projectId: "alpackaai-39613197-391a8",
  storageBucket: "alpackaai-39613197-391a8.firebasestorage.app",
  messagingSenderId: "32310275350",
  appId: "1:32310275350:web:0ab4009c63d502cfb3f437"
};

let app;

// Patrón Singleton para inicialización
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error en inicio de sesión con Google:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error cerrando sesión:", error);
    throw error;
  }
};