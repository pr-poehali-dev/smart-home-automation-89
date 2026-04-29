import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { getProduct, type ProductDetail } from "@/lib/api"

type Props = {
  productId: number
  onBack: () => void
}

export function ProductPage({ productId, onBack }: Props) {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProduct(productId).then(setProduct).finally(() => setLoading(false))
  }, [productId])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-muted-foreground">Загрузка...</div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold mb-3">Товар не найден</p>
        <Button onClick={onBack} variant="outline">Назад</Button>
      </div>
    </div>
  )

  const discount = product.old_price ? Math.round((1 - product.price / product.old_price) * 100) : null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <Icon name="ArrowLeft" size={16} />
          Назад в каталог
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: image + info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
              {product.image_url ? (
                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {product.game_emoji}
                </div>
              )}
            </div>

            {/* Title + badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                  {product.game_emoji} {product.game}
                </span>
                <span className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
                {product.is_instant && (
                  <span className="bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Icon name="Zap" size={11} /> Мгновенно
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <Icon name="Eye" size={14} />
                {product.views} просмотров
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-card rounded-xl p-5 border border-border">
                <h3 className="font-semibold mb-3">Описание</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>
            )}
          </div>

          {/* Right: buy block */}
          <div className="space-y-4">
            {/* Price card */}
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <div className="mb-4">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold">{product.price.toLocaleString("ru")} ₽</span>
                  {discount && (
                    <span className="text-sm font-semibold text-white bg-red-500 px-2 py-0.5 rounded-full">-{discount}%</span>
                  )}
                </div>
                {product.old_price && (
                  <p className="text-muted-foreground line-through text-sm mt-1">{product.old_price.toLocaleString("ru")} ₽</p>
                )}
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white mb-3 h-12 text-base font-semibold">
                Купить сейчас
              </Button>
              <Button variant="outline" className="w-full h-10">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Написать продавцу
              </Button>

              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-2">
                  <Icon name="ShieldCheck" size={13} className="text-primary" />
                  Защита покупателя гарантирована
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="RotateCcw" size={13} className="text-primary" />
                  Возврат средств при проблемах
                </div>
              </div>
            </div>

            {/* Seller card */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Продавец</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {product.seller[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">{product.seller}</span>
                    {product.seller_verified && (
                      <Icon name="BadgeCheck" size={15} className="text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="Star" size={12} className="text-amber-400 fill-amber-400" />
                    {product.seller_rating} · {product.seller_deals.toLocaleString("ru")} сделок
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
