import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "./Login/Spinner";

export function ProtectedRoute({ children, ...rest }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="HomeMongo"><Spinner></Spinner></div>;

  if (!user) {
    // Almacenar la ruta intentada en el local storage
    localStorage.setItem("redirectPath", window.location.pathname);
    // console.log(window.location.pathname)
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
