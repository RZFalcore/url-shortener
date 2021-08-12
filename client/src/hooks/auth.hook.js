import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  };
  // TOKEN vanished on reload...
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data.token) {
      login(data.login, data.userId);
    }

    setReady(true);
  }, [login, ready]);

  return { login, logout, token, userId, ready };
};
