import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="card">
      <h1 className="h1 fw-bold mb-2">🍕 404</h1>
      <h2 className="h3 fw-bold mb-2">Esta porción no está en el menú</h2>
      <p>La página que buscas no existe.</p>

      <Link className="button" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}