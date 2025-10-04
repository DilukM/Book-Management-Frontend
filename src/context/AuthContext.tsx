"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthUser, LoginCredentials, RegisterData } from "@/types";
import booksData from "@/data/books.json";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Simulate API call - Check against JSON data
      const foundUser = booksData.users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (!foundUser) {
        return { success: false, message: "Invalid username or password" };
      }

      // Generate a simple token (in real app, this would come from backend)
      const token = btoa(`${foundUser.username}:${Date.now()}`);

      const authUser: AuthUser = {
        id: foundUser.id,
        username: foundUser.username,
        token,
      };

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(authUser));
      localStorage.setItem("token", token);

      setUser(authUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: "An error occurred during login" };
    }
  };

  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      // Check if username already exists
      const existingUser = booksData.users.find(
        (u) => u.username === data.username
      );
      if (existingUser) {
        return { success: false, message: "Username already exists" };
      }

      // In a real app, this would save to backend
      // For now, we'll just create a user object and log them in
      const newUser = {
        id: String(Date.now()),
        username: data.username,
      };

      const token = btoa(`${newUser.username}:${Date.now()}`);

      const authUser: AuthUser = {
        ...newUser,
        token,
      };

      localStorage.setItem("user", JSON.stringify(authUser));
      localStorage.setItem("token", token);

      setUser(authUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred during registration",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
