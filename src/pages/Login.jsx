import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const { login } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === "" || password === "") {
      setFeedback({
        type: "danger",
        message: "Todos los campos son obligatorios.",
      });
      return;
    }

    if (password.length < 6) {
      setFeedback({
        type: "danger",
        message: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: "¡Inicio de sesión exitoso!",
    });
    login();
    setEmail("");
    setPassword("");
  };

  return (
    <section className="auth-section">
      <div className="card auth-card border-0 shadow-lg">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <span className="auth-icon">🍕</span>
            <h1 className="h1 fw-bold mb-2">Login</h1>
            <p className="text-secondary mb-0">
              Bienvenido a Pizzería Mamma Mía
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>

              <input
                id="login-email"
                type="email"
                className="form-control"
                placeholder="nombre@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="login-password" className="form-label">
                Contraseña
              </label>

              <input
                id="login-password"
                type="password"
                className="form-control"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-mamma w-100 py-2 fw-semibold"
            >
              Ingresar
            </button>
          </form>

          {feedback && (
            <div
              className={`alert alert-${feedback.type} mt-4 mb-0`}
              role="alert"
            >
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;