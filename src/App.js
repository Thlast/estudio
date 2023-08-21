import './App.scss';
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login/Login/Login';
import { SignUp } from './components/Login/SignUp/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import { Examenes } from './components/Examenes';
import { Examen } from './components/examen'
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
import { ConfettiOptions } from './components/confetti';
import { VerRT } from './components/verRT';
import { useEffect } from 'react';
import { FlujosFondos } from './components/flujoFondos/flujosFondos';
import { CompararFlujos } from './components/flujoFondos/comparacionFlujos';
import { MisPreguntas } from './components/misPreguntas';

function App() {

  // const addMetaTag = () => {
  //   const metaTag = document.createElement('meta');
  //   metaTag.setAttribute('name', 'view-transition');
  //   metaTag.setAttribute('content', 'same-origin');
  //   document.head.appendChild(metaTag);
  // };

  // useEffect(() => {
  //   addMetaTag();
  // }, []);

  document.title = 'Estudio'

  // useEffect(() => {

  //   if (document.startViewTransition) {
  //   const navigateHandler = (event) => {
  //     const toUrl = new URL(event.destination.url);

  //     // es una página externa? si es así, lo ignoramos
  //     if (window.location.origin !== toUrl.origin) return;

  //     // si es una navegación en el mismo dominio (origen)
  //     event.intercept({
  //       async handler() {
  //         // vamos a cargar la página de destino
  //         // utilizando un fetch para obtener el HTML
  //         const response = await fetch("http://localhost:4000/obtenerRTCompleta/17"); // /clean-code
  //         const text = await response.text();
  //         // quedarnos sólo con el contenido del html dentro de la etiqueta body
  //         // usamos un regex para extraerlo
  //         const [, data] = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  //         console.log(data)
  //         // utilizar la api de View Transition API
  //         document.startViewTransition(() => {
  //           // el scroll hacia arriba del todo
  //           document.body.innerHTML = data;
  //           document.documentElement.scrollTop = 0;
  //         });
  //       },
  //     });
  //   };

  //   window.navigation.addEventListener('navigate', navigateHandler);

  //   return () => {
  //     window.navigation.removeEventListener('navigate', navigateHandler);
  //   };
  // }
  // }, []);


  return (
    <AuthProvider>
      <DataProvider>
        <HistorialProvider>
          <UserConfigProvider>
            <Nav />
            <MenuDesplegable />
            <Routes>
              <Route
                path="/flujo-de-fondos"
                element={
                  <ProtectedRoute>
                    <CompararFlujos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verRT/:rt"
                element={
                  <ProtectedRoute>
                    <VerRT />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cursos"
                element={
                  <ProtectedRoute>
                    <Cursos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/opcionesUsuario"
                element={
                  <ProtectedRoute>
                    <ConfettiOptions />
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
                    <SVGZoom esquema="Impuesto a las ganancias" />
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
                    <MisPreguntas />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/menu/mis-notas"
                element={
                  <ProtectedRoute>
                    <MostrarNotas perfil={true} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/menu/buscador"
                element={
                  <ProtectedRoute>
                    <Buscador perfil={true} />
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