import React, { useEffect, useState }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.scss';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLinkClick = (path: string) => {
        navigate(path);
        setMenuOpen(false);
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
                <div className="navbar-brand" id="nav-title" onClick={() => navigate("/")}>
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
                        <li className={`nav-item ${isActive("/events")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/events")}>活动</button>
                        </li>
                        <li className={`nav-item ${isActive("/articles")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/articles")}>信息</button>
                        </li>
                        <li className={`nav-item ${isActive("/contact")}`}>
                            <button className="nav-link" onClick={() => handleLinkClick("/contact")}>联系我们</button>
                        </li>
                        {!isLoggedIn ? (
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogin}>登录</button>
                            </li>
                        ) : (
                            <>
                                <li className={`nav-item ${isActive("/portal")}`}>
                                    <button className="nav-link" onClick={() => handleLinkClick("/portal")}>我的空间</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>注销</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;