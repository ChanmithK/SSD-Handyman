import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase-config";
import Cookies from "js-cookie";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // console.log('this is user', user.uid ? user.uid : null)
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const LogOut = () => {
    Cookies.remove("token", { secure: true });
    return signOut(auth);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);

      const token = currentuser.accessToken;
      const tokenOptions = {
        secure: true, // Transmit only over HTTPS
        httpOnly: true, // Prevent client-side JavaScript access
        sameSite: "strict", // Prevent cross-site request forgery (CSRF)
        expires: 1, // Set an appropriate expiration (e.g., 1 day)
      };

      Cookies.set("token", token, tokenOptions);
      // localStorage.setItem("token", currentuser.accessToken);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, Login, resetPassword, LogOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
