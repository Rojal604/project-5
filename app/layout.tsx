import type { Metadata } from "next"
import { DM_Sans, Crimson_Text } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InitialLoader } from "@/components/initial-loader"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson-text",
})

export const metadata: Metadata = {
  title: "E-pasal NP - Premium Nepalese Products",
  description: "Authentic, hand-curated products from the heart of Nepal.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${crimsonText.variable} font-sans antialiased bg-gradient-to-r from-[#ebe0e1] to-[#f5f3f2] text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
          <div className="flex flex-col min-h-screen" suppressHydrationWarning>
            <InitialLoader />
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
