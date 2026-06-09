const AdminPage = ({ games, form, onFormChange, onImageChange, onAddGame, gamesPlaceholder }) => {
  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-slate-950/90 p-6 shadow-2xl shadow-cyan-500/10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Админ-панель</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Добавить новую игру</h2>
        </div>
        <p className="text-sm text-slate-400">Заполни карточку, загрузи обложку и добавь её в магазин.</p>
      </div>

      <form onSubmit={onAddGame} className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
          <label className="block text-sm font-medium text-slate-200">
            Название игры
            <input
              value={form.title}
              onChange={(event) => onFormChange('title', event.target.value)}
              placeholder="Например, Война роботов"
              className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-200">
            Описание
            <textarea
              value={form.description}
              onChange={(event) => onFormChange('description', event.target.value)}
              rows={5}
              placeholder="Краткое описание, что за игра и что в ней происходит"
              className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-200">
              Цена, ₽
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                disabled={form.free}
                onChange={(event) => onFormChange('price', event.target.value)}
                placeholder="0.00"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-800"
              />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Жанры / теги
              <input
                value={form.tags}
                onChange={(event) => onFormChange('tags', event.target.value)}
                placeholder="Экшн, RPG, Indie"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
              />
            </label>
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
          <label className="block text-sm font-medium text-slate-200">
            Загрузить обложку
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="mt-3 block w-full text-sm text-slate-100 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
            />
          </label>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm text-slate-400">Превью</p>
            <img
              src={form.imagePreview || gamesPlaceholder}
              alt="Preview"
              className="mt-4 h-48 w-full rounded-3xl object-cover"
            />
          </div>
          <label className="flex items-center gap-3 rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4">
            <input
              type="checkbox"
              checked={form.free}
              onChange={(event) => onFormChange('free', event.target.checked)}
              className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-cyan-500"
            />
            <span className="text-sm text-slate-200">Сделать игру бесплатной</span>
          </label>
          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Добавить в магазин
          </button>
        </div>
      </form>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
        <h3 className="text-lg font-semibold text-white">Последние добавленные</h3>
        <div className="mt-5 space-y-3">
          {games.slice(0, 5).map((game) => (
            <div key={game.id} className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-300">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{game.title}</p>
                  <p className="text-xs text-slate-400">{game.free ? 'Бесплатная игра' : `${game.price.toFixed(2)}₽`}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  {new Date(game.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminPage
