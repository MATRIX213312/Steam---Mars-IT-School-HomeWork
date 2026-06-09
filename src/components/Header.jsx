import { NavLink } from 'react-router-dom'

const Header = ({ search, onSearch }) => {
  return (
    <header className="border-b border-slate-800 bg-[#070a12]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-800/80 px-4 py-2 text-xl font-semibold text-cyan-300">
            STEAM
          </div>
          <nav className="hidden gap-2 text-sm text-slate-300 md:flex">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-cyan-500/15 text-cyan-300' : 'hover:bg-slate-800'
                }`
              }
            >
              Магазин
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-cyan-500/15 text-cyan-300' : 'hover:bg-slate-800'
                }`
              }
            >
              Админка
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden md:block">
            <input
              type="search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Поиск игр..."
              className="w-72 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-500"
            />
          </div>
          <NavLink
            to="/admin"
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Открыть админку
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
