// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../CSS/Navbar.css"
import LoginButton from "./LoginButton";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <h1><span className="logo-cam">Cam</span><span className="logo-c">C</span></h1>
                </div>
                <ul className="nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/gallery">Camera</Link></li>
                    <li><Link to="/favorite">Favorite</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <div>
                    <LoginButton />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
