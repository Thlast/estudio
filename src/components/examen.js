import { collection, getDoc, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from './Login/Spinner';
import { MostrarPregunta } from './preguntas/mostrarPregunta';
import { eliminarPregunta } from './servicios/preguntas/eliminarPregunta';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

 export const Examen = () => {
    const MySwal = withReactContent(Swal)
    const {id} = useParams();
    const [cargando, setCargando] = useState(true);
    const [examen, setExamen] = useState({});
    const examenesCollectionRef = collection(db, "examenes");
    const {user} = useAuth();
    const navigate = useNavigate();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    useEffect(
        ()=>{
            async function request(){
                try {
                    const document = await getDoc(doc(db, "examenes/"+id)); 
                    setCargando(false);
                    setExamen(document.data());
                    
                } catch (e){
                    console.log("error", e);
                }
                
            }
            request();
        },
        []
    )


      const mostrar = (num) => {
        document.getElementById(num).style.display = 'block';
        document.getElementById("mostrar"+num).style.display = 'none';
        document.getElementById("ocultar"+num).style.display = 'block';
        
      }
      const ocultar = (num) => {
        document.getElementById(num).style.display = 'none';
        document.getElementById("mostrar"+num).style.display = 'block';
        document.getElementById("ocultar"+num).style.display = 'none';
       
      }

      const [nombre, setNombre] = useState();
      const [materia, setMateria] = useState();
      const [descripcion, setDescripcion] = useState();

      const [mod, setMod] = useState(false);


      const modificarNombre = (nombre) => {
        updateDoc(doc(db, "examenes", id), {nombre})
      }
      const modificarMateria = (materia) => {
        updateDoc(doc(db, "examenes", id), {materia})
      }
      const modificarDescripcion = (descripcion) => {
        updateDoc(doc(db, "examenes", id), {descripcion})
      }

      const modNombre = async(nombre) => {
        try {
        await modificarNombre(nombre)
        alert("nombre modificado")
        }
        catch(error) {
          alert("error")
        }
      }
      const modMateria = async(materia) => {
        try {
        await modificarMateria(materia)
        alert("materia modificada")
        }
        catch(error) {
          alert("error")
        }
      }

      const modDescripcion = async(descripcion) => {
        try {
        await modificarDescripcion(descripcion)
        alert("descripcion modificada")
        }
        catch(error) {
          alert("error")
        }
      }

      const eliminarExamen = async (pregs) => {

        swalWithBootstrapButtons.fire({
          title: 'Seguro desea eliminar el examen?',
          text: "Se eliminaran todas las preguntas en este examen",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar todo!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            try{
              await pregs.map((n) => eliminarPregunta(n.id));
              deleteDoc(doc(db, 'examenes', id));
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'navegando a examenes',
                'success'
              );
              navigate("/examenes/")
              }
              catch(error) {
                alert("error" + error)
              }
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'El examen y las preguntas no se han eliminado',
              'error'
            )
          }
        })
      }
    
    const [most, setMost] = useState(false)

    const editar = () => {
      if (user.uid === examen.user) {
        setMod(false);
        setMost(!most);    
      }
      else {
        alert("solo el creador tiene permiso a editar")
      }
    }
    
        return(
            <div class="pagina-examen">
              {cargando ? <Spinner></Spinner> :
              <div>
                <div>
                  <Link to={"/examenes/"}>
                   {"< "} volver
                  </Link>
                </div>
                <div>
                  <button 
                  className='boton btn-primary'
                  onClick={editar}>
                    editar
                  </button>
                </div>
                <div>
                 Examen: {" "}
                 {most ?
                <input 
                  class="boton" 
                  placeholder={examen.nombre}
                  onChange={(e) => setNombre(e.target.value)}>
                </input> : 
                  <span>
                  {examen.nombre}
                  </span>
 }
                {most &&
                    <button 
                      className='boton btn-primary'
                      onClick={() => modNombre(nombre)}>
                      modificar
                    </button> 
    }
                 </div>
                
                 <div>
                 Materia: 
                 {most ? 
                  <input 
                    onChange={(e) => setMateria(e.target.value)}
                    class="boton" 
                    placeholder={examen.materia}>
                  </input> : 
                  <span>
                  {examen.materia}
                  </span>
 }
                  {most &&
                 <button 
                 onClick={() => modMateria(materia)}
                 class="boton btn-primary">
                   modificar
                 </button>
    }
                 </div>
                 <div>
                 Descripcion: 
                 {most ? 
                  <input 
                    onChange={(e) => setDescripcion(e.target.value)}
                    class="boton" 
                    placeholder={examen.descripcion}>
                  </input> : 
                  <span>
                  {examen.descripcion}
                  </span>
 }
                  {most &&
                 <button 
                 onClick={() => modDescripcion(descripcion)}
                 class="boton btn-primary">
                   modificar
                 </button>
    }
                 </div>
                 Creado por: {examen.usernombre}
                 <div>
                 </div>
                 <br></br>
               <div class="">
               <MostrarPregunta 
                eliminarExamen={eliminarExamen}
                examenid={id}
                agregar={most} 
                edit={most} 
                mostrarPreguntas={true} />
          
          </div>
                </div>}
            </div>
        )
    }
