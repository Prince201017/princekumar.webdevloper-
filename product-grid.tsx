"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

export function ProductGrid() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Women's Classic Jeans",
      price: 89.99,
      originalPrice: 119.99,
      image: "/calvin-klein-denim-jeans-product-shot-minimalist-s.jpg",
      category: "Women",
      isSale: true,
    },
    {
      id: "2",
      name: "Men's Cotton T-Shirt",
      price: 39.99,
      image: "/calvin-klein-men-fashion-model-in-sleek-modern-clo.jpg",
      category: "Men",
      isNew: true,
    },
    {
      id: "3",
      name: "Women's Elegant Dress",
      price: 149.99,
      image: "/calvin-klein-women-fashion-model-in-elegant-minima.jpg",
      category: "Women",
    },
    {
      id: "4",
      name: "Underwear Collection",
      price: 29.99,
      image: "/calvin-klein-underwear-collection-clean-white-back.jpg",
      category: "Underwear",
      isNew: true,
    },
    {
      id: "5",
      name: "Men's Casual Shirt",
      price: 69.99,
      image: "/calvin-klein-men-fashion-model-in-sleek-modern-clo.jpg",
      category: "Men",
    },
    {
      id: "6",
      name: "Women's Summer Top",
      price: 49.99,
      originalPrice: 69.99,
      image: "/calvin-klein-women-fashion-model-in-elegant-minima.jpg",
      category: "Women",
      isSale: true,
    },
  ])

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()

    const cartItem = {
      id: Date.now(),
      name: product.name,
      price: product.price,
      size: "M", // Default size
      sizeType: "USA",
      quantity: 1,
      image: product.image,
    }

    const existingCart = JSON.parse(localStorage.getItem("eloura-cart") || "[]")
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem("eloura-cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
    alert("Added to cart successfully!")
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 tracking-tight">NEW ARRIVALS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/products/${product.category.toLowerCase()}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-card rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Product badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <span className="bg-black text-white text-xs px-2 py-1 rounded">NEW</span>}
                    {product.isSale && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">SALE</span>}
                  </div>

                  {/* Wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.preventDefault()} // Prevent navigation when clicking wishlist
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Add to cart overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full" size="sm" onClick={(e) => addToCart(product, e)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-sm tracking-wide uppercase">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
