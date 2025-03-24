import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Importamos el contexto

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Obtenemos addToCart del contexto

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error("Pizza no encontrada");
        }
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error("Error al obtener la pizza:", error);
        setPizza(null);
      }
    };

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <p className="text-center">Pizza no encontrada</p>;
  }

  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card shadow-lg">
          <img src={pizza.img} className="card-img-top" alt={pizza.name} />
          <div className="card-body text-center bg-warning">
            <h5 className="card-title fw-bold text-dark">{pizza.name}</h5>
            <p className="card-text text-secondary">Precio: ${pizza.price.toLocaleString("es-CL")}</p>
            <p className="card-text text-muted">{pizza.desc}</p>
            <ul className="list-unstyled">
              {pizza.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted">• {ingredient}</li>
              ))}
            </ul>
            <div className="d-flex justify-content-center mt-3">
              <button 
                className="btn btn-danger" 
                onClick={() => addToCart(pizza)} // Añadimos funcionalidad
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;