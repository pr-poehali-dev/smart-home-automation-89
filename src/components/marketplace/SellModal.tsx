import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getMeta, createProduct, type Game, type Category } from "@/lib/api"

type Props = {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export function SellModal({ open, onClose, onCreated }: Props) {
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [oldPrice, setOldPrice] = useState("")
  const [gameId, setGameId] = useState<number | "">("")
  const [categoryId, setCategoryId] = useState<number | "">("")
  const [isInstant, setIsInstant] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    if (open && games.length === 0) {
      getMeta().then((d) => { setGames(d.games); setCategories(d.categories) })
    }
  }, [open, games.length])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!gameId || !categoryId) { setError("Выберите игру и категорию"); return }
    setError("")
    setLoading(true)
    try {
      await createProduct({
        title, description, price: Number(price),
        old_price: oldPrice ? Number(oldPrice) : undefined,
        game_id: Number(gameId), category_id: Number(categoryId),
        is_instant: isInstant, image_url: imageUrl,
      })
      setTitle(""); setDescription(""); setPrice(""); setOldPrice("")
      setGameId(""); setCategoryId(""); setIsInstant(false); setImageUrl("")
      onCreated()
      onClose()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Разместить объявление</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Название товара *</Label>
            <Input
              placeholder="Например: CS2 Prime аккаунт, Global Elite"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Игра *</Label>
              <select
                value={gameId}
                onChange={(e) => setGameId(e.target.value ? Number(e.target.value) : "")}
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                required
              >
                <option value="">Выберите игру</option>
                {games.map((g) => (
                  <option key={g.id} value={g.id}>{g.emoji} {g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Категория *</Label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : "")}
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                required
              >
                <option value="">Категория</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Цена (₽) *</Label>
              <Input
                type="number" min="1"
                placeholder="990"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required className="mt-1"
              />
            </div>
            <div>
              <Label>Старая цена (₽)</Label>
              <Input
                type="number" min="1"
                placeholder="1500 (необязательно)"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Описание</Label>
            <Textarea
              placeholder="Подробное описание товара..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Ссылка на изображение</Label>
            <Input
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isInstant}
              onChange={(e) => setIsInstant(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-medium">⚡ Мгновенная доставка</span>
          </label>

          {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Отмена</Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white" disabled={loading}>
              {loading ? "Публикация..." : "Опубликовать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
