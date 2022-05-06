import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export function Login() {
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = ({target: {name, value}}) => 
        setUser({...user, [name]: value})
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
            console.log("exito")
        } catch (error) {
              setError(error.message);
             
        }
    };

    return <div>

            {error && <p>{error}</p>}

                <form onSubmit={handleSubmit}>

                    {/* <label htmlFor="name">Nombre</label>
                    <input type="name" name="name" onChange={handleChange}></input> */}
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange}></input>

                    <button>Login</button>
                </form>
                    <button><a href="/register">Registrarse</a></button>
            </div>

}
