import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Cart = () => {
  const { cart, total, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:5000/api/checkouts", { cart }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setCheckoutSuccess(true);
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert("Error al realizar la compra");
    }
  };

  return (
    <div className="container bg-light p-4 rounded">
      <h2 className="text-dark">🛒 Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="text-dark">El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center justify-content-between border-bottom py-2">
              <img src={item.img} alt={item.name} width="80" />
              <h5 className="m-0 text-dark">{item.name}</h5>
              <p className="m-0 text-dark">${item.price.toLocaleString("es-CL")}</p>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span className="fw-bold text-dark">{item.count}</span>
                <button className="btn btn-primary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
          ))}
          <h4 className="text-dark mt-3">Total: ${total.toLocaleString("es-CL")}</h4>
          <button className="btn btn-success w-100 mt-3" disabled={!token} onClick={handleCheckout}>
            Pagar
          </button>
          {checkoutSuccess && <p className="text-success mt-3">Compra realizada con éxito</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
