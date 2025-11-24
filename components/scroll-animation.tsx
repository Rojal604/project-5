"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollAnimationProps {
    children: ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right" | "none"
    delay?: number
    duration?: number
    viewport?: { once?: boolean; margin?: string }
}

export function ScrollAnimation({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.5,
    viewport = { once: false, margin: "-50px" }, // Re-triggers on scroll up/down
}: ScrollAnimationProps) {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay,
                ease: "easeOut",
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}
