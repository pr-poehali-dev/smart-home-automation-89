import { useState, useEffect } from "react"
import { getProducts, type Product } from "@/lib/api"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type Props = {
  activeGameId: number | null
  activeCategoryId: number | null
  onProductClick: (id: number) => void
  refreshKey?: number
}

const sortOptions = [
  { id: "new", label: "Новые" },
  { id: "cheap", label: "Дешевле" },
  { id: "expensive", label: "Дороже" },
  { id: "popular", label: "По сделкам" },
]

export function ProductGrid({ activeGameId, activeCategoryId, onProductClick, refreshKey }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState("new")

  useEffect(() => {
    setLoading(true)
    getProducts({
      game_id: activeGameId || undefined,
      category_id: activeCategoryId || undefined,
    }).then((d) => setProducts(d.products)).finally(() => setLoading(false))
  }, [activeGameId, activeCategoryId, refreshKey])

  const sorted = [...products].sort((a, b) => {
    if (sort === "cheap") return a.price - b.price
    if (sort === "expensive") return b.price - a.price
    if (sort === "popular") return b.seller_deals - a.seller_deals
    return 0
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          Найдено <span className="font-semibold text-foreground">{sorted.length.toLocaleString("ru")}</span> товаров
        </p>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSort(opt.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  sort === opt.id ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Icon name="SlidersHorizontal" size={14} />
            Фильтры
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
              <div className="aspect-[16/10] bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((p) => (
            <ProductCard
              key={p.id}
              onClick={() => onProductClick(p.id)}
              product={{
                id: p.id,
                title: p.title,
                price: p.price,
                old_price: p.old_price,
                game: p.game,
                game_emoji: p.game_emoji,
                category: p.category_slug,
                seller: p.seller,
                sellerRating: p.seller_rating,
                sellerDeals: p.seller_deals,
                isVerified: p.seller_verified,
                isOnline: true,
                isInstant: p.is_instant,
                image: p.image_url || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=280&fit=crop",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-lg font-semibold text-foreground mb-2">Товаров пока нет</p>
          <p className="text-muted-foreground text-sm">Будьте первым — разместите объявление!</p>
        </div>
      )}
    </div>
  )
}
