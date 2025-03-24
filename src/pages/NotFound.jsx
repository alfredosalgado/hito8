import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h2 className="text-white">404 - Página no encontrada</h2>
      <p className="text-white">Oops! La página que buscas no existe.</p>
      <Link to="/" className="btn btn-warning">Volver al Inicio</Link>
    </div>
  );
};

export default NotFound;