"use client"

import { motion, Variants } from "framer-motion"

interface SplitTextProps {
    text: string
    className?: string
    delay?: number
}

export function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
    const letters = text.split("")

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    }

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    }

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            suppressHydrationWarning
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} suppressHydrationWarning>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    )
}
