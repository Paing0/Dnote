import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storeToken = localStorage.getItem("token");
    return storeToken ? JSON.parse(storeToken) : null;
  });

  const updateToken = (jwtToken) => {
    const token = JSON.stringify(jwtToken);
    localStorage.setItem("token", token);
    setToken(jwtToken);
  };

  useEffect(() => {
    const storeToken = localStorage.getItem("token");
    if (storeToken) {
      setToken(JSON.parse(storeToken));
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};
