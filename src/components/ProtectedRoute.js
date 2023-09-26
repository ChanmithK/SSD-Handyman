import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth, db } from "../firebase-config";
import { setUserData } from "../redux/UserDataSlice";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

// const usersCollectionRef = collection(db, "users");

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { user, LogOut } = useUserAuth();
  // const [userDetails, setUserDetails] = useState("");

  // useEffect(() => {
  //   const getUser = async () => {
  //     const filterdData = query(
  //       usersCollectionRef,
  //       where("user", "==", user.uid)
  //     );
  //     const querySnapshot = await getDocs(filterdData);
  //     setUserDetails(
  //       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     );
  //   };
  //   getUser();

  //   localStorage.setItem("token", user.accessToken);
  // }, [user]);
  // dispatch(setUserData(JSON.stringify(userDetails[0])));

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

  // Check if the "token" cookie is available
  if (token) {
    // Use the token as needed in your application
    console.log("Token:", token);
  } else {
    // The "token" cookie is not available
    console.log("Token not found");
  }

  if (!user && !token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
