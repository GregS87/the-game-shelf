"use client";

import { 
    useContext, 
    createContext, 
    useState, 
    useEffect 
} from "react";

import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider
} from "firebase/auth";

import { auth } from "../_utils/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setloading ] = useState(true);

    const gitHubSignIn = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const firebaeSignOut = () => {
        signOut(auth);
    };

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setloading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return(
        <AuthContext.Provider value={{ 
            gitHubSignIn, 
            firebaeSignOut, 
            user, 
            loading }}
        >
            { children }
        </AuthContext.Provider>
    );
}