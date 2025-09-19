"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size: string
  sizeType: string
}

export function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const loadCartItems = () => {
      const savedItems = localStorage.getItem("eloura-cart")
      if (savedItems) {
        setCartItems(JSON.parse(savedItems))
      }
    }

    loadCartItems()

    const handleCartUpdate = () => {
      loadCartItems()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem("eloura-cart", JSON.stringify(items))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      const updatedItems = cartItems.filter((item) => item.id !== id)
      setCartItems(updatedItems)
      updateLocalStorage(updatedItems)
    } else {
      const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      setCartItems(updatedItems)
      updateLocalStorage(updatedItems)
    }
  }

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    updateLocalStorage(updatedItems)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button className="mt-4" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} ({item.sizeType})
                    </p>
                    <p className="font-medium">${item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full mt-4 bg-black hover:bg-gray-800" size="lg">
              Checkout
            </Button>

            {subtotal < 100 && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
