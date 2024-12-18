// Update types to match NestJS backend
export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  hash?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

export interface Bookmark {
  id: number;
  title: string;
  description?: string;
  link: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookmarkDto {
  title: string;
  description?: string;
  link: string;
}

export interface EditBookmarkDto {
  title?: string;
  description?: string;
  link?: string;
}
