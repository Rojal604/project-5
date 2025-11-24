import { notFound } from "next/navigation"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { ArrowLeft } from "lucide-react"
import { ProductDetailClient } from "./product-detail-client"

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
          <Link
            href="/products"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductDetailClient product={product} relatedProducts={relatedProducts} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Related Products</h2>
              <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6`}>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
