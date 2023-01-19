import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALHL6DJscMQ7nf07v0foGEnd5JyBdGCtw",
  authDomain: "bubble-image-storage.firebaseapp.com",
  projectId: "bubble-image-storage",
  storageBucket: "bubble-image-storage.appspot.com",
  messagingSenderId: "978789560937",
  appId: "1:978789560937:web:c6189035f69a4efceae8f8",
  measurementId: "G-78ND3YJ61W",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
