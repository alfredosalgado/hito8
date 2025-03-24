import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Solo inicializamos el token a partir del localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [email, setEmail] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      setToken(response.data.token);
      setEmail(response.data.email);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { email, password });
      setToken(response.data.token);
      setEmail(response.data.email);
      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("email");
      return response.data;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      throw error;
    }
  };

  // Logout: elimina token y email del estado y remueve el token del localStorage
  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
  };

  // Metodo para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Get profile error:", error.response?.data || error.message);
      throw error;
    }
  };

  // Al montar el componente, si existe un token, hacemos la llamada para obtener el perfil y actualizar el email.
  useEffect(() => {
    if (token) {
      getProfile()
        .then(data => {
          setEmail(data.email);
        })
        .catch(error => {
          console.error("Error fetching profile on mount:", error);
        });
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
