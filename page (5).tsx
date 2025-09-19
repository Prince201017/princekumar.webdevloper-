"use client"

import { useState, useEffect } from "react"
import { DetailHeader } from "@/components/detail-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Star } from "lucide-react"

export default function MenProductDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedSizeType, setSelectedSizeType] = useState("USA")
  const [quantity, setQuantity] = useState(1)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [isCareOpen, setIsCareOpen] = useState(false)
  const [isShippingOpen, setIsShippingOpen] = useState(false)

  const product = {
    name: "Classic Fit Cotton T-Shirt",
    price: 35,
    originalPrice: 45,
    rating: 4.3,
    reviews: 89,
    description:
      "Essential cotton t-shirt with classic fit and signature Calvin Klein logo. Made from premium cotton for ultimate comfort and durability. Perfect for everyday wear with a timeless design that never goes out of style.",
    care: "Machine wash cold with like colors. Do not bleach. Tumble dry low. Do not iron directly on logo. Do not dry clean.",
    shipping:
      "Free shipping on orders over $50. Standard delivery 3-5 business days. Express delivery available for next-day shipping.",
    sizes: {
      USA: ["S", "M", "L", "XL", "XXL", "XXXL"],
      Asian: ["M", "L", "XL", "XXL", "XXXL", "4XL"],
    },
    images: [
      "/calvin-klein-fashion-model-in-minimalist-black-and.jpg",
      "/calvin-klein-women-fashion-model-in-elegant-minima.jpg",
      "/calvin-klein-fashion-model-in-minimalist-black-and.jpg",
      "/calvin-klein-women-fashion-model-in-elegant-minima.jpg",
    ],
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [product.images.length])

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    const cartItem = {
      id: Date.now(),
      name: product.name,
      price: product.price,
      size: selectedSize,
      sizeType: selectedSizeType,
      quantity: quantity,
      image: product.images[0],
    }

    const existingCart = JSON.parse(localStorage.getItem("eloura-cart") || "[]")
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem("eloura-cart", JSON.stringify(updatedCart))

    window.dispatchEvent(new Event("cartUpdated"))
    alert("Added to cart successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DetailHeader backUrl="/products/men" backLabel="Back to Men" />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <div className="relative w-full h-full">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Image indicators */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white scale-125 shadow-lg" : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Product Info */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-4 text-gray-900">
                      {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                    </div>

                    <div className="flex items-baseline space-x-3 mb-8">
                      <span className="text-3xl font-light text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Size</h3>

                    <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => {
                          setSelectedSizeType("USA")
                          setSelectedSize("")
                        }}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                          selectedSizeType === "USA"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        USA Sizes
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSizeType("Asian")
                          setSelectedSize("")
                        }}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                          selectedSizeType === "Asian"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Asian Sizes
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {product.sizes[selectedSizeType].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-4 border-2 rounded-lg transition-all text-center font-medium ${
                            selectedSize === size
                              ? "border-gray-900 bg-gray-900 text-white"
                              : "border-gray-200 hover:border-gray-400 text-gray-900"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 border-2 border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center rounded-lg font-medium"
                      >
                        -
                      </button>
                      <span className="w-16 h-12 border-2 border-gray-200 flex items-center justify-center rounded-lg font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 border-2 border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center rounded-lg font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-green-400 hover:bg-green-500 text-black font-medium py-4 text-lg rounded-lg transition-colors"
                      onClick={() => alert("Buy Now functionality")}
                    >
                      BUY NOW
                    </Button>
                    <Button
                      className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-4 text-lg rounded-lg transition-colors"
                      onClick={addToCart}
                    >
                      ADD TO CART
                    </Button>
                  </div>

                  <div className="space-y-1 border-t border-gray-200 pt-8">
                    {/* Description Dropdown */}
                    <div>
                      <button
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg px-4 transition-colors"
                      >
                        <span className="font-medium text-gray-900">Description</span>
                        {isDescriptionOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {isDescriptionOpen && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">{product.description}</div>
                      )}
                    </div>

                    {/* Care Instructions Dropdown */}
                    <div>
                      <button
                        onClick={() => setIsCareOpen(!isCareOpen)}
                        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg px-4 transition-colors"
                      >
                        <span className="font-medium text-gray-900">Care Instructions</span>
                        {isCareOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {isCareOpen && <div className="px-4 pb-4 text-gray-600 leading-relaxed">{product.care}</div>}
                    </div>

                    {/* Shipping & Returns Dropdown */}
                    <div>
                      <button
                        onClick={() => setIsShippingOpen(!isShippingOpen)}
                        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded-lg px-4 transition-colors"
                      >
                        <span className="font-medium text-gray-900">Shipping & Returns</span>
                        {isShippingOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {isShippingOpen && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">{product.shipping}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
