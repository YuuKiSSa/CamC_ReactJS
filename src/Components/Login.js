import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Login.css"

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const isAdmin = username.startsWith("admin/");
            const cleanUsername = isAdmin ? username.replace("admin/", "") : username;
            const endpoint = isAdmin ? "http://13.213.1.218:8080/api/admin-login" : "http://13.213.1.218:8080/api/login";
            const redirectPath = isAdmin ? "/admin-home" : "/gallery";
            if (isAdmin){
                await axios.post("http://13.213.1.218:8080/api/admin-login", {id: cleanUsername, password}, {withCredentials: true});
            }else{
                await axios.post(endpoint, { username: cleanUsername, password }, { withCredentials: true });
            }
            navigate(redirectPath, { state: { fromLogin: true } });
        } catch(error){
            console.error(error);
            setError("Wrong username or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
                <div className="login-links">
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <p>Don't have an account?  <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;