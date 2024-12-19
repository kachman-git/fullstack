"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthState, User } from "./types";
import { authService } from "./services";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await authService.getMe();
        setState({ user, token });
      } catch (error) {
        localStorage.removeItem("token");
        setState({ user: null, token: null });
      }
    }
    setIsLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { access_token } = await authService.signIn(email, password);
      localStorage.setItem("token", access_token);
      const user = await authService.getMe();
      setState({ user, token: access_token });
      toast({
        title: "Success",
        description: "Successfully signed in",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { access_token } = await authService.signUp(email, password);
      localStorage.setItem("token", access_token);
      const user = await authService.getMe();
      setState({ user, token: access_token });
      toast({
        title: "Success",
        description: "Successfully created account",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account",
      });
      throw error;
    }
  };

  const signOut = () => {
    setState({ user: null, token: null });
    localStorage.removeItem("token");
    router.push("/auth/signin");
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
        isLoading,
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
