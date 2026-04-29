import Icon from "@/components/ui/icon"

const technologies = [
  {
    icon: "Cpu",
    title: "Нейросигнальный процессор",
    description:
      "Специализированный чип обрабатывает до 1024 нейронных каналов одновременно с задержкой менее 0,1 мс. Полностью имплантируемый, работает без проводов.",
    stat: "1024",
    statLabel: "нейронных канала",
  },
  {
    icon: "Wifi",
    title: "Беспроводная передача",
    description:
      "Защищённый протокол передачи данных на частоте 10 ГГц обеспечивает стабильный канал связи с внешними устройствами без задержек.",
    stat: "10 ГГц",
    statLabel: "частота передачи",
  },
  {
    icon: "Shield",
    title: "Криптозащита данных",
    description:
      "Нейронные паттерны защищаются алгоритмом AES-256. Данные никогда не покидают личного шифрованного контура пользователя.",
    stat: "AES-256",
    statLabel: "шифрование",
  },
  {
    icon: "BrainCircuit",
    title: "Адаптивный ИИ",
    description:
      "Модели машинного обучения обучаются на индивидуальных нейронных паттернах за 72 часа и непрерывно улучшают точность интерпретации.",
    stat: "99.7%",
    statLabel: "точность",
  },
]

export function TechnologySection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-6">
            Технология <span className="text-red-500">изнутри</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Каждый компонент SynapseAI разработан с нуля для одной цели — создать идеальный мост между разумом и
            цифровым миром.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-black/60 border border-red-500/20 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="bg-red-500/10 rounded-xl p-4 group-hover:bg-red-500/20 transition-colors duration-300 flex-shrink-0">
                  <Icon name={tech.icon} size={28} className="text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-orbitron text-white font-bold text-lg">{tech.title}</h3>
                    <div className="text-right">
                      <div className="text-red-400 font-bold font-orbitron text-sm">{tech.stat}</div>
                      <div className="text-gray-500 text-xs">{tech.statLabel}</div>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm">{tech.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech visual strip */}
        <div className="mt-16 border border-red-500/20 rounded-2xl p-8 bg-black/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "< 0.1 мс", label: "Задержка сигнала" },
              { value: "10+ лет", label: "Срок службы" },
              { value: "IP68", label: "Защита корпуса" },
              { value: "MRI-safe", label: "МРТ-совместимость" },
            ].map((item, i) => (
              <div key={i}>
                <div className="font-orbitron text-2xl md:text-3xl font-bold text-red-500 mb-2">{item.value}</div>
                <div className="text-gray-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
