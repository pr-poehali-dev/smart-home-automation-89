import { Button } from "@/components/ui/button"
import { stats } from "@/data/marketplace"

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Безопасные сделки с гарантией
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Маркетплейс<br />
              <span className="text-primary">игровых товаров</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md">
              Покупай и продавай аккаунты, валюту, предметы и услуги для любимых игр. Безопасно, быстро, выгодно.
            </p>
            <div className="flex gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                Смотреть товары
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Стать продавцом
              </Button>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
