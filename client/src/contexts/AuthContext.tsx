import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing auth token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For now, simulate API call with mock data
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, validate credentials
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email: email,
          name: email.split('@')[0], // Use email prefix as name for demo
        };
        
        // Store auth data
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsLoading(false);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For now, simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, create user account
      if (name && email && password) {
        const mockUser: User = {
          id: '1',
          email: email,
          name: name,
        };
        
        // Store auth data
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsLoading(false);
        return true;
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 