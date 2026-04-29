import type { Game, Category } from "@/lib/api"

type Props = {
  games: Game[]
  categories: Category[]
  activeGameId: number | null
  activeCategoryId: number | null
  onGameChange: (id: number | null) => void
  onCategoryChange: (id: number | null) => void
}

export function CategoryFilter({ games, categories, activeGameId, activeCategoryId, onGameChange, onCategoryChange }: Props) {
  return (
    <div className="bg-white border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Categories */}
        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onCategoryChange(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 border ${
              activeCategoryId === null
                ? "bg-primary text-white border-primary"
                : "bg-muted text-muted-foreground border-transparent hover:border-border hover:text-foreground"
            }`}
          >
            🎮 Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(activeCategoryId === cat.id ? null : cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 border ${
                activeCategoryId === cat.id
                  ? "bg-primary text-white border-primary"
                  : "bg-muted text-muted-foreground border-transparent hover:border-border hover:text-foreground"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Games */}
        <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onGameChange(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
              activeGameId === null ? "bg-slate-800 text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Все игры
          </button>
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onGameChange(activeGameId === game.id ? null : game.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeGameId === game.id ? "bg-slate-800 text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {game.emoji} {game.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
