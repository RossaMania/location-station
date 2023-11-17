import React, { createContext, useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(() => {
    setIsLoggedIn(true);
    navigate("/"); // navigate to the home page
  }, [navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    navigate("/auth"); // navigate to the authentication page
  }, [navigate]);


  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
