import React, { createContext, useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid); // set the user id
    navigate("/"); // navigate to the home page
  }, [navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null); // set the user id to null
    navigate("/auth"); // navigate to the authentication page
  }, [navigate]);


  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
