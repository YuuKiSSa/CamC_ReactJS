import React from "react";
import axios from "axios";
import "../CSS/Login.css"

function SignUp() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/register", {username, password});
            window.alert("Sign up successfully! Please login again!");
            window.location.href = "/login";
        } catch(error){
            console.error(error);
            setError("Your username already exists!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Sign up</h1>
                <form onSubmit={handleSignUp}>
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
                    <button type="submit">Sign Up</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default SignUp;