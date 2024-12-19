import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col dark:text-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Bookmark className="h-6 w-6" />
              <span className="text-xl font-semibold">Bookmarks</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl  font-bold tracking-tight sm:text-6xl">
              Welcome to Bookmarks
            </h1>
            <p className="text-xl text-muted-foreground">
              Your personal space to save and organize your favorite links.
              Access them from anywhere, anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8"
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>

          <div className="grid gap-8 pt-8 sm:grid-cols-3">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Easy to Use</h2>
              <p className="text-muted-foreground">
                Simple and intuitive interface to manage your bookmarks
                efficiently
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Secure</h2>
              <p className="text-muted-foreground">
                Your bookmarks are private and protected with modern security
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Accessible</h2>
              <p className="text-muted-foreground">
                Access your bookmarks from any device with an internet
                connection
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center text-sm text-muted-foreground">
            <p>© 2024 Bookmarks. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
