"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { ArrowLeft, Check } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Nepal",
  })

  const total = getTotal()
  const shipping = total > 3000 ? 0 : 200

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 py-20">
            <h1 className="text-3xl font-serif font-bold text-foreground">Your cart is empty</h1>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-8 py-20 max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-4">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email shortly with tracking information.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Order Total</p>
                <p className="text-2xl font-bold text-primary">रु {(total + shipping).toLocaleString()}</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-3">Items ({items.length})</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <p key={item.id} className="text-sm text-foreground flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>रु {(item.price * item.quantity).toLocaleString()}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/products" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full py-3 rounded-lg bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  const isFormValid = Object.values(formData).every((value) => value.trim())

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                  <h2 className="font-serif text-xl font-bold text-foreground">Shipping Information</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+977-1-1234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="123 Street Name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Kathmandu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="44600"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                  <h2 className="font-serif text-xl font-bold text-foreground">Payment Method</h2>
                  <p className="text-sm text-muted-foreground">
                    This is a simulated checkout. In production, this would connect to Stripe or another payment
                    processor.
                  </p>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm font-semibold text-foreground">Test Payment Information</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You can use any test card to complete this order.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid || isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Complete Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
                <h2 className="font-serif text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm pb-3 border-b border-border">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">रु {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

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
                </div>

                <div className="flex justify-between">
                  <span className="font-serif font-bold text-lg text-foreground">Total</span>
                  <span className="font-serif font-bold text-lg text-primary">
                    रु {(total + shipping).toLocaleString()}
                  </span>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-xs text-foreground font-semibold mb-2">Secure Checkout</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>✓ SSL Encrypted</li>
                    <li>✓ Secure Payment</li>
                    <li>✓ Your data is safe</li>
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
