import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { alertainfo } from "../components/alertas";
import { db } from '../firebase';
import { doc, setDoc, addDoc, getDoc } from 'firebase/firestore';


export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    //parte del usuario

 
    const [datosUser, setDatosUser] = useState();
  
    const obtenerUser = async () => {
      const dbUser = doc(db, "usuarios/"+user?.uid);
      const document = await getDoc(dbUser); 
  
      if (!document.exists) {
        console.log('No such document!');
      } else {
        setDatosUser(document.data())
      }
    }
    
    useEffect(() => {
  
      obtenerUser()
    }, [user]
    )

  const signup = (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password, displayName);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const [editMode, setEditMode] = useState(false);

  const changeEditMode = (rol) => {
    if(rol == "admin") {
      setEditMode(!editMode)
    } else {
      alertainfo("Sin permiso para editar")
    }
  }

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        editMode,
        datosUser,
        obtenerUser,
        changeEditMode,
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}