import React, { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './navbar.scss';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <nav className='topnav' id='nav-main'>
            <div className='nav-inner'>
                {/* Hamburger menu for small screens */}
                {screenWidth <= 800 && (
                    <div className='hamburger'>
                        <button className='bars-button' onClick={toggleMenu}>
                            <i className='fa-solid fa-bars'></i>
                        </button>
                    </div>
                )}

                {/* Church Name on the Right */}
                <div className='nav-name' onClick={() => navigate("/")}>
                    <h1 className='name'>Church of Chicagoans</h1>
                </div>

                {/* Spacer for larger screens */}
                {screenWidth > 800 && <div className='grow' />}

                {/* Navigation Links */}
                <ul
                    className={`links ${menuOpen ? "menu-open" : ""}`}
                    id='nav-menu-open'
                >
                    <li className={isActive("/")} onClick={() => handleLinkClick("/")}>Home</li>
                    <li className={isActive("/about")} onClick={() => handleLinkClick("/about")}>About</li>
                    <li className={isActive("/locations")} onClick={() => handleLinkClick("/locations")}>Locations</li>
                    <li className={isActive("/contact")} onClick={() => handleLinkClick("/contact")}>Contact</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;