'use client'

import { Bookmark, EditBookmarkDto } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkFormDialog } from "./bookmark-form-dialog"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Edit, Loader2, Trash } from 'lucide-react'
import { bookmarkService } from "@/lib/services"

interface BookmarkCardProps {
  bookmark: Bookmark
  onUpdate: () => void
}

export function BookmarkCard({ bookmark, onUpdate }: BookmarkCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await bookmarkService.deleteBookmark(bookmark.id)
      onUpdate()
    } catch (error) {
      // Error is handled by the service
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdate = async (data: EditBookmarkDto) => {
    try {
      await bookmarkService.updateBookmark(bookmark.id, data)
      onUpdate()
    } catch (error) {
      // Error is handled by the service
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{bookmark.title}</span>
          <div className="flex gap-2">
            <BookmarkFormDialog
              bookmark={bookmark}
              onSubmit={handleUpdate}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              }
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your bookmark.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardTitle>
        {bookmark.description && (
          <CardDescription>{bookmark.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <a
          href={bookmark.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline break-all"
        >
          {bookmark.link}
        </a>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Added {new Date(bookmark.createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  )
}

