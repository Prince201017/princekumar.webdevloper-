import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Filter, SortAsc } from "lucide-react"
import Link from "next/link"

const allProducts = [
  // Women's products
  {
    id: "w1",
    name: "Women's Classic Jeans",
    price: 89.99,
    originalPrice: 119.99,
    image: "/calvin-klein-denim-jeans-product-shot-minimalist-s.jpg",
    category: "Women",
    isSale: true,
  },
  {
    id: "w2",
    name: "Women's Elegant Dress",
    price: 149.99,
    image: "/calvin-klein-women-fashion-model-in-elegant-minima.jpg",
    category: "Women",
  },
  // Men's products
  {
    id: "m1",
    name: "Men's Cotton T-Shirt",
    price: 39.99,
    image: "/calvin-klein-men-fashion-model-in-sleek-modern-clo.jpg",
    category: "Men",
    isNew: true,
  },
  {
    id: "m2",
    name: "Men's Casual Shirt",
    price: 69.99,
    image: "/calvin-klein-men-fashion-model-in-sleek-modern-clo.jpg",
    category: "Men",
  },
  // Underwear products
  {
    id: "u1",
    name: "Underwear Collection",
    price: 29.99,
    image: "/calvin-klein-underwear-collection-clean-white-back.jpg",
    category: "Underwear",
    isNew: true,
  },
  {
    id: "u2",
    name: "Cotton Boxers 2-Pack",
    price: 34.99,
    image: "/calvin-klein-underwear-collection-clean-white-back.jpg",
    category: "Underwear",
  },
]

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <img
          src="/calvin-klein-fashion-model-in-minimalist-black-and.jpg"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">ALL PRODUCTS</h1>
            <p className="text-lg lg:text-xl mb-8 max-w-md">Discover our complete collection</p>
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

      {/* Category Links */}
      <section className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products/women">
              <Button variant="outline">Women</Button>
            </Link>
            <Link href="/products/men">
              <Button variant="outline">Men</Button>
            </Link>
            <Link href="/products/underwear">
              <Button variant="outline">Underwear</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{allProducts.length} Products</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="ghost" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {allProducts.map((product) => (
              <div key={product.id} className="group relative">
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
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Add to cart overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full" size="sm">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
