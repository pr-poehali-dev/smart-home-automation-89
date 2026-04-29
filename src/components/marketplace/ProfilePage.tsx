import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { getProducts, type Product } from "@/lib/api"
import { type AuthUser } from "@/lib/auth-store"
import { ProductCard } from "./ProductCard"
import { SellModal } from "./SellModal"

type Props = {
  user: AuthUser
  onBack: () => void
  onProductClick: (id: number) => void
  onLogout: () => void
}

export function ProfilePage({ user, onBack, onProductClick, onLogout }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sellOpen, setSellOpen] = useState(false)

  function loadProducts() {
    getProducts({ seller_id: user.id }).then((d) => setProducts(d.products)).finally(() => setLoading(false))
  }

  useEffect(() => { loadProducts() }, [user.id])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <Icon name="ArrowLeft" size={16} />
          Назад в каталог
        </button>

        {/* Profile header */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl">
                {user.username[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{user.username}</h1>
                  {user.is_verified && <Icon name="BadgeCheck" size={18} className="text-primary" />}
                </div>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-medium">{user.rating}</span>
                    <span className="text-muted-foreground">рейтинг</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{user.deals_count}</span> сделок
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-2 text-muted-foreground">
              <Icon name="LogOut" size={14} />
              Выйти
            </Button>
          </div>
        </div>

        {/* My listings */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Мои объявления</h2>
          <Button onClick={() => setSellOpen(true)} className="bg-primary hover:bg-primary/90 text-white gap-2">
            <Icon name="Plus" size={16} />
            Добавить товар
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl border border-border h-64 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-lg font-semibold mb-2">Объявлений пока нет</p>
            <p className="text-muted-foreground text-sm mb-4">Разместите первый товар и начните зарабатывать</p>
            <Button onClick={() => setSellOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
              Разместить объявление
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} onClick={() => onProductClick(p.id)}>
                <ProductCard product={{
                  ...p,
                  isOnline: true,
                  isVerified: p.seller_verified,
                  isInstant: p.is_instant,
                  sellerRating: p.seller_rating,
                  sellerDeals: p.seller_deals,
                  image: p.image_url || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=280&fit=crop",
                  seller: p.seller,
                  game: p.game,
                  category: p.category_slug,
                }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <SellModal open={sellOpen} onClose={() => setSellOpen(false)} onCreated={loadProducts} />
    </div>
  )
}
