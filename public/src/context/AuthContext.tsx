import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { jwtDecode as decode, JwtPayload } from 'jwt-decode';
import useHttp from '../hooks/useHttp';
import { toast } from 'react-toastify';

const TOKEN_KEY_NAME = "token";
const REFRESH_TOKEN_KEY_NAME = "refresh_token";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  id: number | null;
  role: string | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  token: null,
  role: null,
  isAuthenticated: false,
  user: null,
  id: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { request } = useHttp();
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY_NAME));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem(REFRESH_TOKEN_KEY_NAME)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(TOKEN_KEY_NAME) !== null
  );
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const lastTokenRef = useRef<string | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const login = (token: string, refreshToken: string) => {
    setIsAuthenticated(true);
    setToken(token);
    setRefreshToken(refreshToken);

    try {
      const decodedUser = decode<User>(token);
      setUser(decodedUser);
      setId(decodedUser.id);
      setRole(decodedUser.role);
    } catch (error) {
      toast.error(error?.toString());
      console.error('Failed to decode token', error);
      setUser(null);
    }
    console.log('loacl storage token', token);

    localStorage.setItem(TOKEN_KEY_NAME, token);
    localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setId(null);
    setRole(null);
    localStorage.removeItem(TOKEN_KEY_NAME);
    localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }
  };

  const refreshTheToken = async () => {
    if (!refreshToken) return;

    try {
      const response = await request({
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      });

      const data = (await response.json()) as { token: string };

      const { token: newToken } = data;
      setToken(newToken);
      localStorage.setItem(TOKEN_KEY_NAME, newToken);

      try {
        const decodedUser = decode<User>(newToken);
        setUser(decodedUser);
        setId(decodedUser.id);
        setRole(decodedUser.role);
      } catch (error) {
        console.error('Failed to decode token', error);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  };

  useEffect(() => {
    if (token && token !== lastTokenRef.current) {
      lastTokenRef.current = token;

      const refreshTheTokenSync = () => {
        refreshTheToken().catch((error) => {
          console.error('Failed to refresh token:', error);
          logout();
        });
      };

      const decoded = decode<JwtPayload>(token);
      const expirationTime = (decoded.exp ? decoded.exp * 1000 : 0) - 60000;

      if (Date.now() >= expirationTime) {
        refreshTheTokenSync();
      }

      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = window.setTimeout(
        refreshTheTokenSync,
        expirationTime - Date.now()
      );

      return () => {
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
        }
      };
    }
  }, [token]);

  // Load user data from token on page refresh
  useEffect(() => {
    console.log(`token`, token);

    if (token) {
      try {
        const decodedUser = decode<User>(token);
        setUser(decodedUser);
        setId(decodedUser.id);
        setRole(decodedUser.role);
      } catch (error) {
        console.error('Failed to decode token on page load', error);
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, role, login, logout, token, id }}
    >
      {children}
    </AuthContext.Provider>
  );
};
