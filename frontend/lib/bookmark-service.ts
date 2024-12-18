import { api, handleApiError } from './api'
import { Bookmark, CreateBookmarkDto, EditBookmarkDto } from './types'
import { toast } from '@/components/ui/use-toast'

export const bookmarkService = {
  async getBookmarks() {
    try {
      const { data } = await api.get<Bookmark[]>('/bookmarks')
      return data
    } catch (error) {
      const message = handleApiError(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      })
      throw error
    }
  },

  async createBookmark(bookmark: CreateBookmarkDto) {
    try {
      const { data } = await api.post<Bookmark>('/bookmarks', bookmark)
      toast({
        title: "Success",
        description: "Bookmark created successfully",
      })
      return data
    } catch (error) {
      const message = handleApiError(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      })
      throw error
    }
  },

  async updateBookmark(id: number, bookmark: EditBookmarkDto) {
    try {
      const { data } = await api.patch<Bookmark>(`/bookmarks/${id}`, bookmark)
      toast({
        title: "Success",
        description: "Bookmark updated successfully",
      })
      return data
    } catch (error) {
      const message = handleApiError(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      })
      throw error
    }
  },

  async deleteBookmark(id: number) {
    try {
      await api.delete(`/bookmarks/${id}`)
      toast({
        title: "Success",
        description: "Bookmark deleted successfully",
      })
    } catch (error) {
      const message = handleApiError(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      })
      throw error
    }
  }
}

