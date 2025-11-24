"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const total = getTotal()
  const shipping = total > 3000 ? 0 : 200

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 py-20">
            <div className="text-6xl">🛒</div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Your Cart is Empty</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explore our curated collection of authentic Nepal products and add something special to your cart.
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shopping
          </Link>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemPrice = item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price

                return (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.slug}`} className="block">
                        <h3 className="font-semibold text-foreground hover:text-primary transition mb-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-3">{item.category}</p>
                      {item.selectedSize && <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>}
                      {item.selectedColor && (
                        <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-bold text-foreground">रु {(itemPrice * item.quantity).toLocaleString()}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-muted rounded px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-border rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
                <h2 className="font-serif text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 py-4 border-t border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">रु {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? <span className="text-green-600">FREE</span> : `रु ${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600 font-medium">Free shipping on orders over रु 3000</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="font-serif font-bold text-lg text-foreground">Total</span>
                  <span className="font-serif font-bold text-lg text-primary">
                    रु {(total + shipping).toLocaleString()}
                  </span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>

                <button
                  onClick={() => clearCart()}
                  className="w-full py-2 text-destructive hover:bg-destructive/10 rounded-lg text-sm font-medium transition"
                >
                  Clear Cart
                </button>

                <Link href="/products">
                  <button className="w-full py-2 text-primary hover:bg-primary/10 rounded-lg text-sm font-medium transition">
                    Continue Shopping
                  </button>
                </Link>

                {/* Info Box */}
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-xs text-foreground font-semibold mb-2">Why shop with us?</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>✓ 100% Authentic Products</li>
                    <li>✓ Secure Payment</li>
                    <li>✓ Fast Delivery</li>
                    <li>✓ Easy Returns</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

    </div>
  )
}
