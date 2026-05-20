import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const products = [
  ['Tirzepatida', '5mg', '$221.000', 'US$58.16'],
  ['Tirzepatida', '10mg', '$276.250', 'US$72.70'],
  ['Tirzepatida', '30mg', '$718.250', 'US$189.01'],
  ['Retatrutide', '15mg', '$861.900', 'US$226.81'],
  ['Retatrutide', '60mg', '$2.319.395', 'US$610.36'],
  ['Tesamorelin', '10mg', '$442.000', 'US$116.31'],
  ['TB-500', 'Recuperación', '$497.250', 'US$130.86'],
  ['Glow Blend', 'BPC-157 + GHK-Cu + TB-500', '$442.000', 'US$116.31'],
  ['Ipamorelin', 'Tonificación', '$718.250', 'US$189.01'],
  ['Aicar', 'Resistencia', '$276.250', 'US$72.70'],
  ['Glutatión', '600mg', '$331.500', 'US$87.24'],
  ['Agua Bac.', '3ml', '$33.150', 'US$8.72'],
  ['Agua Bac.', '10ml', '$66.300', 'US$17.45'],
]

function App() {
  return <main className="page">
    <nav className="nav">
      <div className="logo"><span>CM</span><div><strong>CM Labs</strong><small>Beauty Biology</small></div></div>
      <a className="whatsapp" href="https://wa.me/" aria-label="Comprar por WhatsApp">Asesoría</a>
    </nav>
    <section className="hero">
      <p className="eyebrow">CM Peptides · Lista corta</p>
      <h1>Productos y precios CM Peptides.</h1>
      <p className="subtitle">Lista corta de referencia. Compra guiada y disponibilidad por WhatsApp.</p>
    </section>
    <section className="grid" aria-label="Productos y precios">
      {products.map(([name, detail, cop, usd], i) => <article className="card" key={`${name}-${detail}`}>
        <div className="cardTop"><span>{String(i+1).padStart(2,'0')}</span><small>Peptides</small></div>
        <h2>{name}</h2>
        <p>{detail}</p>
        <div className="prices"><strong>{cop}</strong><span>{usd}</span></div>
      </article>)}
    </section>
    <footer>
      <span>Precios sujetos a disponibilidad.</span>
      <span>CM Labs · Ciencia que se siente bella.</span>
    </footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
