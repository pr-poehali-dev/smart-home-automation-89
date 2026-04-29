import { categories, games } from "@/data/marketplace"

type Props = {
  activeCategory: string
  activeGame: string
  onCategoryChange: (id: string) => void
  onGameChange: (id: string) => void
}

export function CategoryFilter({ activeCategory, activeGame, onCategoryChange, onGameChange }: Props) {
  return (
    <div className="bg-white border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Categories */}
        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 border ${
                activeCategory === cat.id
                  ? "bg-primary text-white border-primary"
                  : "bg-muted text-muted-foreground border-transparent hover:border-border hover:text-foreground"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className={`text-xs ${activeCategory === cat.id ? "text-white/70" : "text-muted-foreground"}`}>
                {cat.count.toLocaleString("ru")}
              </span>
            </button>
          ))}
        </div>

        {/* Games sub-filter */}
        <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onGameChange(game.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeGame === game.id
                  ? "bg-slate-800 text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {game.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
