import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './Auth.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const { data } = await api.post('/auth/login', form)
      const payload = JSON.parse(atob(data.accessToken.split('.')[1]))
      login(data.accessToken, { id: payload.id, nome: payload.nome, email: payload.email, papel: payload.papel })
      navigate('/entregas')
    } catch (err) {
      setErro(err.response?.data?.erro || err.response?.data?.mensagem || 'Credenciais inválidas')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">▲</span>
          <h1>Delivery Tracker</h1>
          <p>Acesse o painel de controle</p>
        </div>
        {erro && <div data-testid="alerta-erro" className="alert alert-erro">{erro}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>E-mail</label>
            <input
              data-testid="input-email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              data-testid="input-senha"
              type="password"
              value={form.senha}
              onChange={e => setForm({ ...form, senha: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>
          <button data-testid="btn-login" type="submit" className="btn btn-primary auth-btn" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="auth-footer">
          Não tem conta? <Link to="/registrar">Registrar</Link>
        </p>
      </div>
    </div>
  )
}
