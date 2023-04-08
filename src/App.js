import './App.scss';
import {Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login/Login';
import { SignUp } from './components/Login/SignUp/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import { Perfil } from './components/Perfil';
import { Examenes } from './components/Examenes';
import {Examen} from './components/examen'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cursos } from './components/Cursos'
import { Curso } from './components/Curso'
import { Impcaps } from './paginasCaps/Secciones/impcaps';
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

function App() {

  document.title = 'Estudio'

  return (
    <HistorialProvider>
    <DataProvider>
    <AuthProvider>
      <Nav />
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
          path="/" 
          element={
            <ProtectedRoute> 
              <HomeMongo />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/menu" 
            element={
              <ProtectedRoute>
                <Perfil />
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

    </AuthProvider>
    </DataProvider>
    </HistorialProvider>
  )
}

export default App;