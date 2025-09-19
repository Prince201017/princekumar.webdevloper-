"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Navigation, Home, ShoppingBag, User, Heart, Search, ChevronRight, X } from "lucide-react"
import Link from "next/link"

export function QuickNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationSections = [
    {
      title: "Main Pages",
      items: [
        { name: "Home", href: "/", icon: Home },
        { name: "All Products", href: "/products", icon: ShoppingBag },
      ],
    },
    {
      title: "Categories",
      items: [
        { name: "Women", href: "/products/women", icon: null },
        { name: "Men", href: "/products/men", icon: null },
        { name: "Underwear", href: "/products/underwear", icon: null },
        { name: "Jeans", href: "/products/jeans", icon: null },
        { name: "Accessories", href: "/products/accessories", icon: null },
        { name: "Sale", href: "/products/sale", icon: null },
      ],
    },
    {
      title: "Account & More",
      items: [
        { name: "My Account", href: "/account", icon: User },
        { name: "Wishlist", href: "/wishlist", icon: Heart },
        { name: "Search", href: "/search", icon: Search },
      ],
    },
  ]

  return (
    <>
      {/* Floating Quick Nav Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Navigation className="h-6 w-6" />
              <span className="sr-only">Quick Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white p-0">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold tracking-tight">Quick Navigation</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-y-auto h-full pb-20">
              {navigationSections.map((section, sectionIndex) => (
                <div key={section.title} className="p-6 border-b border-gray-100 last:border-b-0">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">{section.title}</h3>
                  <nav className="space-y-2">
                    {section.items.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            {IconComponent && (
                              <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
                            )}
                            <span className="font-medium text-gray-900 group-hover:text-black">{item.name}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
