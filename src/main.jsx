import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const WHATSAPP_NUMBER = '573216424600'
const TRM_ENDPOINT = 'https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=1&$order=vigenciadesde%20DESC'
const FALLBACK_TRM = 3667.06

const products = [
  { name: 'Tirzepatida', detail: '5mg', usd: 60.27, tag: 'Línea metabólica' },
  { name: 'Tirzepatida', detail: '10mg', usd: 75.33, tag: 'Línea metabólica' },
  { name: 'Tirzepatida', detail: '30mg', usd: 195.87, tag: 'Línea metabólica' },
  { name: 'Retatrutide', detail: '15mg', usd: 235.04, tag: 'Performance' },
  { name: 'Retatrutide', detail: '60mg', usd: 632.49, tag: 'Performance' },
  { name: 'Tesamorelin', detail: '10mg', usd: 120.53, tag: 'Composición corporal' },
  { name: 'TB-500', detail: 'Recuperación', usd: 135.60, tag: 'Recovery' },
  { name: 'Glow Blend', detail: 'BPC-157 + GHK-Cu + TB-500', usd: 120.53, tag: 'Skin protocol' },
  { name: 'Ipamorelin', detail: 'Tonificación', usd: 195.87, tag: 'Tone' },
  { name: 'Aicar', detail: 'Resistencia', usd: 75.33, tag: 'Endurance' },
  { name: 'Glutatión', detail: '600mg', usd: 90.40, tag: 'Antioxidante' },
  { name: 'SS-31', detail: '10mg', usd: 133.62, tag: 'Soporte mitocondrial' },
  { name: 'Agua bacteriostática', detail: '10ml', usd: 18.08, tag: 'Soporte' },
]

const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const formatCop = (usd, trm) => copFormatter.format(Math.round(usd * trm / 50) * 50)
const formatDate = (iso) => iso ? new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(iso)) : 'hoy'

function useDailyTrm() {
  const [trm, setTrm] = useState({ value: FALLBACK_TRM, date: null, status: 'loading', source: 'datos.gov.co' })

  useEffect(() => {
    let alive = true
    async function fetchTrm() {
      try {
        const response = await fetch(TRM_ENDPOINT)
        if (!response.ok) throw new Error(`TRM HTTP ${response.status}`)
        const [latest] = await response.json()
        const value = Number.parseFloat(latest?.valor)
        if (!Number.isFinite(value)) throw new Error('TRM inválida')
        if (alive) setTrm({ value, date: latest.vigenciadesde, status: 'live', source: 'datos.gov.co / Superfinanciera' })
      } catch (error) {
        console.warn('No se pudo consultar la TRM pública, usando respaldo.', error)
        if (alive) setTrm((current) => ({ ...current, status: 'fallback' }))
      }
    }
    fetchTrm()
    return () => { alive = false }
  }, [])

  return trm
}

function App() {
  const trm = useDailyTrm()
  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent('Hola, quiero asesoría sobre productos CM Labs y precios del día.')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  }, [])

  return <main className="page">
    <nav className="nav">
      <a className="brand" href="#top" aria-label="CM Labs inicio">
        <span className="brandMark">CM</span>
        <span><strong>CM Labs</strong><small>Beauty Biology</small></span>
      </a>
      <div className="navActions">
        <a href="#products">Productos</a>
        <a className="whatsapp" href={whatsappHref} aria-label="Comprar por WhatsApp">WhatsApp</a>
      </div>
    </nav>

    <section className="hero" id="top">
      <div className="heroCopy">
        <p className="eyebrow">CM Peptides · precios vivos</p>
        <h1>Lista premium, actualizada con la TRM del día.</h1>
        <p className="subtitle">Precios de referencia en pesos colombianos calculados automáticamente desde USD con fuente pública gratuita.</p>
        <div className="heroActions">
          <a className="primary" href={whatsappHref}>Pedir asesoría por WhatsApp</a>
          <a className="secondary" href="#products">Ver productos</a>
        </div>
      </div>
      <aside className="trmPanel" aria-label="TRM del día">
        <span className={`status ${trm.status}`}>{trm.status === 'live' ? 'TRM en vivo' : trm.status === 'loading' ? 'Consultando TRM' : 'TRM respaldo'}</span>
        <strong>{copFormatter.format(trm.value)}</strong>
        <p>1 USD · vigente {formatDate(trm.date)}</p>
        <small>Fuente: {trm.source}</small>
      </aside>
    </section>

    <section className="notice" aria-label="Nota de precios">
      <span>Nota importante</span>
      <p>Los precios se ajustan a la TRM oficial del día y pueden variar según disponibilidad, lote y confirmación final por WhatsApp.</p>
    </section>

    <section className="grid" id="products" aria-label="Productos y precios">
      {products.map((product, i) => <article className="card" key={`${product.name}-${product.detail}`}>
        <div className="cardTop"><span>{String(i + 1).padStart(2, '0')}</span><small>{product.tag}</small></div>
        <div className="cardBody">
          <h2>{product.name}</h2>
          <p>{product.detail}</p>
        </div>
        <div className="prices">
          <strong>{formatCop(product.usd, trm.value)}</strong>
          <span>{usdFormatter.format(product.usd)} base USD</span>
        </div>
      </article>)}
    </section>

    <footer>
      <span>WhatsApp: +57 321 642 4600</span>
      <span>CM Labs · Ciencia que se siente bella.</span>
    </footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
