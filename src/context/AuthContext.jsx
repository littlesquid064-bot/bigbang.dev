import {
  createContext,
  useState,
  useContext
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // In a real app, this would involve API calls and token handling.
    // For this demo, we'll simulate a successful login for specific credentials.
    if (email === 'test@example.com' && password === 'password123') {
      setCurrentUser({
        id: 'user1',
        email: email,
        name: 'Test User'
      });
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    // Simulate registration
    console.log('Registering user:', email);
    setCurrentUser({
      id: 'user1',
      email: email,
      name: 'New User'
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
