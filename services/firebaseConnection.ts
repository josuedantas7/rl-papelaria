// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5VZB6yGrXMOMoaiQBFdLdbcYlhbCIsrA",
    authDomain: "rl-papelaria.firebaseapp.com",
    projectId: "rl-papelaria",
    storageBucket: "rl-papelaria.appspot.com",
    messagingSenderId: "709016710377",
    appId: "1:709016710377:web:ab25ebedb7e8db6e86d478"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export { storage }