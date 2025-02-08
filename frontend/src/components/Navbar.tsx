import React, { useState }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './navbar.scss';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = (path: string) => {
        navigate(path);
    };

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="nav-main">
            <div className="container-fluid">
                <div className="navbar-brand" onClick={() => navigate("/")}>
                    芝加哥人教会
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={toggleMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className={`nav-item ${isActive("/")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/")}>首页</button>
                        </li>
                        <li className={`nav-item ${isActive("/about")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/about")}>活动</button>
                        </li>
                        <li className={`nav-item ${isActive("/locations")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/locations")}>关于我们</button>
                        </li>
                        <li className={`nav-item ${isActive("/contact")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/contact")}>联系我们</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;