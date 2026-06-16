import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

export default function Layout({ children }) {
  const { usuario, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const links = [
    { to: '/entregas', label: 'Entregas' },
    { to: '/motoristas', label: 'Motoristas' },
    ...(usuario?.papel === 'GESTOR' ? [{ to: '/relatorios', label: 'Relatórios' }] : [])
  ]

  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/entregas" className="navbar-brand">
          <span className="brand-icon">▲</span>
          Delivery Tracker
        </Link>
        <div className="navbar-links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname.startsWith(l.to) ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="navbar-user">
          <span className="user-info">
            <span className={`badge badge-${usuario?.papel}`}>{usuario?.papel}</span>
            {usuario?.nome}
          </span>
          <button data-testid="btn-sair" className="btn btn-ghost" onClick={handleLogout}>Sair</button>
        </div>
      </nav>
      <main className="main-content">
        {children} 
      </main>
    </div>
  )
}