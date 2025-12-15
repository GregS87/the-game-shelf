"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseSignOut = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, gitHubSignIn, firebaseSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(AuthContext);
}