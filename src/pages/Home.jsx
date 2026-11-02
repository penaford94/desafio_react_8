import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getPizzas = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pizzas",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `No se pudieron cargar las pizzas: HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPizzas(data);
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

    getPizzas();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      <Header />

      <section className="container my-5">
        {loading && (
          <p role="status">Cargando pizzas...</p>
        )}

        {error && (
          <p className="alert alert-danger" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="row g-4">
            {pizzas.map((pizza) => (
              <div
                className="col-12 col-md-4"
                key={pizza.id}
              >
                <CardPizza pizza={pizza} />
              </div>
            ))}

            {pizzas.length === 0 && (
              <p>No hay pizzas disponibles.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;