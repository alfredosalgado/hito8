import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío al inicio
  const [total, setTotal] = useState(0);

  const addToCart = (pizza) => {
    const existingPizza = cart.find((item) => item.id === pizza.id);
    if (existingPizza) {
      const updatedCart = cart.map((item) =>
        item.id === pizza.id ? { ...item, count: item.count + 1 } : item
      );
      setCart(updatedCart);
      setTotal(total + pizza.price);
    } else {
      setCart([...cart, { ...pizza, count: 1 }]);
      setTotal(total + pizza.price);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    const pizza = cart.find((item) => item.id === id);
    setCart(updatedCart);
    setTotal(total + pizza.price);
  };

  const decreaseQuantity = (id) => {
    const pizza = cart.find((item) => item.id === id);
    if (pizza.count > 1) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      );
      setCart(updatedCart);
      setTotal(total - pizza.price);
    } else {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      setTotal(total - pizza.price);
    }
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;