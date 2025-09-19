"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, User, ShoppingBag, ArrowLeft } from "lucide-react"
import { SearchPanel } from "./search-panel"
import { UserPanel } from "./user-panel"
import { CartPanel } from "./cart-panel"

interface DetailHeaderProps {
  backUrl?: string
  backLabel?: string
}

export function DetailHeader({ backUrl = "/", backLabel = "Back" }: DetailHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const bag = JSON.parse(localStorage.getItem("eloura-bag") || "[]")
      setCartCount(bag.length)
    }

    updateCartCount()
    window.addEventListener("bagUpdated", updateCartCount)
    return () => window.removeEventListener("bagUpdated", updateCartCount)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <Link
              href={backUrl}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>

            {/* Brand Name */}
            <Link href="/" className="text-2xl font-bold tracking-wider text-black">
              ELOURA
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsUserPanelOpen(true)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <User className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-black transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <UserPanel isOpen={isUserPanelOpen} onClose={() => setIsUserPanelOpen(false)} />
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
