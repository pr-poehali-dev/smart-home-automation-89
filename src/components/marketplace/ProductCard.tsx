import Icon from "@/components/ui/icon"

export type CardProduct = {
  id: number
  title: string
  price: number
  old_price?: number
  game: string
  game_emoji?: string
  category: string
  seller: string
  sellerRating: number
  sellerDeals: number
  isVerified: boolean
  isOnline: boolean
  isInstant: boolean
  badge?: string
  image: string
}

type Props = {
  product: CardProduct
  onClick?: () => void
}

export function ProductCard({ product, onClick }: Props) {
  const discount = product.old_price
    ? Math.round((1 - product.price / product.old_price) * 100)
    : null

  return (
    <div className="product-card group" onClick={onClick}>
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=280&fit=crop"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {product.badge && (
            <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        {product.isInstant && (
          <div className="absolute top-2 right-2">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Icon name="Zap" size={10} />
              Мгновенно
            </span>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {product.game_emoji} {product.game}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-3 leading-snug">
          {product.title}
        </h3>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-xl font-bold text-foreground">
            {product.price.toLocaleString("ru")} ₽
          </span>
          {product.old_price && (
            <span className="text-sm text-muted-foreground line-through mb-0.5">
              {product.old_price.toLocaleString("ru")} ₽
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-foreground">
                {product.seller[0]}
              </div>
              {product.isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-foreground">{product.seller}</span>
                {product.isVerified && <Icon name="BadgeCheck" size={12} className="text-primary" />}
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={10} className="text-amber-400 fill-amber-400" />
                <span className="text-xs text-muted-foreground">
                  {product.sellerRating} · {product.sellerDeals.toLocaleString("ru")} сделок
                </span>
              </div>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="Heart" size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
