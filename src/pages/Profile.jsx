import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function Profile() {
  const { logout } = useContext(UserContext);

  return (
    <section className="card">
      <h1 className="h1 fw-bold mb-2">Mi perfil</h1>
      <p>Email: usuario@ejemplo.com</p>

      <button type="button" onClick={logout}>
        Cerrar sesión
      </button>
    </section>
  );
}