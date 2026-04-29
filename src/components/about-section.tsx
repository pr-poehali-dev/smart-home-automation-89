export function AboutSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-red-500 font-orbitron text-sm font-semibold tracking-widest uppercase mb-4">
              О компании
            </p>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Мы строим мост между
              <span className="text-red-500"> разумом </span>
              и машиной
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              SynapseAI основана в 2019 году группой нейробиологов, инженеров и врачей с единой целью — вернуть
              независимость людям, потерявшим её из-за травм и болезней, а затем открыть новую эру человеческих
              возможностей.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              За пять лет мы прошли путь от лабораторных прототипов до клинически одобренного устройства, которое
              уже изменило жизнь сотен пациентов. Нас поддерживают ведущие исследовательские институты и более 200
              партнёрских клиник по всему миру.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "1200+", label: "Пациентов в испытаниях" },
                { value: "47", label: "Патентов" },
                { value: "200+", label: "Клиник-партнёров" },
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-red-500 pl-4">
                  <div className="font-orbitron text-2xl font-bold text-red-400">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-red-500/20">
              <img
                src="/futuristic-cyberpunk-laboratory-with-holographic-d.jpg"
                alt="Лаборатория SynapseAI"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-orbitron text-white font-semibold text-sm">
                  Исследовательский центр SynapseAI, Сан-Франциско
                </p>
                <p className="text-gray-400 text-xs mt-1">Основан в 2019 году</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-red-500/30 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-red-500/20 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
