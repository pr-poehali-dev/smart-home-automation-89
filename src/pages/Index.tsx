import { useState } from "react"
import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar"
import { HeroBanner } from "@/components/marketplace/HeroBanner"
import { TrustBanner } from "@/components/marketplace/TrustBanner"
import { CategoryFilter } from "@/components/marketplace/CategoryFilter"
import { ProductGrid } from "@/components/marketplace/ProductGrid"
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter"

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeGame, setActiveGame] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceNavbar />
      <HeroBanner />
      <TrustBanner />
      <CategoryFilter
        activeCategory={activeCategory}
        activeGame={activeGame}
        onCategoryChange={setActiveCategory}
        onGameChange={setActiveGame}
      />
      <main className="max-w-7xl mx-auto px-4 py-8" id="catalog">
        <ProductGrid activeCategory={activeCategory} activeGame={activeGame} />
      </main>
      <MarketplaceFooter />
    </div>
  )
}
