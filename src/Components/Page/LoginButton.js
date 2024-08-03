import React, {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function LoginButton() {
    const [user, setUser] = React.useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.fromLogin) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/current-user', { credentials: 'include' });
                    const data = await response.json();
                    setUser(data.username);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                }
            };
            fetchUser();
        }
    }, [location.state, setUser]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/logout', null, { withCredentials: true });
            console.log(response);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="auth-buttons">
            {user ? (
                <div className="auth-buttons">
                    <h2>Welcome, {user}!</h2>
                    <button className="sign-up-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <h2><Link to="/login">Login</Link></h2>
                    <button className="sign-up-button">
                        <Link to="/sign-up">Sign up</Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default LoginButton;