import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { useState, useEffect } from "react";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error al obtener las pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <Header />
      <div className="row justify-content-center g-4">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            desc={pizza.desc}
            pizza={pizza} // Pasamos el objeto completo para usarlo en CardPizza
          />
        ))}
      </div>
    </div>
  );
};

export default Home;