"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

function LoginContent() {
    const searchParams = useSearchParams()
    const mode = searchParams.get("mode")
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [signupPassword, setSignupPassword] = useState("")

    const calculateStrength = (password: string) => {
        let score = 0
        const suggestions: string[] = []

        if (password.length > 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        if (password.length < 8) suggestions.push("Use at least 8 characters")
        if (!/[A-Z]/.test(password)) suggestions.push("Add an uppercase letter")
        if (!/[0-9]/.test(password)) suggestions.push("Add a number")
        if (!/[^A-Za-z0-9]/.test(password)) suggestions.push("Add a special character")

        return {
            score,
            suggestions,
            label: ["Weak", "Fair", "Good", "Strong", "Very Strong"][score],
            color: [
                "bg-red-500",
                "bg-orange-500",
                "bg-yellow-500",
                "bg-blue-500",
                "bg-green-500",
            ][score],
            textColor: [
                "text-red-500",
                "text-orange-500",
                "text-yellow-500",
                "text-blue-500",
                "text-green-500",
            ][score],
        }
    }

    const passwordStrength = calculateStrength(signupPassword)

    useEffect(() => {
        if (mode === "signup") {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [mode])

    return (
        <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden bg-[#f8fafc] py-20">
            {/* Animated Background Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-[100px] mix-blend-multiply animate-blob" />
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-300/30 blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-300/30 blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-[100px] mix-blend-multiply animate-blob" />

            {/* Glassmorphism Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl mb-24"
            >
                <AnimatePresence mode="wait">
                    {isLogin ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
                                <p className="text-slate-500">Sign in to your account to continue</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="w-full pl-10 pr-12 py-3 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full py-6 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]">
                                Sign In
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-transparent px-2 text-slate-500 backdrop-blur-sm">Or continue with</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-3 bg-white/60 hover:bg-white border border-white/60 rounded-xl flex items-center justify-center gap-3 text-slate-700 font-medium transition-all hover:scale-[1.01] shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Continue with Google
                                </button>
                                <button className="w-full py-3 bg-white/60 hover:bg-white border border-white/60 rounded-xl flex items-center justify-center gap-3 text-slate-700 font-medium transition-all hover:scale-[1.01] shadow-sm">
                                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Continue with Meta
                                </button>
                            </div>

                            <div className="text-center space-y-4 pt-4">
                                <button className="text-sm text-slate-500 hover:text-slate-800 transition">
                                    Forgot your password?
                                </button>
                                <p className="text-sm text-slate-500">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="text-slate-800 font-semibold hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="signup"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
                                <p className="text-slate-500">Sign up to get started</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {/* Password Strength Indicator */}
                                    {signupPassword && (
                                        <div className="space-y-2 pt-1">
                                            <div className="flex gap-1 h-1">
                                                {[...Array(4)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-full flex-1 rounded-full transition-colors duration-300 ${i < passwordStrength.score
                                                            ? passwordStrength.color
                                                            : "bg-slate-200"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <span className={`text-xs font-medium ${passwordStrength.textColor}`}>
                                                    {passwordStrength.label}
                                                </span>
                                                {passwordStrength.suggestions.length > 0 && (
                                                    <ul className="text-xs text-slate-500 text-right space-y-0.5">
                                                        {passwordStrength.suggestions.map((suggestion, i) => (
                                                            <li key={i}>{suggestion}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button className="w-full py-6 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]">
                                Sign Up
                            </Button>

                            <div className="text-center pt-4">
                                <p className="text-sm text-slate-500">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="text-slate-800 font-semibold hover:underline"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}
