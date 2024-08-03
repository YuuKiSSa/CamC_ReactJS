import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="auth-buttons">
            <h2><Link to="/login">Login</Link></h2>
            <button className="sign-up-button">
                <Link to="/sign-up">Sign up</Link>
            </button>
        </div>

    );
}

export default Login;