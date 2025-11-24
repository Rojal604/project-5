import { products } from "./products"

export interface SearchResult {
  id: string
  name: string
  category: string
  price: number
  slug: string
}

// Simple fuzzy search implementation
function fuzzyMatch(query: string, text: string): number {
  query = query.toLowerCase()
  text = text.toLowerCase()

  if (text.includes(query)) return 100

  let matches = 0
  let queryIdx = 0

  for (let i = 0; i < text.length && queryIdx < query.length; i++) {
    if (text[i] === query[queryIdx]) {
      matches++
      queryIdx++
    }
  }

  return queryIdx === query.length ? (matches / query.length) * 50 : 0
}

export function searchProducts(query: string): SearchResult[] {
  if (!query.trim()) return []

  const results = products
    .map((product) => {
      const nameScore = fuzzyMatch(query, product.name) * 2
      const categoryScore = fuzzyMatch(query, product.category)
      const descriptionScore = fuzzyMatch(query, product.description)

      return {
        ...product,
        score: nameScore + categoryScore + descriptionScore,
      }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  return results
}
