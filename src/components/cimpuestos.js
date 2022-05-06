import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import {Nav} from "./navbarr";
import { datosCurso } from '../Contacurso/json';

import { Curso } from './Curso';

export function Conta7() {

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
    


    const most = (e) => {
        document.getElementById("capitulo"+e).style.display = 'block';
        document.getElementById("mostrar"+e).style.display = 'none';
        document.getElementById("ocultar"+e).style.display = 'block';

      }
      const ocultar = (e) => {
        document.getElementById("capitulo"+e).style.display = 'none';
        document.getElementById("mostrar"+e).style.display = 'block';
        document.getElementById("ocultar"+e).style.display = 'none';
        
      }


      const ingresar = (tema) => {
        
        navigate("/curso/"+tema)

        console.log(tema)
    }    

      const temas = [
        "El conflicto principal-agente y la contabilidad",
        "Internalizacion de ineficiencias"
    ]

    const [curso, setCurso] = useState("conta")

    const capitulos = [];
   

    const curs = datosCurso;
    
    const filtrar = () => {
        curs.filter((a) => {
            if(a.nombre === curso)
            capitulos.push(a.capitulos);
            console.log(capitulos)
    } 
    ) 
    }
    filtrar()
    
    if(loading) return <h1>Loading...</h1>

    return (
        <div>
        <Nav />
        <Curso />    
</div>
    )
}