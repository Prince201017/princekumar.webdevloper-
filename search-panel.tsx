"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults = [
    { type: "Product", name: "Women's Jeans", category: "Women" },
    { type: "Product", name: "Men's T-Shirt", category: "Men" },
    { type: "Category", name: "Underwear", category: "Categories" },
    { type: "Content", name: "Size Guide", category: "Help" },
  ].filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="top" className="h-full">
        <SheetHeader>
          <SheetTitle className="text-left">Search</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, categories, and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
              autoFocus
            />
          </div>

          {searchQuery && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                SEARCH RESULTS ({searchResults.length})
              </h3>
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <Button key={index} variant="ghost" className="w-full justify-start h-auto p-4" onClick={onClose}>
                    <div className="text-left">
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.type} • {result.category}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
