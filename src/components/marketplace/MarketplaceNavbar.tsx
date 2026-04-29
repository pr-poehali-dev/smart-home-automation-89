import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

export function MarketplaceNavbar() {
  const [search, setSearch] = useState("")

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">Playerok</span>
          </a>

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
            <a href="#deals" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              Акции
            </a>
            <a href="#sellers" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              Продавцам
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-muted-foreground">
              <Icon name="Bell" size={16} />
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Войти
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              Продать
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
