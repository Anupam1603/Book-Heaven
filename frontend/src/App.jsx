import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/all-books" element={<AllBooks />} />
          <Route  path="/Signin" element={<Signin />} />
          <Route  path="/Signup" element={<Signup />} />
          <Route  path="/cart" element={<Cart />} />
          <Route  path="/profile" element={<Profile />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
