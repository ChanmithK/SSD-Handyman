import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth } from "../firebase-config";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

// const usersCollectionRef = collection(db, "users");

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { user, LogOut } = useUserAuth();

  //Broken Authentication Flaws - Praveen
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const idTokenResult = await getIdTokenResult(user);

      // Get the expiration time of the ID token
      const expirationTime = idTokenResult.expirationTime;

      // Calculate the current time
      const currentTime = new Date().getTime();

      if (expirationTime < currentTime) {
        // The ID token has expired
        // Log the user out
        await LogOut(auth);
        console.log("User's token has expired. Logging them out.");
      } else {
        // The ID token is still valid
        console.log("User's token is still valid.");
      }
    } else {
      // User is signed out
      console.log("User is signed out");
    }
  });

  const token = Cookies.get("token");
  if (!user && !token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
