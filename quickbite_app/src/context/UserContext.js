import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name, email) => {
    setUser({ name, email, isGuest: false });
  };

  const loginAsGuest = () => {
    setUser({ name: 'Guest', email: '', isGuest: true });
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, loginAsGuest, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
