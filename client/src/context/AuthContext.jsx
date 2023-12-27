import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const user = JSON.parse(localStorage.getItem('user'));

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(user ? user : null);
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async (data) => {
    try {
      setErrorMessage('');
      const res = await axios.post('http://localhost:8800/api/auth/login', data, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
