import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Панель</h2>
          <p className="text-sm text-slate-400">Переключайся между магазином и админкой.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-left text-sm text-slate-100 transition ${
              isActive ? 'border-cyan-500 text-cyan-200' : 'hover:border-cyan-500'
            }`
          }
        >
          Просмотреть витрину игр
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-left text-sm text-slate-100 transition ${
              isActive ? 'border-cyan-500 text-cyan-200' : 'hover:border-cyan-500'
            }`
          }
        >
          Перейти в админку
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
