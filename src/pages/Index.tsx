import { useState, useEffect } from "react"
import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar"
import { HeroBanner } from "@/components/marketplace/HeroBanner"
import { TrustBanner } from "@/components/marketplace/TrustBanner"
import { CategoryFilter } from "@/components/marketplace/CategoryFilter"
import { ProductGrid } from "@/components/marketplace/ProductGrid"
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter"
import { AuthModal } from "@/components/marketplace/AuthModal"
import { SellModal } from "@/components/marketplace/SellModal"
import { ProductPage } from "@/components/marketplace/ProductPage"
import { ProfilePage } from "@/components/marketplace/ProfilePage"
import { getMeta, type Game, type Category } from "@/lib/api"
import { useAuth } from "@/lib/auth-store"

type View = "catalog" | "product" | "profile"

export default function Index() {
  const { user, loading, logout, onLogin } = useAuth()
  const [view, setView] = useState<View>("catalog")
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeGameId, setActiveGameId] = useState<number | null>(null)
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)

  const [authOpen, setAuthOpen] = useState(false)
  const [sellOpen, setSellOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    getMeta().then((d) => { setGames(d.games); setCategories(d.categories) })
  }, [])

  function handleProductClick(id: number) {
    setSelectedProductId(id)
    setView("product")
  }

  function handleSellClick() {
    if (!user) { setAuthOpen(true) } else { setSellOpen(true) }
  }

  function handleProfileClick() {
    if (user) setView("profile")
  }

  function handleLogout() {
    logout()
    setView("catalog")
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Загрузка...</div>
    </div>
  )

  if (view === "product" && selectedProductId) {
    return <ProductPage productId={selectedProductId} onBack={() => setView("catalog")} />
  }

  if (view === "profile" && user) {
    return (
      <ProfilePage
        user={user}
        onBack={() => setView("catalog")}
        onProductClick={handleProductClick}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceNavbar
        user={user}
        onAuthClick={() => setAuthOpen(true)}
        onSellClick={handleSellClick}
        onProfileClick={handleProfileClick}
        onLogoClick={() => setView("catalog")}
      />
      <HeroBanner />
      <TrustBanner />
      <CategoryFilter
        games={games}
        categories={categories}
        activeGameId={activeGameId}
        activeCategoryId={activeCategoryId}
        onGameChange={setActiveGameId}
        onCategoryChange={setActiveCategoryId}
      />
      <main className="max-w-7xl mx-auto px-4 py-8" id="catalog">
        <ProductGrid
          activeGameId={activeGameId}
          activeCategoryId={activeCategoryId}
          onProductClick={handleProductClick}
          refreshKey={refreshKey}
        />
      </main>
      <MarketplaceFooter />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(token, userData) => onLogin(token, userData)}
      />
      <SellModal
        open={sellOpen}
        onClose={() => setSellOpen(false)}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  )
}
