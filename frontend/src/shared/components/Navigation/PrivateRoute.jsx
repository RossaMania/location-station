import React from "react"
import { useAuth } from "../../hooks/auth-hook";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {

  const auth = useAuth();

  return auth.isLoggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default PrivateRoute