import React from 'react';

import './footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content container">
                <div className="footer-info">
                    <h3 className="footer-title">Church in Chicago (example)</h3>
                    <p>301 W 31st St, Chicago, IL 60616, USA</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: thechurchofthechicagoans@gmail.com</p>
                </div>
                <div className="footer-bottom text-center">
                    <p>&copy; 2025 Church in Chicago. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;