import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CartProvider from "./context/CartContext";
import UserProvider from "./context/UserContext";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="container-fluid bg-danger text-white p-0">
            <Navbar />
            <main className="container my-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<AuthRoute><Registerpage /></AuthRoute>} />
                <Route path="/login" element={<AuthRoute><Loginpage /></AuthRoute>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:id" element={<Pizza />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;