import { useContext, useState} from "react";
import { apiRequest } from "../services/api.js";
import { CartContext } from "../context/CartContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";


const Cart = () => {
  const {
    cart,
    total,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const { token, logout } = useContext(UserContext);
  const [feedback, setFeedback] = useState(null);
  const [paying, setPaying] = useState(false);
  
  const handlePay = async (event) => {
  event.preventDefault();

  if (paying) return;

  setFeedback(null);

  if (!token) {
    setFeedback({
      type: "danger",
      message: "Debes iniciar sesión para pagar.",
    });
    return;
  }

  if (cart.length === 0) {
    setFeedback({
      type: "danger",
      message: "Agrega productos antes de pagar.",
    });
    return;
  }

  try {
    setPaying(true);

    await apiRequest("/checkouts", {
      method: "POST",
      token,
      body: { cart },
    });

    clearCart();

    setFeedback({
      type: "success",
      message:
        "¡Compra realizada con éxito! Tu carrito fue vaciado.",
    });
  } catch (error) {
    if (error.status === 401) {
      logout();
    }

    setFeedback({
      type: "danger",
      message: error.message,
    });
  } finally {
    setPaying(false);
  }
};


  return (
    <section className="my-5">
      <h1 className="fw-bold mb-4 cart-title">
        Detalles del pedido
      </h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        cart.map((pizza) => (
          <article
            key={pizza.id}
            className="d-flex flex-wrap align-items-center
              justify-content-between gap-3 border-bottom py-3"
          >
            <div className="d-flex align-items-center gap-3">
              <img
                src={pizza.img}
                alt={`Pizza ${pizza.name}`}
                width="80"
                height="80"
                style={{ objectFit: "cover" }}
              />

              <div>
                <h2 className="fs-5 text-capitalize">
                  Pizza {pizza.name}
                </h2>

                <p className="mb-0">
                  Precio unitario: $
                  {formatCurrency(pizza.price)}
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                aria-label={`Disminuir cantidad de pizza ${pizza.name}`}
                onClick={() => decreaseQuantity(pizza.id)}
                disabled={paying}
              >
                −
              </button>

              <span>{pizza.count}</span>

              <button
                type="button"
                className="btn btn-outline-primary"
                aria-label={`Aumentar cantidad de pizza ${pizza.name}`}
                onClick={() => addToCart(pizza)}
                disabled={paying}
              >
                +
              </button>

              <span className="ms-2">
                Subtotal: $
                {formatCurrency(pizza.price * pizza.count)}
              </span>

              <button
                type="button"
                className="btn btn-outline-secondary"
                aria-label={`Eliminar pizza ${pizza.name} del carrito`}
                onClick={() => removeFromCart(pizza.id)}
                disabled={paying}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))
      )}
    <form onSubmit={handlePay} noValidate>
          <h2 className="fs-2 mt-4 cart-total">
            Total: ${formatCurrency(total)}
          </h2>
          <button
            type="submit"
            className="btn btn-success mt-3"
            disabled={!token || cart.length === 0 || paying}
          >
            {paying ? "Procesando..." : "Pagar"}
          </button>

    {!token && (
      <p className="text-secondary mt-2">
        Debes iniciar sesión para pagar.
      </p>
    )}
    </form>
    {feedback && (
    <div
      className={`alert alert-${feedback.type} mt-4 mb-0`}
      role="alert"
    >
      {feedback.message}
    </div>
  )}
    </section>
  


  );
};

export default Cart;