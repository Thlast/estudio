import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import { Perfil } from './components/Perfil';
import { Examenes } from './components/Examenes';
import {Examen} from './components/examen'
import {MisExamenes} from './components/MisExamenes'
import {useParams} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cursos } from './components/Cursos'
import { Capitulos } from './paginasCaps/Conta7Caps'
import { Curso } from './components/Curso'
import { Conta7 } from './components/Conta7'
import { Impcaps } from './paginasCaps/impcaps';
import { Finanzas } from './paginasCaps/FinanzasCaps';


function App() {

  return (
    <AuthProvider>
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
                <Home />
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
          path="/cursos/conta7/:id" 
            element={
              <ProtectedRoute>
                <Capitulos curso="Conta7"/>
              </ProtectedRoute>
            }
          />
          <Route 
          path="/cursos/impuestos/:id" 
            element={
              <ProtectedRoute>
                <Impcaps curso="Impuestos"/>
              </ProtectedRoute>
            }
          />
          <Route 
          path="/cursos/finanzas/:id" 
            element={
              <ProtectedRoute>
                <Finanzas curso="finanzas"/>
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
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;