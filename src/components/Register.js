import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import { auth, db } from '../firebase';

export function Register() {
    
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        password: ""
    });
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { login } = useAuth();

    const agregarUsuario = (user, email, displayName) => {
        addDoc(collection(db, 'usuarios'), {user, email, displayName})
        
      }

    const handleChange = ({target: {name, value}}) => 
        setUser({...user, [name]: value})
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await signup(user.email, user.password, user.displayName);
            // agregarUsuario(user.nombre, user.email);
            alert("Se ha registrado correctamente");
            navigate("/");
        } catch (error) {
              setError(error.message);
                alert({error})
        }
    }
  

    return <div>

            {error && <p>{error}</p>}

                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange}></input>

                    <label htmlFor="nombre">Nombre de usuario</label>
                    <input type="text" name="nombre" onChange={handleChange}></input>

                    <button>Registrarse</button>
                </form>

            </div>

}
