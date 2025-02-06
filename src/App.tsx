import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar';
import Home from './Home';
import Footer from './components/Footer';
//import About from './components/About';
//import Contact from './components/Contact';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />*/}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;