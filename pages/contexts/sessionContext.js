import React, { createContext, useState, useEffect } from "react";
import Router from "next/router";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsUserLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!isUserLoggedIn) {
      Router.push("/Login");
    }
  }, [isUserLoggedIn]);

  return (
    <SessionContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
}


