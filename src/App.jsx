import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Header from './components/Header'
import StorePage from './components/StorePage'
import AdminPage from './components/AdminPage'
import Sidebar from './components/Sidebar'
import { initialGames, gamesPlaceholder } from './data/games'

const App = () => {
  const [search, setSearch] = useState('')
  const [games, setGames] = useState(initialGames)
  const [ownedIds, setOwnedIds] = useState(() =>
    initialGames.filter((game) => game.free).map((game) => game.id),
  )
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    imageFile: null,
    imagePreview: '',
    free: false,
  })

  const newestGames = useMemo(
    () =>
      [...games]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    [games],
  )

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return games
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }, [games, search])

  const handlePurchase = (gameId) => {
    if (!ownedIds.includes(gameId)) {
      setOwnedIds((prev) => [...prev, gameId])
    }
  }

  const handleDownload = (item) => {
    const content = `Содержимое игры ${item.title}. Спасибо за покупку!`
    const blob = new Blob([content], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${item.title.replace(/\s+/g, '-')}.zip`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageFile: file, imagePreview: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddGame = (event) => {
    event.preventDefault()
    const title = form.title.trim()
    const description = form.description.trim()
    const price = Number(form.price)
    if (!title || !description || Number.isNaN(price)) {
      return
    }

    const newGame = {
      id: Date.now(),
      title,
      description,
      price: form.free ? 0 : price,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      image: form.imagePreview || gamesPlaceholder,
      createdAt: new Date().toISOString(),
      free: form.free,
    }

    setGames((prev) => [newGame, ...prev])
    if (newGame.free) {
      setOwnedIds((prev) => [...prev, newGame.id])
    }
    setForm({
      title: '',
      description: '',
      price: '',
      tags: '',
      imageFile: null,
      imagePreview: '',
      free: false,
    })
  }

  return (
    <div className="min-h-screen bg-[#0b131f] text-slate-100">
      <BrowserRouter>
        <Header search={search} onSearch={setSearch} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/20">
              <Routes>
                <Route
                  path="/"
                  element={
                    <StorePage
                      newestGames={newestGames}
                      filteredGames={filteredGames}
                      search={search}
                      ownedIds={ownedIds}
                      onPurchase={handlePurchase}
                      onDownload={handleDownload}
                    />
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminPage
                      games={games}
                      form={form}
                      onFormChange={handleFormChange}
                      onImageChange={handleImageChange}
                      onAddGame={handleAddGame}
                      gamesPlaceholder={gamesPlaceholder}
                    />
                  }
                />
              </Routes>
            </div>

            <aside className="space-y-6">
              <Sidebar />

              <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/20">
                <h2 className="text-lg font-semibold text-white">Статистика</h2>
                <dl className="mt-4 grid gap-4">
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <dt className="text-sm uppercase text-slate-400">Добавлено игр</dt>
                    <dd className="mt-2 text-2xl font-semibold text-white">{games.length}</dd>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <dt className="text-sm uppercase text-slate-400">В библиотеке</dt>
                    <dd className="mt-2 text-2xl font-semibold text-white">{ownedIds.length}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/10">
                <h2 className="text-lg font-semibold text-white">Что можно сделать</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>• Добавлять игры через админ-панель</li>
                  <li>• Задавать цену или отмечать бесплатно</li>
                  <li>• Загружать обложку игры</li>
                  <li>• Покупать и скачивать игры</li>
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
