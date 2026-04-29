import { useState } from "react"
import { products } from "@/data/marketplace"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type Props = {
  activeCategory: string
  activeGame: string
}

const sortOptions = [
  { id: "popular", label: "Популярные" },
  { id: "cheap", label: "Дешевле" },
  { id: "expensive", label: "Дороже" },
  { id: "new", label: "Новые" },
]

export function ProductGrid({ activeCategory, activeGame }: Props) {
  const [sort, setSort] = useState("popular")

  const filtered = products.filter((p) => {
    const byCategory = activeCategory === "all" || p.category === activeCategory
    const byGame = activeGame === "all" || p.game.toLowerCase().replace(/\s/g, "") === activeGame
    return byCategory && byGame
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "cheap") return a.price - b.price
    if (sort === "expensive") return b.price - a.price
    if (sort === "new") return Number(b.id) - Number(a.id)
    return b.sellerDeals - a.sellerDeals
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          Найдено <span className="font-semibold text-foreground">{sorted.length.toLocaleString("ru")}</span> товаров
        </p>
        <div className="flex items-center gap-2">
          {/* Sort */}
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

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-lg font-semibold text-foreground mb-2">Товаров не найдено</p>
          <p className="text-muted-foreground text-sm">Попробуйте изменить фильтры или выбрать другую категорию</p>
        </div>
      )}
    </div>
  )
}
