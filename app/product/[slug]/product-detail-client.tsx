"use client"

import { useState } from "react"
import type { Product } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { AnimatedStars } from "@/components/animated-stars"
import { Button } from "@/components/ui/button"
import { useCart, useWishlist } from "@/lib/store"
import { Heart, Share2 } from "lucide-react"
import { getImagePath } from "@/lib/utils-path"

export function ProductDetailClient({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState<string | undefined>()
    const [selectedColor, setSelectedColor] = useState<string | undefined>()
    const [isAdded, setIsAdded] = useState(false)

    const addItem = useCart((state) => state.addItem)
    const { items: wishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
    const isInWishlist = wishlist.some((item) => item.id === product?.id)

    const discountedPrice = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price

    const handleAddCart = () => {
        addItem(product, quantity, selectedSize, selectedColor)
        setIsAdded(true)
        setQuantity(1)
        setTimeout(() => setIsAdded(false), 2000)
    }

    const handleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product)
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                    <img
                        src={getImagePath(product.image || "/placeholder.svg")}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                {product.isFeatured && (
                    <div className="text-xs text-muted-foreground">This is one of our featured collections</div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                <div>
                    <p className="text-sm text-primary uppercase tracking-widest font-semibold mb-2">{product.category}</p>
                    <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                        <AnimatedStars rating={product.rating} />
                        <span className="font-semibold text-foreground">{product.rating}</span>
                        <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-2 pb-6 border-b border-border">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-primary">रु {discountedPrice.toLocaleString()}</span>
                        {product.discount && (
                            <>
                                <span className="text-lg text-muted-foreground line-through">
                                    रु {product.price.toLocaleString()}
                                </span>
                                <span className="text-sm font-semibold bg-accent/20 text-accent px-2 py-1 rounded">
                                    Save {product.discount}%
                                </span>
                            </>
                        )}
                    </div>
                    <p className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                        {product.inStock ? "✓ In Stock" : "Out of Stock"}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <h3 className="font-semibold text-foreground mb-2">About This Product</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                {/* Size Selection */}
                {product.sizes && (
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 text-sm font-medium rounded border transition ${selectedSize === size
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card border-border hover:border-primary"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Color Selection */}
                {product.colors && (
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 text-sm font-medium rounded border transition ${selectedColor === color
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card border-border hover:border-primary"
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-4 py-2 bg-muted rounded hover:bg-muted/80 transition"
                        >
                            -
                        </button>
                        <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-4 py-2 bg-muted rounded hover:bg-muted/80 transition"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-6 border-t border-border">
                    <Button
                        onClick={handleAddCart}
                        disabled={!product.inStock}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold"
                    >
                        {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                    </Button>
                    <button
                        onClick={handleWishlist}
                        className="w-full py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                    >
                        <Heart className={`w-5 h-5 ${isInWishlist ? "fill-accent text-accent" : ""}`} />
                        {isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                    </button>
                    <button className="w-full py-3 bg-card border border-border hover:border-primary text-foreground rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                        <Share2 className="w-5 h-5" />
                        Share
                    </button>
                </div>

                {/* Benefits */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                    <p className="flex gap-2">
                        <span className="text-accent">✓</span> Authentic Product
                    </p>
                    <p className="flex gap-2">
                        <span className="text-accent">✓</span> Secure Checkout
                    </p>
                    <p className="flex gap-2">
                        <span className="text-accent">✓</span> Fast Delivery
                    </p>
                    <p className="flex gap-2">
                        <span className="text-accent">✓</span> 30-Day Returns
                    </p>
                </div>
            </div>
        </div>
    )
}
