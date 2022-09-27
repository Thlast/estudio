
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { db } from '../firebase';
// import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

// import { getAuth, updateProfile } from "firebase/auth";
// import { Nav } from "./navbarr"
// import { async } from '@firebase/util';
// import { AgregarMongo } from './agregarmongo';

// // import { agregarPregunta } from './Agregar';

// export function Impuestos() {

//     const auth = getAuth();
  
//     const {user, logout, loading} = useAuth();
//     const navigate = useNavigate();
    
//     const [sujeto, setSujeto] = useState("");
  
//     const queSujeto = (xsujeto) => {
//         setSujeto(xsujeto);
//         console.log(sujeto)
//       }
//     const reiniciar = () => {
//       setSujeto("")
//     }

//     useEffect(() => {

//       obtener();
//     }, [])
//     // fetch('http://localhost:3001/cursos').then(x => x.json().then(data =>console.log(data)))

//     const enviar = () => {

//     let url = 'http://localhost:3001/preguntas/impuestos';
//     let data = {  
//       seccion:"pruebapost3",
//       tipo: "comun",
//       pregunta:"pregunta",
//       respuesta: "respuesta"
//   }
    
//     fetch(url, {
//       method: 'POST', // or 'PUT'
//       body: JSON.stringify(data), // data can be `string` or {object}!
//       headers:{
//         'Content-Type': 'application/json'
//       }
//     }).then(res => res.json())
//     .catch(error => console.error('Error:', error))
//     .then(response => console.log('Success:', response));

//   }

//   let [cursoinfo, setCursoInfo] = useState([]);

//   const obtener = async () => {
//     const data = await fetch('http://localhost:3001/cursos')
//     const curso = await data.json()
//     setCursoInfo(curso.cursos);
//       }



//     if(loading) return <h1>Loading...</h1>
    
  
//     return (
//       <div className="App">
//         <Nav />
//         <main className="Inicio">
//           <div>
//             <button
//             onClick={() => enviar()}
//             >
//               Enviar
//             </button>
//             <button
//             onClick={() => obtener()}>
//               Obtener
//             </button>
//             <div>
//               <AgregarMongo />
//             </div>
//             <div>
//               {cursoinfo.map((a, num )=> (
                
//             <li key={num}>
//                 {a.nombre}
//               </li>
//               )
//             )}
//             </div>
//             <div className='proceso'>
//               <p>
//                 1. Identificar Sujeto
//               </p>
//               <p>
//                 2. Aspecto objetivo
//               </p>
//               <p>
//                 3. Solucion
//               </p>
//             </div>
//             <button onClick={() => reiniciar()}>
//               Reiniciar
//             </button>
//           </div>
//           {sujeto === ""?
//             <div>
//                 <p>
//                     ¿Quien obtiene la ganancia?
//                 </p>
//                 <div className='imp'>
//             <button className='botonimp' value={"persona humana"} onClick={e => queSujeto(e.target.value)}>Persona humana</button>
//             <button className='botonimp' value={"sucesion indivisa"} onClick={e => queSujeto(e.target.value)}>Sucesion indivisa</button>
//             <button className='botonimp' value={"empresa"} onClick={e => queSujeto(e.target.value)}>Empresa, persona juridica o demas sujetos indicados en la ley</button>
//             <button className='botonimp' value={"beneficiario del exterior"} onClick={e => queSujeto(e.target.value)}>Beneficiario del exterior</button>
//             </div>
//             </div>
//             : <div>

//             </div>
// }
//             {sujeto === "persona humana"?
            
//             <div>
//                 <p>
//                     ¿Quien obtiene la ganancia?
//                 </p>
//                 <div className='imp'>
//             <button className='botonimp' value={"profesional"} onClick={e => queSujeto(e.target.value)}>Profesional independiente</button>
//             <button className='botonimp' value={"dependencia"} onClick={e => queSujeto(e.target.value)}>En relacion de dependencia</button>
//             <button className='botonimp' value={"dependencia"} onClick={e => queSujeto(e.target.value)}>Otra</button>
//             </div>
//             </div>
//             :
//             <div>
              
// </div>
// }
// {sujeto === "sucesion indivisa"?

// <div>
//             <p>
//                 Sucesion indivisa 
//             </p>
      
//             </div>
//             :
//             <div>
              
            

// </div>

// }

// {sujeto === "beneficiario del exterior"?

// <div>
//             <p>
//                 Persona o empresa residente del exterior tributara por las ganancias de fuente argentina
//             </p>
      
//             </div>
//             :
//             <div>
              
            

// </div>

// }
// {sujeto === "profesional"?
            
//             <div>
//                 <p>
//                     ¿Complementa con actividad comercial?
//                 </p>
//             <button className='botonimp' value={"profesionalcomercial"} onClick={e => queSujeto(e.target.value)}>SI</button>
//             <button className='botonimp' value={"profesionalnocomercial"} onClick={e => queSujeto(e.target.value)}>NO</button>
             
//             </div>
//             :<div>
              
//             </div>
// }
// {sujeto === "empresa"?
// <div>
// Teoria del balance: se considera ganancia a todo incremento patrimonial
// <p>¿confecciona estados contables?</p>
// <button className='boton' value={"empresacontable"} onClick={e => queSujeto(e.target.value)}>SI</button>
// <button className='boton' value={"empresanocontable"} onClick={e => queSujeto(e.target.value)}>NO</button>
             
// </div>:
// <div>

// </div>

// }
// {sujeto === "empresacontable"?
// <div>
// Ajustes para arribar al resultado fiscal 
// </div>:
// <div>

// </div>

// }
// {sujeto === "empresanocontable"?
// <div>
// Confeccionar el estado contable bajo normas fiscales
// </div>:
// <div>

// </div>

// }
// {sujeto === "profesionalcomercial"?
// <div>
// <p>Persona Humana por el desarrollo de actividades profesionales de forma independiente complementando con actividades comerciales</p>
// <p>Toda ganancia relacionada al desarrollo de la actividad se considera renta de tercera categoria</p>
// </div>:
// <div>

// </div>

// }
// {sujeto === "profesionalnocomercial"?
// <div>
// <p>Persona Humana por el desarrollo de una actividad profesional de forma independiente</p>
// <p>La ganancia derivada del ejercicio de la profesion se considera de cuarta categoria</p>
// </div>:
// <div>

// </div>

// }
// {sujeto === "dependencia"?
// <div>
//   <p>Persona Humana</p>
// <p>Ganancias taxativamente enunciadas en la ley:</p>
// <p>Primera categoria: rentas del suelo</p>
// <p>Segunda categoria: rentas del capital</p>
// <p>Tercera categoria: rentas empresarias</p>
// <p>Cuarta categoria: rentas del trabajo personal</p>
// </div>:
// <div>

// </div>

// }


//             <div>
                
            
//             </div>                 
//         </main>
//       </div>
//     );
//   }
