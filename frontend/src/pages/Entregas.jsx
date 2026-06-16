import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'

export default function Entregas() {
  const [entregas, setEntregas] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [carregando, setCarregando] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status') || ''
  const page = Number(searchParams.get('page') || 1)

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      try {
        const params = { page, limit: 10 }
        if (status) params.status = status
        const { data } = await api.get('/entregas', { params })
        setEntregas(data.data)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error(err)
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [status, page])

  function setFiltro(novoStatus) {
    setSearchParams({ status: novoStatus, page: 1 })
  }

  function setPage(p) {
    setSearchParams({ status, page: p })
  }

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Entregas</h1>
          <p className="page-subtitle">{totalPages > 0 ? `Página ${page} de ${totalPages}` : 'Nenhuma entrega'}</p>
        </div>
        <Link to="/entregas/nova" className="btn btn-primary">+ Nova Entrega</Link>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="filtros">
          {['', 'CRIADA', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADA'].map(s => (
            <button
              key={s}
              className={`filtro-btn ${status === s ? 'active' : ''}`}
              onClick={() => setFiltro(s)}
            >
              {s || 'Todos'}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {carregando ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 32 }}>Carregando...</p>
        ) : entregas.length === 0 ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 32 }}>Nenhuma entrega encontrada.</p>
        ) : (
          <table data-testid="tabela-entregas">
            <thead>
              <tr>
                <th>#</th>
                <th>Descrição</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Motorista</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {entregas.map(e => (
                <tr key={e.id}>
                  <td style={{ color: 'var(--muted)' }}>#{e.id}</td>
                  <td>
                    <Link to={`/entregas/${e.id}`} style={{ color: 'var(--accent)' }}>
                      {e.descricao}
                    </Link>
                  </td>
                  <td>{e.origem}</td>
                  <td>{e.destino}</td>
                  <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                  <td>{e.motorista?.nome ?? <span style={{ color: 'var(--muted)' }}>—</span>}</td>
                  <td style={{ color: 'var(--muted)' }}>
                    {new Date(e.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="paginacao">
          <button className="btn btn-ghost" onClick={() => setPage(page - 1)} disabled={page <= 1}>← Anterior</button>
          <span style={{ color: 'var(--muted)' }}>{page} / {totalPages}</span>
          <button className="btn btn-ghost" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Próximo →</button>
        </div>
      )}
    </Layout>
  )
}
