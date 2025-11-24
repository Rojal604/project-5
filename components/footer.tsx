"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="bg-card border-t border-border" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-serif font-bold text-primary mb-2">E-pasal NP</div>
            <p className="text-sm text-muted-foreground">Authentic premium products from Nepal, curated with care.</p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products?category=Textiles" className="hover:text-primary transition">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/products?category=Art%20%26%20Crafts" className="hover:text-primary transition">
                  Art & Crafts
                </Link>
              </li>
              <li>
                <Link href="/products?category=Spices%20%26%20Food" className="hover:text-primary transition">
                  Spices & Food
                </Link>
              </li>
              <li>
                <Link href="/products?category=Spiritual%20Items" className="hover:text-primary transition">
                  Spiritual Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Newsletter</h4>
            <p className="text-xs text-muted-foreground mb-3">Subscribe for exclusive offers and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-xs bg-muted border border-border rounded hover:border-primary transition focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="px-3 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded hover:bg-primary/90 transition">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 E-pasal NP. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">
              <Twitter className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
