import GameCard from './GameCard'

const StorePage = ({ newestGames, filteredGames, search, ownedIds, onPurchase, onDownload }) => {
  return (
    <>
      <div className="mb-5 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(34,_211,_238,_0.18),_transparent_60%)] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Магазин игр</span>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Игры как в Steam, но в браузере
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Просматривай новинки, покупай и скачивай игры. Администрируй каталог, добавляй обложки,
              описания и цены, как в настоящем магазине.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 px-5 py-4 text-right shadow-xl shadow-cyan-500/10">
            <p className="text-sm uppercase text-slate-400">Поиск</p>
            <p className="mt-2 text-lg text-white">{search ? `Результаты по «${search}»` : 'Введите название или жанр'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Новинки</h2>
              <p className="text-sm text-slate-400">Самые свежие игры в магазине.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {newestGames.map((game) => (
              <article key={game.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95 shadow-xl shadow-slate-950/20">
                <img src={game.image} alt={game.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                    <span>{game.tags.slice(0, 2).join(' · ')}</span>
                    <span>{game.free ? 'Бесплатно' : `${game.price.toFixed(2)}₽`}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{game.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{game.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
          <h2 className="text-xl font-semibold text-white">Каталог игр</h2>
          <p className="mt-2 text-sm text-slate-400">Выбери игру и скачай после покупки или если она бесплатная.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isOwned={ownedIds.includes(game.id)}
                onPurchase={onPurchase}
                onDownload={onDownload}
              />
            ))}
            {filteredGames.length === 0 && (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-400">
                Ничего не найдено. Попробуй другое название или жанр.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default StorePage
