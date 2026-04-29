import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"
import type { AuthUser } from "@/lib/auth-store"

type Props = {
  user: AuthUser | null
  onAuthClick: () => void
  onSellClick: () => void
  onProfileClick: () => void
  onLogoClick: () => void
}

export function MarketplaceNavbar({ user, onAuthClick, onSellClick, onProfileClick, onLogoClick }: Props) {
  const [search, setSearch] = useState("")

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">Playerok</span>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск товаров, игр, продавцов..."
              className="pl-9 bg-muted border-0 h-10 text-sm focus-visible:ring-1"
            />
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#catalog" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              Каталог
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              Акции
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onProfileClick}
                  className="hidden sm:flex items-center gap-2 font-medium"
                >
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  {user.username}
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white gap-1.5" onClick={onSellClick}>
                  <Icon name="Plus" size={15} />
                  Продать
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="hidden sm:flex" onClick={onAuthClick}>
                  Войти
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={onSellClick}>
                  Продать
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
