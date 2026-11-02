import { useState } from "react";
import { CartContext } from "./CartContext.jsx";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((currentCart) => {
      const exists = currentCart.some(
        (item) => item.id === pizza.id
      );

      if (exists) {
        return currentCart.map((item) =>
          item.id === pizza.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: pizza.id,
          name: pizza.name,
          price: pizza.price,
          img: pizza.img,
          count: 1,
        },
      ];
    });
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}