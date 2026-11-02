import { useState } from 'react'

export default function AccessForm({ title, action }) {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Formulario válido. Esta es una demostración sin servidor.')
  }

  return (
    <section className="card">
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={
            action === 'Registrarse'
              ? 'new-password'
              : 'current-password'
          }
          minLength={6}
          required
        />

        <button type="submit">{action}</button>
      </form>

      <p role="status">{message}</p>
    </section>
  )
}