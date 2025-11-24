"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplitText } from "@/components/split-text"

export function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500) // Show for 2.5 seconds

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                    suppressHydrationWarning
                >
                    <div className="flex flex-col items-center gap-4" suppressHydrationWarning>
                        <SplitText
                            text="E-pasal NP"
                            className="text-4xl md:text-6xl font-serif font-bold text-primary"
                            delay={0.2}
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="h-1 bg-primary rounded-full"
                            suppressHydrationWarning
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
