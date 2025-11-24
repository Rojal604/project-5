"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useCart } from "@/lib/store"
import { Button } from "@/components/ui/button"

import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const itemCount = useCart((state) => state.getItemCount())

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex items-center justify-between h-16" suppressHydrationWarning>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-serif font-bold text-primary" suppressHydrationWarning>E-pasal</div>
            <div className="ml-2 text-xs text-muted-foreground font-semibold" suppressHydrationWarning>NP</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition">
              Products
            </Link>
            <Link
              href="/products?category=Art%20%26%20Crafts"
              className="text-sm font-medium hover:text-primary transition"
            >
              Crafts
            </Link>
            <Link href="/products?category=Textiles" className="text-sm font-medium hover:text-primary transition">
              Textiles
            </Link>
            <Link
              href="/products?category=Spices%20%26%20Food"
              className="text-sm font-medium hover:text-primary transition"
            >
              Food
            </Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <Link href="/search" className="p-2 hover:bg-muted rounded-lg transition hidden sm:block">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <div className="hidden sm:flex items-center gap-2" suppressHydrationWarning>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/login?mode=signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background border-b border-border"
            >
              <div className="pb-4 space-y-2 px-4">
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-2 text-sm font-medium hover:bg-muted rounded transition"
                >
                  All Products
                </Link>
                <Link
                  href="/products?category=Art%20%26%20Crafts"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-2 text-sm font-medium hover:bg-muted rounded transition"
                >
                  Crafts
                </Link>
                <Link
                  href="/products?category=Textiles"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-2 text-sm font-medium hover:bg-muted rounded transition"
                >
                  Textiles
                </Link>
                <Link
                  href="/products?category=Spices%20%26%20Food"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-2 text-sm font-medium hover:bg-muted rounded transition"
                >
                  Food & Spices
                </Link>
                <div className="pt-4 border-t border-border mt-4 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-2 text-sm font-medium hover:bg-muted rounded transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login?mode=signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-2 text-sm font-medium bg-primary text-primary-foreground rounded transition text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
