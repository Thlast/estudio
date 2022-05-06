import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import {Nav} from "./navbarr";
import { datosCurso } from '../Contacurso/json';

export function Cursos() {

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
    
    


      const ingresar = (c) => {
        navigate("/cursos/"+c)
        
    }    

      const c = [
        "conta7",
        "impuestos",
        "finanzas"
    ]

    
    if(loading) return <h1>Loading...</h1>

    return (
        <div>
        <Nav />
            <div className='cursos'>
                <div class="cursos-container">
                    <div class='cursos-descripcion'>
                    <h1>
                    Curso:
                    </h1>
                    <div class="listado-cursos">
                        {c.map((s) => {
                            return (
                                <button
                            onClick={() => ingresar(s)}
                            >
                                {s}
                            </button>
                            )
                        })}
                            
                       
                    </div>
                   
                    </div>
            </div>
            
        </div>
</div>
    )
}