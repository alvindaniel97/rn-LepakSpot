import {
  createUserWithEmailAndPassword,
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
import { authentication, firestore } from "../firebase";
import Toast from "react-native-toast-message";
import { addDoc, collection } from "firebase/firestore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [registrationBuffer, setRegistrationBuffer] = useState(false);
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

  const registerUser = async (firstName, lastName, email, password) => {
    await createUserWithEmailAndPassword(authentication, email, password)
      .then(() => {
        setRegistrationBuffer(true);
        signOut(authentication)
          .then(() => {
            addDoc(collection(firestore, "users"), {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
            }).then(() => {
              setRegistrationBuffer(false);
              Toast.show({
                type: "success",
                text1: `Registration is successful`,
                text2: "Please login with your credentials",
                visibilityTime: 2000,
                position: "bottom",
                bottomOffset: 20,
              });
            });
          })
          .catch((error) => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Something went wrong",
              visibilityTime: 2000,
              position: "bottom",
              bottomOffset: 20,
            });
            console.log("Error signing out upon account creation. ", error);
          });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
          visibilityTime: 2000,
          position: "bottom",
          bottomOffset: 20,
        });
        console.log("Error registering user. ", error);
      });
  };

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
      registrationBuffer,
      registerUser,
      signInUser,
      logoutUser,
    }),
    [user, registrationBuffer]
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
