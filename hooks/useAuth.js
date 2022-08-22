import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authentication } from "../firebase";
import Toast from "react-native-toast-message";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(authentication, (user) => {
        if (user) {
          // Logged in..
          setUser(user);
        } else {
          // Not logged in..
          setUser(null);
        }
        //avoid jitter between pages
        setLoadingInitial(false);
      }),
    []
  );

  const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // Signed in
        Toast.show({
          type: "success",
          text1: `Hi ${userCredential.user.email}`,
          text2: "Welcome to Lepak Spot 👋",
          visibilityTime: 2000,
          position: "bottom",
          bottomOffset: 20,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error logging in",
          text2: "Something went wrong",
          visibilityTime: 2000,
          position: "bottom",
          bottomOffset: 20,
        });
        console.log("Error signing in. ", error);
      });
  };

  const logoutUser = async () => {
    await signOut(authentication)
      .then(() => {
        console.log("User has successfully signed out.");
      })
      .catch((error) => {
        console.log("Error signing out user. ", error);
      });
  };

  // cache optimisation
  const memoedValue = useMemo(
    () => ({
      user,
      signInUser,
      logoutUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
