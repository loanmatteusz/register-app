import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
 
// Configuração do app firebase web
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}
 
// Inicializando firebase
const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore(firebase);
 
export { firebase, database }
