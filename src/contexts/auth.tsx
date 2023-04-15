import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import {  logIn as sendSignInRequest } from '../api/auth';

interface IUser {
  email: string;
  avatarUrl: string;
}

type AuthContextType = {
  user: IUser | null;
  loading: boolean
  logIn?: (email: string, password: string) => Promise<any>;
  logOut?: any;
};
const AuthContext = createContext<AuthContextType>({user: null, loading: false});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logIn = useCallback(async (email, password) => {
      const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser({...result.data.user, password, privateKey: result.data.keys.privateKey});
    }

    return result;

  }, []);

  const logOut = useCallback(() => {
    // Clear user data

    setUser(null);
  }, []);

  useEffect(() => {
    // Retrieve and save user data on initial load

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, loading }} {...props} />
  );
}

export { AuthProvider, useAuth }
