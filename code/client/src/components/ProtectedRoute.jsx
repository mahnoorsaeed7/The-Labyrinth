import { Navigate, replace } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
     return <div>Loading...</div>;
  }
// replace keyword wipes the private URL from their back-button history so they do not get stuck in a back-button loop.
  if (!user) {
   return <Navigate to="/login" replace/>;
  }

  return children;
}