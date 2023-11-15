import './App.scss';
import { Routes, Route, Outlet } from 'react-router-dom'
import { Login } from './components/Login/Login/Login';
import { SignUp } from './components/Login/SignUp/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import { Examenes } from './components/Examenes';
import { Examen } from './components/examen'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cursos } from './components/Cursos'
import { Nav } from './components/navbarr'
import { HomeMongo } from './components/HomeMongo';
import { DataProvider } from './context/MateriasContext';
import { HistorialProvider } from './context/Resueltas';
import { ModelosRT9 } from './components/estados contables/modelosRT9';
import { TransformarTabla } from './components/transformarTabla';
import { ImprimirHTML } from './components/imprimirResumen';
import { MenuDesplegable } from './components/menuDesplegable';
import { MostrarNotas } from './components/notes/mostrarNotas';
import { UserConfigProvider } from './context/UserConfig';
import { SVGZoom } from './components/dataInformes/guia';
import { Articulos } from './components/dataInformes/articulos';
import { InteraccionIA } from './components/IA/interaccion';
import { Error404 } from './components/Error404';
import { ConfettiOptions } from './components/confetti';
import { VerRT } from './components/verRT';
import { MisPreguntas } from './components/misPreguntas';
import { Calculadoras } from './components/calculadorasImpuestos/calculadoras';
import { Suspense, lazy } from 'react';
import FileUploadForm from './components/subirExcel.jsx';

export function App() {

  document.title = 'Estudio'

  // useEffect(() => {
  //   const navigateHandler = async (event) => {
  //     if (document.startViewTransition) {
  //       const toUrl = new URL(event.destination.url);
  //       // Es una página externa? Si es así, lo ignoramos
  //       if (window.location.origin !== toUrl.origin) return;

  //       try {
  //         // Obtener el contenido HTML de la página de destino
  //         const response = await fetch(toUrl.href);
  //         const text = await response.text();
  //         console.log(text, response)
  //         // Utilizar DOMParser para parsear el HTML y obtener el contenido de <body>
  //         const parser = new DOMParser();
  //         const htmlDocument = parser.parseFromString(text, 'text/html');
  //         const bodyContent = htmlDocument.querySelector('body').innerHTML;

  //         // Utilizar la API de View Transition para realizar el cambio de vista
  //         document.startViewTransition(() => {
  //           document.body.innerHTML = bodyContent;
  //           document.documentElement.scrollTop = 0;
  //         });
  //       } catch (error) {
  //         console.error('Error during navigation:', error);
  //       }
  //     }
  //   };

  //   if (document.startViewTransition) {
  //     window.navigation.addEventListener('navigate', navigateHandler);
  //     return () => {
  //       window.navigation.removeEventListener('navigate', navigateHandler);
  //     };
  //   }
  // }, []);

  const EdeResultados = lazy(() => import('./components/estados contables/EdeResultados'))
  const CalculadoraGanancias = lazy(() => import('./components/calculadorasImpuestos/calculadoraGanancia/calculadoraGanancias'))
  const CalculadoraRetenciones = lazy(() => import('./components/calculadorasImpuestos/calculadoraRetenciones/calculadoraRetenciones'))
  const Prestamos = lazy(() => import('./components/calculadoraPrestamos/calcPrestamos'))
  const FileReader = lazy(() => import('./components/conciliaciones/conciliacion.jsx'))
  
  const Buscador = lazy(() => import('./components/buscador'))
  const Curso = lazy(() => import('./components/Curso'))
  const CompararFlujos = lazy(() => import('./components/flujoFondos/comparacionFlujos'))

  //PARTE DE LAS SECCIONES
  const Secciones = lazy(() => import('./paginasCaps/SeccionesSQL/secciones'))
  const Impcaps = lazy(() => import('./paginasCaps/Secciones/impcaps'))

  return (
    <AuthProvider>
      <DataProvider>
        <HistorialProvider>
          <UserConfigProvider>
            <Routes>
              <Route path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                <Route
                  path="/excel"
                  element={
                    <FileUploadForm />
                  }
                />
                <Route
                  path="/conciliaciones"
                  element={
                    <FileReader />
                  }
                />
                <Route
                  path="/calculadoras/ganancias"
                  element={
                    <CalculadoraGanancias />
                  }
                />
                <Route
                  path="/calculadoras/retenciones"
                  element={
                    <CalculadoraRetenciones />
                  }
                />
                <Route
                  path="/calculadoras"
                  element={
                    <Calculadoras />
                  }
                />
                <Route
                  path="/flujo-de-fondos"
                  element={
                    <CompararFlujos />
                  }
                />
                <Route
                  path="/verRT/:rt"
                  element={
                    <VerRT />
                  }
                />
                <Route
                  path="/cursos"
                  element={
                    <Cursos />
                  }
                />
                <Route
                  path="/opcionesUsuario"
                  element={
                    <ConfettiOptions />
                  }
                />
                <Route
                  path="/IA"
                  element={
                    <InteraccionIA />
                  }
                />
                <Route
                  path="/guia/"
                  element={
                    <SVGZoom esquema="Impuesto a las ganancias" />
                  }
                />
                <Route
                  path="/articulos"
                  element={
                    <Articulos />
                  }
                />
                <Route
                  path="/"
                  element={
                    <HomeMongo />
                  }
                />
                <Route
                  path="/menu/mis-preguntas"
                  element={
                    <MisPreguntas />
                  }
                />

                <Route
                  path="/menu/mis-notas"
                  element={
                    <MostrarNotas perfil={true} />
                  }
                />

                <Route
                  path="/menu/buscador"
                  element={
                    <Buscador perfil={true} />
                  }
                />
                <Route
                  path="/examenes"
                  element={
                    <Examenes />
                  }
                />
                <Route
                  path="/cursos/:curso"
                  element={
                    <Curso />
                  }
                />
                <Route
                  path="/cursos/:curso/:focus"
                  element={
                    <Curso />
                  }
                />
                <Route
                  path="/cursos/:materia/:titulo/:sec"
                  element={
                    <Impcaps />
                  }
                />
                <Route
                  path="/cursosSQL/:curso/:capituloId/:titulo/:id/"
                  element={
                    <Secciones />
                  }
                />
                <Route
                  path="/Error404"
                  element={
                    <Error404 />
                  }
                />
                {/* <Route 
          path="/imp" 
            element={            
                <Impuestos />              
            }
          /> */}
                <Route
                  path="/examenes/:id"
                  element={
                    <Examen />
                  }
                />
                <Route
                  path="/calculadora-prestamos"
                  element={
                    <Prestamos />
                  }
                />
                <Route
                  path="/estados-contables"
                  element={
                    <ModelosRT9 />
                  }
                />
                <Route
                  path="/estados-contables/estado-de-resultados"
                  element={
                    <EdeResultados />
                  }
                />
                <Route
                  path="/texto-a-tabla"
                  element={
                    <TransformarTabla />
                  }
                />
                <Route
                  path="/imprimirResumen/:curso"
                  element={
                    <ImprimirHTML />
                  }
                />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </Routes>
          </UserConfigProvider>
        </HistorialProvider>
      </DataProvider>
    </AuthProvider>
  )
}

function Layout() {
  return (
    <>
    <Nav />
    <MenuDesplegable/>
      <Suspense>
        <Outlet />
      </Suspense>

    </>
  )
}