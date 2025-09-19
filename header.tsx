"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { SearchPanel } from "./search-panel"
import { UserPanel } from "./user-panel"
import { CartPanel } from "./cart-panel"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const savedItems = localStorage.getItem("eloura-cart")
      if (savedItems) {
        const items = JSON.parse(savedItems)
        const totalCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCartCount(totalCount)
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()
    window.addEventListener("cartUpdated", updateCartCount)
    return () => window.removeEventListener("cartUpdated", updateCartCount)
  }, [])

  const navItems = [
    { name: "Women", href: "/products/women" },
    { name: "Men", href: "/products/men" },
    { name: "Jeans", href: "/products/jeans" },
    { name: "Underwear", href: "/products/underwear" },
    { name: "Accessories", href: "/products/accessories" },
    { name: "Sale", href: "/products/sale" },
  ]

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Mobile menu */}
            <div className="flex items-center lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-white/10">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-black text-white">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium tracking-wide uppercase hover:text-gray-300 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                    <div className="border-t border-gray-800 pt-4 mt-8">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-lg font-medium tracking-wide uppercase text-white hover:bg-white/10"
                        onClick={() => {
                          setIsUserPanelOpen(true)
                          setIsMenuOpen(false)
                        }}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Account
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex-1 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <a href="/" className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                ELOURA
              </a>
            </div>

            <div className="hidden lg:flex lg:space-x-8 xl:space-x-12">
              {/* Navigation removed for desktop as requested */}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsUserPanelOpen(true)}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur border-b border-white/10 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products, categories, and content..."
                    className="pl-10 pr-4 py-2 w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <UserPanel isOpen={isUserPanelOpen} onClose={() => setIsUserPanelOpen(false)} />

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
