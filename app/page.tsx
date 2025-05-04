"use client"

import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "@/components/auth/LoginForm"
import { ShoppingBasketIcon as Basketball } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] px-4 py-8 md:py-12">
      {user.isLoggedIn ? (
        <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <Basketball className="h-12 w-12 sm:h-16 sm:w-16 text-primary animate-bounce" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Welcome to BallClub Manager, {user.username}!
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Easily manage your basketball teams and players with our intuitive interface. Browse players, create teams,
            and assign players to your teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/players">Browse Players</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/teams">Manage Teams</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6 w-full max-w-md px-4 sm:px-0">
          <div className="text-center space-y-2">
            <Basketball className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto" />
            <h1 className="text-2xl sm:text-3xl font-bold">BallClub Manager</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sign in to start managing your basketball teams
            </p>
          </div>
          <LoginForm />
        </div>
      )}
    </div>
  )
}
