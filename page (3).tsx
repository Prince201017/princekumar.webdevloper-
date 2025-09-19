"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { FilterSortPanel } from "@/components/filter-sort-panel"

const underwearProducts = [
  {
    id: "u1",
    name: "Classic Briefs 3-Pack",
    price: 29.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    isNew: true,
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    isSale: false,
    popularity: 89,
  },
  {
    id: "u2",
    name: "Cotton Boxers 2-Pack",
    price: 34.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy", "Black"],
    isSale: false,
    isNew: false,
    popularity: 85,
  },
  {
    id: "u3",
    name: "Women's Bralette",
    price: 24.99,
    originalPrice: 34.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    isSale: true,
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Beige"],
    isNew: false,
    popularity: 92,
  },
  {
    id: "u4",
    name: "Men's Trunk 3-Pack",
    price: 39.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray"],
    isSale: false,
    isNew: false,
    popularity: 87,
  },
  {
    id: "u5",
    name: "Women's Bikini 3-Pack",
    price: 27.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    isNew: true,
    category: "Bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Beige"],
    isSale: false,
    popularity: 88,
  },
  {
    id: "u6",
    name: "Lounge Set",
    price: 49.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gray", "Navy", "White"],
    isSale: false,
    isNew: false,
    popularity: 84,
  },
  {
    id: "u7",
    name: "Sports Bra",
    price: 32.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    isSale: false,
    isNew: true,
    popularity: 90,
  },
  {
    id: "u8",
    name: "Thermal Set",
    price: 59.99,
    originalPrice: 79.99,
    image: "/eloura-underwear-collection-clean-white-back.jpg",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black"],
    isSale: true,
    isNew: false,
    popularity: 81,
  },
]

export default function UnderwearPage() {
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 500],
  })
  const [sortBy, setSortBy] = useState("")

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("eloura-cart")
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = underwearProducts.filter((product) => {
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
        return false
      }

      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
        return false
      }

      return true
    })

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "popular":
        filtered.sort((a, b) => b.popularity - a.popularity)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        break
    }

    return filtered
  }, [filters, sortBy])

  const addToBag = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: "M",
      sizeType: "USA",
    }

    const existingItem = cart.find((item: any) => item.id === product.id)
    let newCart

    if (existingItem) {
      newCart = cart.map((item: any) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      newCart = [...cart, cartItem]
    }

    setCart(newCart)
    localStorage.setItem("eloura-cart", JSON.stringify(newCart))
  }

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbNav />

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <img
          src="/eloura-underwear-collection-clean-white-back.jpg"
          alt="Underwear Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 tracking-tight">UNDERWEAR</h1>
            <p className="text-base sm:text-lg lg:text-xl mb-8 max-w-md">
              Comfort meets style in our essential collection
            </p>
            <Link href="/">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black bg-transparent"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedProducts.length} of {underwearProducts.length} Products
            </p>
            <FilterSortPanel onFilterChange={setFilters} onSortChange={setSortBy} />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <Link key={product.id} href={`/products/underwear/${product.id}`} className="group relative block">
                <div className="aspect-[3/4] overflow-hidden bg-card rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Product badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
                    {product.isNew && <span className="bg-black text-white text-xs px-2 py-1 rounded">NEW</span>}
                    {product.isSale && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">SALE</span>}
                  </div>

                  {/* Wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 sm:w-10 sm:h-10"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>

                {/* Product info */}
                <div className="mt-3 sm:mt-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-xs sm:text-sm tracking-wide uppercase flex-1 leading-tight">
                      {product.name}
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 sm:h-7 px-1.5 sm:px-2 text-xs bg-transparent shrink-0"
                      onClick={(e) => addToBag(product, e)}
                    >
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      <span className="hidden xs:inline">Add</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products match your current filters.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setFilters({ categories: [], sizes: [], colors: [], priceRange: [0, 500] })
                  setSortBy("")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
