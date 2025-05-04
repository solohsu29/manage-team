"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import UserProfile from "@/components/auth/UserProfile"
import { ShoppingBasketIcon as Basketball, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = user.isLoggedIn
    ? [
        { href: "/players", label: "Players" },
        { href: "/teams", label: "Teams" },
      ]
    : []

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" w-full flex h-16 items-center justify-between">
        <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <Basketball className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg md:text-xl">BallClub Manager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        </div>

        <div className="flex items-center gap-4">
          {user.isLoggedIn && (
            <div className="hidden md:block">
              <UserProfile />
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-6">
                {user.isLoggedIn && (
                  <div className="mb-4">
                    <UserProfile />
                  </div>
                )}
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="font-medium text-base transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
