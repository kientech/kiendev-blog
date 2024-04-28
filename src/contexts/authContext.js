import { auth, db } from "../firebase/firebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
