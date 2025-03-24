import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Registerpage = () => {
  const [users, setUsers] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = users;
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await register({ email, password });
      alert('Registro exitoso');
      navigate("/");
      setUsers({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      alert("Error en registro");
    }
  };

  return (
    <div className="card mt-5 mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title text-center">Registro</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor='email' className='form-label'>Email</label>
            <input
              type='email'
              name='email'
              value={users.email}
              onChange={handleChange}
              className='form-control'
              placeholder='Introduce el correo'
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor='password' className='form-label'>Contraseña</label>
            <input
              type='password'
              name='password'
              value={users.password}
              onChange={handleChange}
              className='form-control'
              placeholder='Introduce tu contraseña'
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor='confirmPassword' className='form-label'>Confirma tu contraseña</label>
            <input
              type='password'
              name='confirmPassword'
              value={users.confirmPassword}
              onChange={handleChange}
              className='form-control'
              placeholder='Confirma tu contraseña'
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-100' disabled={!users.email || !users.password || !users.confirmPassword}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
