import Icon from "@/components/ui/icon"

const trustItems = [
  {
    icon: "ShieldCheck",
    title: "Гарантия безопасности",
    description: "Деньги удерживаются до подтверждения получения товара",
  },
  {
    icon: "Zap",
    title: "Мгновенная доставка",
    description: "Большинство товаров доставляются автоматически за минуты",
  },
  {
    icon: "RotateCcw",
    title: "Возврат средств",
    description: "Полный возврат если продавец не выполнил обязательства",
  },
  {
    icon: "Headphones",
    title: "Поддержка 24/7",
    description: "Служба поддержки готова помочь в любое время суток",
  },
]

export function TrustBanner() {
  return (
    <section className="bg-white border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
