import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function Profile() {
  const { email, logout, getProfile } =
    useContext(UserContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProfile = async () => {
      try {
        const data = await getProfile(controller.signal);

        if (!controller.signal.aborted) {
          setProfile(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => controller.abort();
  }, [getProfile]);

  return (
    <section className="card p-4 my-5">
      <h1 className="h1 fw-bold mb-2">Mi perfil</h1>

      {loading && (
        <p role="status">Cargando perfil...</p>
      )}

      {error && (
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && profile && (
        <p>Email: {profile.email}</p>
      )}

      {loading && email && (
        <p>Sesión iniciada como: {email}</p>
      )}

      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </section>
  );
}