import './App.scss';
import {Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login/Login';
import { SignUp } from './components/Login/SignUp/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import { Examenes } from './components/Examenes';
import {Examen} from './components/examen'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cursos } from './components/Cursos'
import { Curso } from './components/Curso'
import { Impcaps } from './paginasCaps/Secciones/impcaps';
import { Secciones } from './paginasCaps/SeccionesSQL/secciones';
// import { Impuestos } from './components/impuestos';
import { Nav } from './components/navbarr'
import { HomeMongo } from './components/HomeMongo';
import { DataProvider } from './context/MateriasContext';
import { HistorialProvider } from './context/Resueltas';
import { Prestamos } from './components/calcPrestamos';
import { EdeResultados } from './components/estados contables/EdeResultados';
import { ModelosRT9 } from './components/estados contables/modelosRT9';
import { TransformarTabla } from './components/transformarTabla';
import { ImprimirHTML } from './components/imprimirResumen';
import { InformeAuditor } from './components/informeAuditor';
import { MenuDesplegable } from './components/menuDesplegable';
import { MostrarPregunta } from './components/preguntas/mostrarPregunta';
import { MostrarNotas } from './components/notes/mostrarNotas';
import { Buscador } from './components/buscador';
import { UserConfigProvider } from './context/UserConfig';
import { SVGZoom } from './components/dataInformes/guia';
import { Articulos } from './components/dataInformes/articulos';
import { InteraccionIA } from './components/IA/interaccion';
import { Error404 } from './components/Error404';

function App() {

  document.title = 'Estudio'

  return (
    <AuthProvider>
    <DataProvider>
    <HistorialProvider>
      <UserConfigProvider>
      <Nav />
      <MenuDesplegable />
      <Routes>
      <Route 
          path="/cursos" 
            element={
              <ProtectedRoute> 
                <Cursos />
              </ProtectedRoute>
            } 
          />
      <Route 
          path="/IA" 
            element={
              <ProtectedRoute> 
                <InteraccionIA />
              </ProtectedRoute>
            } 
          />
      <Route 
          path="/guia/" 
            element={
              <ProtectedRoute> 
                <SVGZoom esquema="Impuesto a las ganancias"/>
              </ProtectedRoute>
            } 
          />
      <Route 
          path="/articulos" 
            element={
              <ProtectedRoute> 
                <Articulos />
              </ProtectedRoute>
            } 
          />
        <Route 
          path="/" 
          element={
            <ProtectedRoute> 
              <HomeMongo />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/menu/mis-preguntas" 
            element={
              <ProtectedRoute>
                <MostrarPregunta perfil={true} edit={true} mostrarPreguntas={true} filtroMaterias={true}/>
              </ProtectedRoute>
            }
          />
          
        <Route 
          path="/menu/mis-notas" 
            element={
              <ProtectedRoute>
                <MostrarNotas perfil={true}/>
              </ProtectedRoute>
            }
          />
          
        <Route 
          path="/menu/buscador" 
            element={
              <ProtectedRoute>
                <Buscador perfil={true}/>
              </ProtectedRoute>
            }
          />
        <Route 
          path="/informeAuditor" 
            element={
              <ProtectedRoute>
                <InformeAuditor />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/examenes" 
            element={
              <ProtectedRoute>
                <Examenes />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/cursos/:curso" 
            element={
              <ProtectedRoute>
                <Curso />
              </ProtectedRoute>
            }
          />
           <Route 
          path="/cursos/:curso/:focus" 
            element={
              <ProtectedRoute>
                <Curso />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/cursos/:materia/:titulo/:sec" 
            element={
              <ProtectedRoute>
                <Impcaps />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/cursosSQL/:curso/:capituloId/:titulo/:id/" 
            element={
              <ProtectedRoute>
                <Secciones />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/Error404" 
            element={
              <ProtectedRoute>
                <Error404 />
              </ProtectedRoute>
            }
          />
          {/* <Route 
          path="/imp" 
            element={
              <ProtectedRoute>
                <Impuestos />
              </ProtectedRoute>
            }
          /> */}
          <Route 
          path="/examenes/:id" 
            element={
              <ProtectedRoute>
                <Examen />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/calculadora-prestamos" 
            element={
              <ProtectedRoute>
                <Prestamos />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/estados-contables" 
          element={
            <ProtectedRoute> 
              <ModelosRT9 />
            </ProtectedRoute>
          } 
        />
           <Route 
          path="/estados-contables/estado-de-resultados" 
          element={
            <ProtectedRoute> 
              <EdeResultados />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/texto-a-tabla" 
          element={
            <ProtectedRoute> 
              <TransformarTabla />
            </ProtectedRoute>
          } 
        />
           <Route 
          path="/imprimirResumen/:curso" 
          element={
            <ProtectedRoute> 
              <ImprimirHTML />
            </ProtectedRoute>
          } 
        />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          </Routes>
          </UserConfigProvider>
    </HistorialProvider>
    </DataProvider>
    </AuthProvider>
  )
}

export default App;