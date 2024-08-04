import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css"

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/login", {username, password}, { withCredentials: true });
            navigate("/gallery", { state: { fromLogin: true } })
        } catch(error){
            console.error(error);
            setError("Wrong username or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
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
            </div>
        </div>
    );
}

export default Login;