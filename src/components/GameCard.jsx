const GameCard = ({ game, isOwned, onPurchase, onDownload }) => {
  const actionLabel = isOwned ? 'В библиотеке' : game.free ? 'Бесплатно' : 'Купить'
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5">
      <img src={game.image} alt={game.title} className="h-48 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
          <span>{game.free ? 'FREE' : 'STORE'}</span>
          <span>{game.price ? `${game.price.toFixed(2)}₽` : '0 ₽'}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">{game.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{game.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            disabled={isOwned}
            onClick={() => onPurchase(game.id)}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
              isOwned
                ? 'cursor-not-allowed bg-slate-700 text-slate-400'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            }`}
          >
            {actionLabel}
          </button>
          {isOwned && (
            <button
              onClick={() => onDownload(game)}
              className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Скачать
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default GameCard
