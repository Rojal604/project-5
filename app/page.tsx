"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import CardSwap, { Card } from "@/components/CardSwap"
import CountUp from "@/components/count-up"
import { ScrollAnimation } from "@/components/scroll-animation"
import { getImagePath } from "@/lib/utils-path"

export default function HomePage() {
  const hotDeals = products.filter((p) => p.isHotDeal).slice(0, 4)
  const featured = products.filter((p) => p.isFeatured).slice(0, 4)
  const mostBought = products.slice(0, 4) // Placeholder logic for most bought

  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 md:pt-6 md:pb-12">
            <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-8">
                <ScrollAnimation direction="right">
                  <div>
                    <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                      Welcome to E-pasal NP
                    </p>
                    <h1 className="text-3xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-2 md:mb-4">
                      Discover Premium Nepal
                    </h1>
                    <p className="text-xs md:text-lg text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
                      Authentic, hand-curated products from the heart of Nepal. From traditional textiles to spiritual
                      artifacts, find unique treasures that tell stories.
                    </p>
                  </div>

                  <div className="flex flex-row gap-2 sm:gap-4">
                    <Link href="/products">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 text-xs sm:px-8 sm:py-3 sm:text-base rounded-lg flex items-center gap-1 sm:gap-2">
                        Explore Collections
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </Link>
                    <Link href="/search">
                      <Button variant="outline" className="px-3 py-2 text-xs sm:px-8 sm:py-3 sm:text-base rounded-lg bg-transparent">
                        Browse by Category
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pt-4 md:pt-8 border-t border-border max-w-[50%] md:max-w-none">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        <CountUp to={30} />+
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Curated Products</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        <CountUp to={100} />%
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Authentic</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        <CountUp to={4.8} />★
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>

              <ScrollAnimation direction="left" delay={0.2} className="relative h-[250px] -mt-56 md:mt-0 md:h-[598px] z-0">
                <div className="w-full h-full flex items-center justify-center">
                  <CardSwap width="100%" height="100%" cardDistance={40} verticalDistance={50}>
                    {hotDeals.map((product) => (
                      <Card
                        key={product.id}
                        className="w-[450px] h-[600px] bg-card rounded-xl overflow-hidden shadow-xl border border-border cursor-pointer"
                        onClick={() => {
                          const element = document.getElementById('hot-deals');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={getImagePath(product.image || "/placeholder.svg")}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.discount && (
                            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                              {product.discount}% OFF
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 px-6 pt-6 pb-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                            <div style={{ transform: 'skewY(-6deg)' }}>
                              <p className="font-semibold truncate text-lg">{product.name}</p>
                              <p className="text-sm opacity-90 font-medium">{product.price}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardSwap>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Hot Deals Section */}
        <section id="hot-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ScrollAnimation direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Limited Time</p>
                <h2 className="text-4xl font-serif font-bold text-foreground">Hot Deals</h2>
              </div>
              <Link href="/products?deals=true">
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            {hotDeals.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 0.1} direction="up">
                <ProductCard product={product} />
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-muted/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation direction="up">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Handpicked</p>
                  <h2 className="text-4xl font-serif font-bold text-foreground">Featured Collection</h2>
                </div>
                <Link href="/products?featured=true">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
              {featured.map((product, index) => (
                <ScrollAnimation key={product.id} delay={index * 0.1} direction="up">
                  <ProductCard product={product} />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-4 gap-8">
            <ScrollAnimation direction="up" delay={0.1} className="text-center space-y-3">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold text-foreground">100% Authentic</h3>
              <p className="text-sm text-muted-foreground">All products are verified and directly sourced from Nepal</p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2} className="text-center space-y-3">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold text-foreground">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">Quick and reliable delivery to your doorstep</p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3} className="text-center space-y-3">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold text-foreground">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">Safe and encrypted transactions</p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.4} className="text-center space-y-3">
              <div className="text-4xl font-bold text-primary">✓</div>
              <h3 className="font-semibold text-foreground">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">Hassle-free returns within 30 days</p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Most Bought Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ScrollAnimation direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Popular</p>
                <h2 className="text-4xl font-serif font-bold text-foreground">Most Bought</h2>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            {mostBought.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 0.1} direction="up">
                <ProductCard product={product} />
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ScrollAnimation direction="up" className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get exclusive access to new arrivals, special offers, and stories behind our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg">
                Subscribe
              </Button>
            </div>
          </ScrollAnimation>
        </section>
      </main>
    </div>
  )
}
