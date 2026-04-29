import Icon from "@/components/ui/icon"

const safetyItems = [
  {
    icon: "BadgeCheck",
    title: "Одобрение FDA и CE",
    description:
      "Устройство прошло полный цикл клинических испытаний и получило разрешение регуляторов США и Европы для медицинского применения.",
  },
  {
    icon: "HeartPulse",
    title: "Биосовместимые материалы",
    description:
      "Все имплантируемые компоненты изготовлены из медицинского титана и полимеров класса ISO 10993, исключающих иммунную реакцию.",
  },
  {
    icon: "Lock",
    title: "Шифрование нейроданных",
    description:
      "Нейральные паттерны — это ваша личная информация. Мы используем сквозное шифрование: никто, включая SynapseAI, не имеет доступа к вашим данным.",
  },
  {
    icon: "RotateCcw",
    title: "Полная обратимость",
    description:
      "Процедура обратима: устройство может быть безопасно удалено в любой момент без последствий для нервной ткани.",
  },
  {
    icon: "Eye",
    title: "Постоянный мониторинг",
    description:
      "Встроенные датчики непрерывно отслеживают состояние тканей и передают данные лечащему врачу в режиме реального времени.",
  },
  {
    icon: "Users",
    title: "Команда нейрохирургов",
    description:
      "Установку выполняют только сертифицированные нейрохирурги, прошедшие специализированное обучение по протоколам SynapseAI.",
  },
]

export function SafetySection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-6">
            Безопасность — <span className="text-red-500">прежде всего</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Мы установили новые стандарты безопасности в области нейроинтерфейсов. Каждое решение принималось с
            единственным приоритетом — благополучие пациента.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyItems.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-950 border border-red-500/15 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 group"
            >
              <div className="bg-red-500/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-red-500/20 transition-colors duration-300">
                <Icon name={item.icon} size={22} className="text-red-400" />
              </div>
              <h3 className="font-orbitron text-white font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm font-space-mono">
            <span className="text-red-400">0</span> серьёзных нежелательных явлений в ходе клинических испытаний на
            1200+ пациентах
          </p>
        </div>
      </div>
    </section>
  )
}
