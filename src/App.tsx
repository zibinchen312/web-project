import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import Portal from "./pages/Portal";
import Footer from "./components/Footer";
//import About from './components/About';
//import Contact from './components/Contact';
//import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/article/:id' element={<ArticleDetails />} />
        <Route path='/login' element={<Login />} /> {/* Add the login route */}
        <Route path='/portal' element={<Portal />} />
        {/*<Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />*/}
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
};

export default App;
