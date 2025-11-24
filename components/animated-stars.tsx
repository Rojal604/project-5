"use client"

import { motion } from "framer-motion"
import { Star, StarHalf } from "lucide-react"

interface AnimatedStarsProps {
    rating: number
    className?: string
}

export function AnimatedStars({ rating, className = "" }: AnimatedStarsProps) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
        <div className={`flex items-center gap-0.5 ${className}`} suppressHydrationWarning>
            {[...Array(fullStars)].map((_, i) => (
                <motion.div
                    key={`full-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: i * 0.1,
                    }}
                >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
            ))}
            {hasHalfStar && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: fullStars * 0.1,
                    }}
                >
                    <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <motion.div
                    key={`empty-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.1,
                    }}
                >
                    <Star className="w-4 h-4 text-muted-foreground/30" />
                </motion.div>
            ))}
        </div>
    )
}
