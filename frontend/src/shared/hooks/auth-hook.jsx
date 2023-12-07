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
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token); // set the token
    setUserId(uid); // set the user id

    const tokenExpirationDate =  expirationDate || new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 2
    ); // calculate the expiration date of the token
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() })
    ); // store the token in the local storage
    navigate("/"); // navigate to the home page
  }, [navigate]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setToken(null); // set the token to null
    setUserId(null); // set the user id to null
    localStorage.removeItem("userData"); // remove the token from the local storage
    navigate("/auth"); // navigate to the authentication page
  }, [navigate]);

   useEffect(() => {
     //This stored data will be an object with the userId and token.
     const storedData = JSON.parse(localStorage.getItem("userData"));

     if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
       // setIsLoggedIn(true); Replaced by setToken.
       login(storedData.userId, storedData.token, new Date(storedData.expiration));
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
