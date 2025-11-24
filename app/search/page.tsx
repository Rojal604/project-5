"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { searchProducts } from "@/lib/search"
import { Search, ArrowLeft } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState(searchProducts(initialQuery))

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchProducts(query))
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-serif font-bold mb-8">Search Products</h1>

            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, categories, or items..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition text-lg"
                />
              </div>
            </form>

            {query && (
              <p className="mt-4 text-sm text-muted-foreground">
                Found <span className="font-semibold text-foreground">{results.length}</span> result
                {results.length !== 1 ? "s" : ""} for "{query}"
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!query && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">Start typing to search for products</p>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-6">No products found for "{query}"</p>
              <p className="text-sm text-muted-foreground mb-6">
                Try searching with different keywords or browse our categories
              </p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse All Products</Button>
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6`}>
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/products">
                  <Button variant="outline" className="px-8 py-3 bg-transparent">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}
