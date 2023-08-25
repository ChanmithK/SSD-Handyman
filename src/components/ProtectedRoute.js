import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../firebase-config";
import { setUserData } from "../redux/UserDataSlice";

const usersCollectionRef = collection(db, "users");

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { user } = useUserAuth();
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const filterdData = query(
        usersCollectionRef,
        where("user", "==", user.uid)
      );
      const querySnapshot = await getDocs(filterdData);
      setUserDetails(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getUser();

    localStorage.setItem("token", user.accessToken);
  }, [user]);
  dispatch(setUserData(JSON.stringify(userDetails[0])));

  const token = window.localStorage.getItem("token");
  if (!user && !token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
