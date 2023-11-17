import React, { createContext, useCallback, useContext, useState } from "react"

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // call this function when you want to authenticate the user
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);


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
