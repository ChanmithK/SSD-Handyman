import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

//Broken Authentication Flaws - Praveen
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQjTuO2Wbmz77Tq9ekyhHl6jd9RW_mEcw",
  authDomain: "fitflame-82992.firebaseapp.com",
  projectId: "fitflame-82992",
  storageBucket: "fitflame-82992.appspot.com",
  messagingSenderId: "1091559323626",
  appId: "1:1091559323626:web:d903f7529d799cbd1ca493",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

//Broken Authentication Flaws - Praveen
const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       const accessToken = user.accessToken;
//       const idToken = user.idToken;
//       const refreshToken = user.stsTokenManager.refreshToken;

//       // Now you can use accessToken, idToken, and refreshToken as needed.
//       console.log("Access Token:", accessToken);
//       console.log("ID Token:", idToken);
//       console.log("Refresh Token:", refreshToken);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// };
