import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "./Login/Spinner";


export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="HomeMongo"><Spinner></Spinner></div>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}