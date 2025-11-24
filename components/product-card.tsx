"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useCart, useWishlist } from "@/lib/store"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { AnimatedStars } from "@/components/animated-stars"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCart((state) => state.addItem)
  const { items: wishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const isInWishlist = wishlist.some((item) => item.id === product.id)

  const handleAddCart = () => {
    addItem(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountedPrice = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col" suppressHydrationWarning>
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isHotDeal && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              HOT
            </div>
          )}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 space-y-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleAddCart()
              }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-2"
              size="sm"
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </Button>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleWishlist()
              }}
              className="w-full py-1 bg-card/80 hover:bg-card border border-border rounded text-xs font-medium flex items-center justify-center gap-1 transition"
            >
              <Heart className={`w-3 h-3 ${isInWishlist ? "fill-accent text-accent" : ""}`} />
              {isInWishlist ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{product.category}</p>
          <h3 className="font-serif font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <AnimatedStars rating={product.rating} />
            <span className="text-xs text-muted-foreground font-medium">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-bold text-primary">रु {discountedPrice.toLocaleString()}</span>
            {product.discount && (
              <span className="text-xs text-muted-foreground line-through">रु {product.price.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
