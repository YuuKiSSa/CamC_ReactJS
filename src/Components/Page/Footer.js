// Footer.js
import React from 'react';
import "../../CSS/Footer.css"
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="left">
                <p className="copyright">&copy; Copyright 2024 CamC.NFT. All rights reserved.</p>
            </div>
            <div className="right">
                <Link to="/contact">Contact us</Link>
            </div>
        </footer>
    );
}

export default Footer;
