import React, {useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginButton() {
    const [user, setUser] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://13.213.1.218:8080/api/current-user', { credentials: 'include' });
                const data = await response.json();
                setUser(data.username || data.id);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };
        fetchUser();
    }, [location.state, setUser]);

    const handleLogout = async () => {
        const confirm_logout = window.confirm('Are you sure you want to logout?');
        if (confirm_logout) {
            try {
                const response = await axios.post('http://13.213.1.218:8080/api/logout', null, { withCredentials: true });
                console.log(response);
                setUser(null);
                navigate("");
            } catch (error) {
                console.error('Logout failed', error);
            }
            window.location.reload();
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
                        <Link to="/signup">Sign up</Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default LoginButton;