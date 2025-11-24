"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { PriceRangeSlider } from "@/components/price-range-slider"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory(null)
    }
  }, [categoryParam])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 })
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(true)

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      const matchesRating = !selectedRating || product.rating >= selectedRating

      return matchesCategory && matchesPrice && matchesRating
    })

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => Number(b.id) - Number(a.id))
        break
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : -1))
    }

    return result
  }, [selectedCategory, priceRange, selectedRating, sortBy])

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">Discover {filteredProducts.length} authentic Nepal products</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                    Categories
                    <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition ${!selectedCategory
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-muted text-foreground"
                        }`}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition ${selectedCategory === cat
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                  <PriceRangeSlider
                    min={0}
                    max={50000}
                    step={100}
                    onRangeChange={(min, max) => setPriceRange({ min, max })}
                  />
                  <p className="text-xs text-muted-foreground mt-4">
                    रु {priceRange.min.toLocaleString()} - रु {priceRange.max.toLocaleString()}
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition flex items-center gap-2 ${selectedRating === rating ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                      >
                        <span>
                          {"★".repeat(rating)}
                          {"☆".repeat(5 - rating)}
                        </span>
                        <span className="text-xs">& up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setPriceRange({ min: 0, max: 50000 })
                    setSelectedRating(null)
                  }}
                  className="w-full px-4 py-2 bg-muted text-foreground rounded text-sm font-medium hover:bg-muted/80 transition"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 text-sm bg-card border border-border rounded hover:border-primary transition focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground mb-4">No products found matching your filters</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory(null)
                      setPriceRange({ min: 0, max: 50000 })
                      setSelectedRating(null)
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
