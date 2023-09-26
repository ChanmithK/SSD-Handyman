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
import { auth, db } from "../firebase-config";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/UserDataSlice";
import { collection, getDocs, query, where } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const usersCollectionRef = collection(db, "users");

  const [user, setUser] = useState({});
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

  //Broken Authentication Flaws - Praveen
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  //Broken Authentication Flaws - Praveen
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
  //     setUser(currentuser);

  //     const token = currentuser.accessToken;
  //     const tokenOptions = {
  //       secure: true,
  //       httpOnly: true,
  //       sameSite: "strict",
  //       expires: 1,
  //     };
  //     Cookies.set("token", token, tokenOptions);

  //     const currectUser = {
  //       username: currentuser.displayName,
  //       userImage: currentuser.photoURL,
  //       userId: currentuser.uid,
  //       email: currentuser.email,
  //     };
  //     dispatch(setUserData(currectUser));

  //     if (currentuser.displayName === null) {
  //       const getUser = async () => {
  //         const filterdData = query(
  //           usersCollectionRef,
  //           where("user", "==", user.uid)
  //         );
  //         const querySnapshot = await getDocs(filterdData);
  //         setUserDetails(
  //           querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //         );
  //       };
  //       getUser().then(dispatch(setUserData(userDetails)));

  //       console.log("This is NEW user DATA", userDetails);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      const token = currentUser.accessToken;
      const tokenOptions = {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        expires: 1,
      };
      Cookies.set("token", token, tokenOptions);

      const currentUserData = {
        username: currentUser.displayName,
        userImage: currentUser.photoURL,
        userId: currentUser.uid,
        email: currentUser.email,
      };

      dispatch(setUserData(currentUserData));

      if (currentUser.displayName === null) {
        try {
          const filteredData = query(
            usersCollectionRef,
            where("user", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(filteredData);
          const userDetailsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setUserDetails(userDetailsData);
          dispatch(setUserData(userDetailsData));

          console.log("This is NEW user DATA", userDetailsData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {

  // }, []);

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
