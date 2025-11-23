'use client'

import { useState } from 'react'

interface NewsItem {
  title: string
  summary: string
  source: string
  url?: string
}

export default function Home() {
  const [query, setQuery] = useState('inteligencia artificial deporte')
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState<NewsItem[]>([])
  const [error, setError] = useState('')

  const searchNews = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al buscar noticias')
      }

      setNews(data.news)
    } catch (err: any) {
      setError(err.message)
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = async () => {
    if (news.length === 0) return

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ news })
      })

      if (!response.ok) {
        throw new Error('Error al exportar')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `noticias_ia_deportes_${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🤖 Buscador de Noticias IA en Deportes</h1>
        <p>Busca automáticamente noticias sobre inteligencia artificial en el deporte y exporta a Excel</p>
      </header>

      <div className="search-section">
        <div className="search-controls">
          <input
            type="text"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Términos de búsqueda..."
            onKeyPress={(e) => e.key === 'Enter' && searchNews()}
          />
          <button
            className="button"
            onClick={searchNews}
            disabled={loading || !query.trim()}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading">
          Buscando noticias sobre IA en deportes...
        </div>
      )}

      {news.length > 0 && !loading && (
        <div className="results">
          <div className="results-header">
            <h2>📰 {news.length} Noticias Encontradas</h2>
            <button
              className="button button-secondary"
              onClick={exportToExcel}
            >
              📊 Exportar a Excel
            </button>
          </div>

          <div className="news-list">
            {news.map((item, index) => (
              <div key={index} className="news-item">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="source">Fuente: {item.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
