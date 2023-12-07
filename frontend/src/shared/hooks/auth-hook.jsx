import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}) => {

  const [token, setToken] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); Replaced by token, setToken.
  const [userId, setUserId] = useState(false);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback((uid, token) => {
    setToken(token); // set the token
    setUserId(uid); // set the user id
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    ); // store the token in the local storage
    navigate("/"); // navigate to the home page
  }, [navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setToken(null); // set the token to null
    setUserId(null); // set the user id to null
    navigate("/auth"); // navigate to the authentication page
  }, [navigate]);

   useEffect(() => {
     //This stored data will be an object with the userId and token.
     const storedData = JSON.parse(localStorage.getItem("userData"));

     if (storedData && storedData.token) {
       // setIsLoggedIn(true); Replaced by setToken.
       login(storedData.userId, storedData.token);
     }
   }, [login]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
