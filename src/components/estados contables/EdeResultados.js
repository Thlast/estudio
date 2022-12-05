import {Link} from "react-router-dom";
import React from 'react';


export function EdeResultados() {



return (
  <div>
    <Link
    className='volver'
    to={"/estados-contables"}>{"< "}Modelos contables</Link>
    <h1>Estado de resultados (RT: 9)</h1>
    <table>
      <th></th>
      <th>Actual</th>
      <th>Anterior</th>
    <tr><strong>Resultados de las operaciones que continúan<a href="#section1">(1)</a></strong><td></td><td></td></tr>
    <tr><td>Ventas netas de bienes y servicios (anexo …)</td><td></td><td></td></tr>
    <tr><td>Costo de los bienes vendidos y servicios prestados</td><td></td><td></td></tr>
    <tr><td>Ganancia (Pérdida) bruta</td><td></td><td></td></tr>
    <tr><td>Resultados por valuación de bienes de cambio al valor neto de realización (anexo …)<a href="#section1">(2)</a></td><td></td><td></td></tr>
    <tr><td>Gastos de comercialización (anexo …)</td><td></td><td></td></tr>
    <tr><td>Gastos de administración (anexo …)</td><td></td><td></td></tr>
    <tr><td>Otros gastos (anexo ...)</td><td></td><td></td></tr>
    <tr><td>Resultados de inversiones en entes relacionados (nota …)</td><td></td><td></td></tr>
    <tr><td>Depreciación de la llave de negocio<a href="#section1">(3)</a></td><td></td><td></td></tr>
    <tr><td>Resultados financieros y por tenencia:<a href="#section1">(4)</a></td><td></td><td></td></tr>
    <tr><td>- Generados por activos (nota …)</td><td></td><td></td></tr>
    <tr><td>- Generados por pasivos (nota …)</td><td></td><td></td></tr>
    <tr><td>Otros ingresos y egresos (nota …)</td><td></td><td></td></tr>
    <tr><td>Ganancia (Pérdida) antes del impuesto a las ganancias</td><td></td><td></td></tr>
    <tr><td>Impuesto a las ganancias (nota …)</td><td></td><td></td></tr>
    <tr><td>Ganancia (Pérdida) ordinaria de las operaciones que continúan</td><td></td><td></td></tr>
    <tr><strong>Resultados por las operaciones en descontinuación1</strong><td></td><td></td></tr>
    <tr><td>Resultados de las operaciones (nota ... )<a href="#section1">(5)</a></td><td></td><td></td></tr>
    <tr><td>Resultados por la disposición de activos y liquidación de deudas (nota ... )<a href="#section1">(5)</a></td><td></td><td></td></tr>
    <tr><td>Ganancia (Pérdida) por las operaciones en descontinuación</td><td></td><td></td></tr>
    <tr><strong>Participación de terceros en sociedades controladas (nota … ) <a href="#section1">(3)</a></strong><td></td><td></td></tr>
    <tr><td>Ganancia (Pérdida) de las operaciones ordinarias</td><td></td><td></td></tr>
    <tr><strong>Resultados de las operaciones extraordinarias (nota …)<a href="#section1">(6)</a></strong><td></td><td></td></tr>
    <tr><td>Ganancia (Pérdida) del ejercicio</td><td></td><td></td></tr>
    <hr></hr>
    <tr><strong>Resultado por acción ordinaria</strong></tr>
    <tr><td>Básico:</td><td></td><td></td></tr>
    <tr><td>Ordinario</td><td></td><td></td></tr>
    <tr><td>Total</td><td></td><td></td></tr>
    <tr><td>Diluido:</td><td></td><td></td></tr>
    <tr><td>Ordinario</td><td></td><td></td></tr>
    <tr><td>Total</td><td></td><td></td></tr>
    </table>
    <hr></hr>
    <div>
      <h4>Notas:</h4>
    <p id="section1">1) No se requiere la inclusión de este título cuando no existen operaciones en discontinuación</p>
    <p id="section2">2) En esta línea se incluyen los resultados enunciados en la sección B.4. del Capítulo IV (Estado de resultados) de la Resolución Técnica Nº 9</p>
    <p id="section3">3) Conceptos que corresponden al Estado de Resultados Consolidado. De existir resultados extraordinarios en las sociedades controladas deberá exponerse separadamente la porción ordinaria y la extraordinaria correspondiente a la participación de terceros.</p>
    <p id="section4">4) Pueden exponerse en una sola línea. En el caso de que se opte por presentar la información con un mayor grado de detalle, se podrá optar por incluirla en una línea con referencia a la información complementaria, o exponerla detalladamente en el cuerpo del estado.</p>
    <p id="section5">5) Debe discriminarse el impuesto a las ganancias relacionado con estos conceptos.</p>
    <p id="section6">6) Pueden exponerse en una línea, neto del impuesto a las ganancias, con referencia a la información complementaria, o exponerse detalladamente en el cuerpo del estado, discriminando el impuesto a las ganancias correspondiente.</p>
    </div>
  </div>

    );
  }

