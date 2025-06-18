import { createContext, useState, useCallback } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Function to check if the token is valid
  const validateToken = useCallback(async () => {
    if (!token) return false;

    try {
      // Make a simple API call that requires authentication
      const options = {
        url: "https://brightminds.runasp.net/api/Account/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(options);
      return response.status === 200;
    } catch (error) {
      console.error("Token validation error:", error);
      if (error.response?.status === 401) {
        // Token is invalid, log out the user
        logOut();
      }
      return false;
    }
  }, [token]);

  function logOut() {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }

  // Set token and update login state
  const setTokenAndLogin = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken: setTokenAndLogin,
        logOut,
        isLoggedIn,
        validateToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
