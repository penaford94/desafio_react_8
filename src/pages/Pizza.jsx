import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CartContext } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const Pizza = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getPizza = async () => {
      setLoading(true);
      setError("");
      setPizza(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/pizzas/${encodeURIComponent(id)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "No encontramos esa pizza."
              : `No se pudo cargar la pizza: HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPizza(data);
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

    getPizza();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p role="status">Cargando pizza...</p>;
  }

  if (error) {
    return (
      <section className="my-5">
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
        <Link to="/">Volver al inicio</Link>
      </section>
    );
  }

  if (!pizza) {
    return <p>No hay información de la pizza.</p>;
  }

  return (
    <section className="my-5">
      <article className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={pizza.img}
              alt={`Pizza ${pizza.name}`}
              className="img-fluid w-100 pizza-detail-image"
            />
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h1 className="fw-bold text-capitalize pizza-title">
                Pizza {pizza.name}
              </h1>

              <p>{pizza.desc}</p>

              <h2 className="fw-bold text-capitalize pizza-title">
                Ingredientes
              </h2>

              <ul>
                {pizza.ingredients.map((ingredient) => (
                  <li key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>

              <p className="fs-4 fw-bold">
                Precio: ${formatCurrency(pizza.price)}
              </p>

              <button
                type="button"
                className="btn btn-dark"
                onClick={() => addToCart(pizza)}
              >
                Añadir 🛒
              </button>

              <Link to="/" className="btn btn-link">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Pizza;