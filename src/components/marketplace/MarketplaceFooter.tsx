export function MarketplaceFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-white">Playerok</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Безопасный маркетплейс игровых товаров. Более 2 миллионов сделок с гарантией.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Покупателям</h4>
            <ul className="space-y-2 text-sm">
              {["Как купить", "Безопасность", "Гарантии", "Отзывы"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Продавцам</h4>
            <ul className="space-y-2 text-sm">
              {["Как продавать", "Комиссии", "Верификация", "Вывод средств"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              {["Помощь", "Споры", "Правила", "Контакты"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 Playerok. Все права защищены.</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
