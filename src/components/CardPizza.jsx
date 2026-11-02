import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useContext(CartContext);
  const { id, name, price, ingredients, img } = pizza;

  return (
    <article className="card h-100">
      <img
        src={img}
        className="card-img-top pizza-image"
        alt={`Pizza ${name}`}
      />

      <div className="card-body d-flex flex-column">
        <h2 className="card-title fs-5 text-capitalize">
          Pizza {name}
        </h2>

        <hr />

        <p className="text-center text-secondary mb-2">
          Ingredientes:
        </p>

        <ul className="list-unstyled text-center flex-grow-1">
          {ingredients.map((ingredient) => (
            <li key={ingredient}>🍕 {ingredient}</li>
          ))}
        </ul>

        <hr />

        <p className="text-center fs-4">
          Precio: ${formatCurrency(price)}
        </p>

        <div className="d-flex justify-content-between">
          <Link
            to={`/pizza/${id}`}
            className="btn btn-outline-dark"
          >
            Ver más 👀
          </Link>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() => addToCart(pizza)}
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardPizza;