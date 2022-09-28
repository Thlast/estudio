import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login/Login';
// import { LoginB } from './components/LoginB';
// import { Register } from './components/Register';
import { SignUp } from './components/Login/SignUp/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import { Perfil } from './components/Perfil';
import { Examenes } from './components/Examenes';
import {Examen} from './components/examen'
import {MisExamenes} from './components/MisExamenes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cursos } from './components/Cursos'
import { Curso } from './components/Curso'
import { Impcaps } from './paginasCaps/impuestos/impcaps';
import { Impuestos } from './components/impuestos';
import { AgregarMongo } from './components/agregarmongo';
import { Nav } from './components/navbarr'
import { HomeMongo } from './components/HomeMongo';
import {UserContextProvider} from './components/Login/context/UserContext';


function App() {

  return (
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
          path="/agregarmongo" 
            element={
              <ProtectedRoute> 
                <AgregarMongo />
              </ProtectedRoute>
            } 
          />
        <Route 
          path="/perfil" 
            element={
              <ProtectedRoute>
                <Perfil />
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
          path="/cursos/:id" 
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
          path="/imp" 
            element={
              <ProtectedRoute>
                <Impuestos />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/examenes/:id" 
            element={
              <ProtectedRoute>
                <Examen />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/misexamenes/:user" 
            element={
              <ProtectedRoute>
                <MisExamenes />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          </Routes>
    </AuthProvider>
  )
}

export default App;