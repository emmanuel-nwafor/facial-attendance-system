import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const PrivateRoute = ({ role, children }) => {
  const auth = getAuth();
  const currentRole = localStorage.getItem("role");

  // Check if the user is authenticated
  const isAuthenticated = !!auth.currentUser; // Returns true if user is logged in, false otherwise

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If role is provided and doesn't match, redirect accordingly
  if (role && currentRole !== role) {
    return <Navigate to="/dashboard" />;
  }

  // Return children if all conditions are met (authenticated and role match)
  return children;
};

export default PrivateRoute;
