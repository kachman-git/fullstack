"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthState, User } from "./types";
import { authService } from "./services";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setState((prev) => ({ ...prev, token })); // Set token immediately
      fetchUser().catch((error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          localStorage.removeItem("token");
          setState({ user: null, token: null });
        }
      });
    }
  }, []);

  const fetchUser = async () => {
    const user = await authService.getMe();
    const token = localStorage.getItem("token");
    setState({ user, token });
  };

  const signIn = async (email: string, password: string) => {
    const { access_token } = await authService.signIn(email, password);
    localStorage.setItem("token", access_token);
    await fetchUser();
    toast({
      title: "Success",
      description: "Successfully signed in",
    });
  };

  const signUp = async (email: string, password: string) => {
    const { access_token } = await authService.signUp(email, password);
    localStorage.setItem("token", access_token);
    await fetchUser();
    toast({
      title: "Success",
      description: "Successfully created account",
    });
  };

  const signOut = () => {
    setState({ user: null, token: null });
    localStorage.removeItem("token");
    toast({
      title: "Signed out",
      description: "Successfully signed out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!state.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
