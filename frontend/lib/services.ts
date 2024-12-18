import { api, handleApiError } from "./api";
import {
  Bookmark,
  CreateBookmarkDto,
  EditBookmarkDto,
  AuthResponse,
  User,
} from "./types";
import { toast } from "@/hooks/use-toast";

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>("/auth/signin", {
        email,
        password,
      });
      return data;
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: message,
      });
      throw error;
    }
  },

  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>("/auth/signup", {
        email,
        password,
      });
      return data;
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: message,
      });
      throw error;
    }
  },

  async getMe(): Promise<User> {
    try {
      const { data } = await api.get<User>("/users/me");
      return data;
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      throw error;
    }
  },
};

export const bookmarkService = {
  async getBookmarks(): Promise<Bookmark[]> {
    try {
      const { data } = await api.get<Bookmark[]>("/bookmarks");
      return data;
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      throw error;
    }
  },

  async createBookmark(bookmark: CreateBookmarkDto): Promise<Bookmark> {
    try {
      const { data } = await api.post<Bookmark>("/bookmarks", bookmark);
      toast({
        title: "Success",
        description: "Bookmark created successfully",
      });
      return data;
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      throw error;
    }
  },

  async updateBookmark(
    id: number,
    bookmark: EditBookmarkDto
  ): Promise<Bookmark> {
    try {
      const { data } = await api.patch<Bookmark>(`/bookmarks/${id}`, bookmark);
      toast({
        title: "Success",
        description: "Bookmark updated successfully",
      });
      return data;
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      throw error;
    }
  },

  async deleteBookmark(id: number): Promise<void> {
    try {
      await api.delete(`/bookmarks/${id}`);
      toast({
        title: "Success",
        description: "Bookmark deleted successfully",
      });
    } catch (error) {
      const message = handleApiError(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      throw error;
    }
  },
};
