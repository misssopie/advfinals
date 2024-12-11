
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  


const firebaseConfig = {
  apiKey: "AIzaSyAtRQ7HWqTcEFUr2OzPn3q_SFOQdqQp0iE",
  authDomain: "palawan-4e4c3.firebaseapp.com",
  projectId: "palawan-4e4c3",
  storageBucket: "palawan-4e4c3.appspot.com", 
  messagingSenderId: "355439495227",
  appId: "1:355439495227:web:a29a1a9c5b84a0ef45741e"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app); 
