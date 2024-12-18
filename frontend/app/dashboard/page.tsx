'use client'

import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/components/protected-route'
import { Button } from '@/components/ui/button'
import { BookmarkFormDialog } from '@/components/bookmark-form-dialog'
import { BookmarkCard } from '@/components/bookmark-card'
import { ThemeToggle } from '@/components/theme-toggle'
import { useEffect, useState } from 'react'
import { Bookmark, CreateBookmarkDto } from '@/lib/types'
import { bookmarkService } from '@/lib/services'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBookmarks = async () => {
    try {
      const data = await bookmarkService.getBookmarks()
      setBookmarks(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const handleCreateBookmark = async (data: CreateBookmarkDto) => {
    await bookmarkService.createBookmark(data)
    fetchBookmarks()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">Bookmarks</h1>
              </div>
              <div className="flex items-center gap-4">
                <BookmarkFormDialog onSubmit={handleCreateBookmark} />
                <ThemeToggle />
                <span className="text-sm text-muted-foreground">{user?.email}</span>
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
              <p className="text-muted-foreground mb-4">Start by adding your first bookmark!</p>
              <BookmarkFormDialog onSubmit={handleCreateBookmark} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onUpdate={fetchBookmarks}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}

