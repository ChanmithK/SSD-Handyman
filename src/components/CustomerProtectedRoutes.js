import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth } from "../firebase-config";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const CustomerProtectedRoutes = ({ allowedRoles, children }) => {
  const { user, LogOut } = useUserAuth();
  const userData = useSelector((state) => state.setUserData.userData);
  const location = useLocation();

  useEffect(() => {
    const checkTokenExpiration = async () => {
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
    };

    checkTokenExpiration();
  }, [LogOut]);

  const token = Cookies.get("token");
  if (!user && !token) {
    return <Navigate to="/" replace />;
  } else if (
    userData?.role &&
    !allowedRoles.find((role) => userData?.role === role)
  ) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet>{children}</Outlet>;
};

export default CustomerProtectedRoutes;
