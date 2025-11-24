"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/lib/products"

interface HeroCarouselProps {
    products: Product[]
}

export function HeroCarousel({ products }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
        }, 3500) // Rotate every 3.5 seconds

        return () => clearInterval(timer)
    }, [products.length])

    if (!products.length) return null

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <img
                        src={products[currentIndex].image || "/placeholder.svg"}
                        alt={products[currentIndex].name}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient for text readability if needed, though here it's just an image showcase */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Optional: Product Name Label */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
                            {products[currentIndex].name}
                        </span>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {products.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
