import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBB1uNFaij24uMkHKmDHUHxrECw6biNfk8',
  authDomain: 'coding-challenge-brizzy.firebaseapp.com',
  projectId: 'coding-challenge-brizzy',
  storageBucket: 'coding-challenge-brizzy.appspot.com',
  messagingSenderId: '176883651301',
  appId: '1:176883651301:web:c54a5f56e031d7295d7a0c',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
