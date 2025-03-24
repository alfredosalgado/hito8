import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { email, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="text-center mt-5">
      <h2 className="text-white">Perfil de Usuario</h2>
      {email ? <p className="text-white">Email: {email}</p> : <p className="text-white">No hay usuario autenticado</p>}
      <button className="btn btn-warning" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
