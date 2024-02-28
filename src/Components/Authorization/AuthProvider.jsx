import React, { createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import app from "./Firebase/Firebase.config";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const googleLogin = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const registerWIthEmailAndPassword = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const accessLogin = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateProfilePic = (photo) => {
    return updateProfile(auth.currentUser, {
      photoURL: photo,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(true);
      console.log("currentUser", currentUser);
      if (currentUser) {
        localStorage.setItem(
          "refresh-token",
          currentUser.stsTokenManager.refreshToken
        );
      }
      if (currentUser) {
        setIsLoading(true);

        axios
          .post("https://repliqq.vercel.app/jwt", {
            email: currentUser?.email,
            uid: currentUser?.uid,
          })
          .then((response) => {
            // Handle response here
            localStorage.setItem("access-token", response.data.token);
            console.log(response.data);
          })
          .catch((error) => {
            // Handle error here
            console.error("There was an error!", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }

      if (!currentUser) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("userInfo");
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateUser = (name, photo) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logOut = () => {
    return signOut(auth);
  };
  const authInfo = {
    user,
    isLoading,
    registerWIthEmailAndPassword,
    updateUser,
    accessLogin,
    googleLogin,
    logOut,
    updateProfilePic,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
