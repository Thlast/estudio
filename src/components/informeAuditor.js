import React from 'react';
import { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import informeAuditor from './dataInformes/informeAuditor.json'
import modulosinformeAuditor from './dataInformes/modulosInformeAuditor.json'
import style from '../modulos-css/informeAuditor.module.css'

export function InformeAuditor(props) {

  const [opciones, setOpciones] = useState();
  const [informe, setInforme] = useState();
  const [tipoInfo, setTipoInfo] = useState("CC");
  const [indice, setIndice] = useState(0);
  const [trabajo, setTrabajo] = useState(informeAuditor[indice]);
  const [modelo, setModelo] = useState(modulosinformeAuditor)
  const [casosModelo, setCasosModelo] = useState()
  const [casoSeleccionado, setCasoSeleccionado] = useState("Modelo Base")
  const [noHay, setNoHay] = useState("")
  const { recargarFuncionClickcode } = props;

  //inicial
  useEffect(() => {

    cambiarInforme("")
    setOpciones(modulosinformeAuditor[indice])
    setTrabajo(informeAuditor[indice]);

    document.getElementById('opinionTitulo').innerHTML = informeAuditor[indice].opinion
    document.getElementById('fundamentoTitulo').innerHTML = informeAuditor[indice].fundamento
    document.getElementById('opinionTexto').innerHTML = ""
    document.getElementById('fundamentoTexto').innerHTML = ""

    document.getElementById('titulo').innerHTML = informeAuditor[indice].titulo
    document.getElementById('destinatarioEncabezado').innerHTML = informeAuditor[indice].destinatario.encabezado
    document.getElementById('destinatarioCuit').innerHTML = informeAuditor[indice].destinatario.cuit
    document.getElementById('destinatarioDomicilio').innerHTML = informeAuditor[indice].destinatario.domicilio
    document.getElementById('enfuncionamiento').innerHTML = informeAuditor[indice].enfuncionamiento
    document.getElementById('enfasis').innerHTML = informeAuditor[indice].enfasis
    document.getElementById('otrainfo').innerHTML = informeAuditor[indice].otrainfo
    document.getElementById('otrascuestiones').innerHTML = informeAuditor[indice].otrascuestiones
    document.getElementById('responsabilidadesDir').innerHTML = informeAuditor[indice].responsabilidadesDir
    document.getElementById('responsabilidadesAuditor').innerHTML = informeAuditor[indice].responsabilidadesAuditor
    document.getElementById('informeRequerimientos').innerHTML = informeAuditor[indice].informeRequerimientos
    document.getElementById('lugarFecha').innerHTML = informeAuditor[indice].lugarFecha
    document.getElementById('idAuditor').innerHTML = informeAuditor[indice].idAuditor

    if (recargarFuncionClickcode) {
      recargarFuncionClickcode()
    }

  }, [indice])

  useEffect(() => {

    modelo[indice].caso.map(i => {
      if (i.modelo == informe) {
        if (tipoInfo == "CC" || informe == "informe favorable" || (i.casos[casoSeleccionado - 1]?.opinionX0.titulo == "")) {

          //modelo general CC
          document.getElementById('opinionTitulo').innerHTML = i.contenido.opinion.titulo
          document.getElementById('opinionTexto').innerHTML = i.contenido.opinion.texto
          document.getElementById('fundamentoTitulo').innerHTML = i.contenido.fundamento.titulo
          document.getElementById('fundamentoTexto').innerHTML = i.contenido.fundamento.texto
          document.getElementById('opinionECC').style.display = "none";
          document.getElementById('fundamentoECC').style.display = "none";

          setCasosModelo(i.casos)
          //casos especificos
          if (i.casos[casoSeleccionado - 1]?.otrascuestiones) {
            //si tiene parrafo lo renderizo
            document.getElementById('otrascuestiones').innerHTML = i.casos[casoSeleccionado - 1].otrascuestiones
          } else {
            //si no tiene vuelvo al modelo base
            document.getElementById('otrascuestiones').innerHTML = trabajo.otrascuestiones
          }

          if (i.casos && casoSeleccionado !== "Modelo Base") {
            // Object.keys(i.casos[casoSeleccionado-1]).map(a => {
            //   console.log(i.casos[casoSeleccionado-1][a])
            // })
            document.getElementById('casosModelo').innerHTML = i.casos[casoSeleccionado - 1].informacion
            document.getElementById('opinionTitulo').innerHTML = i.casos[casoSeleccionado - 1].opinion.titulo
            document.getElementById('opinionTexto').innerHTML = i.casos[casoSeleccionado - 1].opinion.texto
            document.getElementById('fundamentoTitulo').innerHTML = i.casos[casoSeleccionado - 1].fundamento.titulo
            document.getElementById('fundamentoTexto').innerHTML = i.casos[casoSeleccionado - 1].fundamento.texto
          }
        } else if (tipoInfo == "ECC") {

          //modelo general CC
          if (i.contenido.opinionX1) {

            document.getElementById('opinionECC').style.display = "block";
            document.getElementById('fundamentoECC').style.display = "block";
            document.getElementById('opinionTitulo').innerHTML = i.contenido.opinionX0.titulo
            document.getElementById('opinionTexto').innerHTML = i.contenido.opinionX0.texto
            document.getElementById('fundamentoTitulo').innerHTML = i.contenido.fundamentoX0.titulo
            document.getElementById('fundamentoTexto').innerHTML = i.contenido.fundamentoX0.texto
            //año x+1
            document.getElementById('opinion2Titulo').innerHTML = i.contenido.opinionX1.titulo
            document.getElementById('opinion2Texto').innerHTML = i.contenido.opinionX1.texto
            document.getElementById('fundamento2Titulo').innerHTML = i.contenido.fundamentoX1.titulo
            document.getElementById('fundamento2Texto').innerHTML = i.contenido.fundamentoX1.texto
          } else {
            setNoHay("ECC")
            alert(`no disponible para ECC`)
          }

          //casos especificos
          setCasosModelo(i.casos)
          if (i.casos && casoSeleccionado !== "Modelo Base") {
            if (i.casos[casoSeleccionado - 1].opinionX1) {
              document.getElementById('casosModelo').innerHTML = i.casos[casoSeleccionado - 1].informacion

              document.getElementById('opinionTitulo').innerHTML = i.casos[casoSeleccionado - 1].opinionX0.titulo
              document.getElementById('opinionTexto').innerHTML = i.casos[casoSeleccionado - 1].opinionX0.texto

              document.getElementById('fundamentoTitulo').innerHTML = i.casos[casoSeleccionado - 1].fundamentoX0.titulo
              document.getElementById('fundamentoTexto').innerHTML = i.casos[casoSeleccionado - 1].fundamentoX0.texto
              //año+1
              document.getElementById('opinion2Titulo').innerHTML = i.casos[casoSeleccionado - 1].opinionX1.titulo
              document.getElementById('opinion2Texto').innerHTML = i.casos[casoSeleccionado - 1].opinionX1.texto
              document.getElementById('fundamento2Titulo').innerHTML = i.casos[casoSeleccionado - 1].fundamentoX1.titulo
              document.getElementById('fundamento2Texto').innerHTML = i.casos[casoSeleccionado - 1].fundamentoX1.texto
            } else {

              alert(`no disponible para ECC`)
            }

          }
        }
      }

    })
    if (casoSeleccionado !== "Modelo Base") {
      document.getElementById('casosModelo').style.display = "block";
    } else {
      document.getElementById('casosModelo').style.display = "none";
    }

    if (document.getElementById('infoComparativa')) {
      document.getElementById('infoComparativa').innerHTML = tipoInfo == "ECC" ? "Estados Comparativos" : "Cifras Correspondientes";

    }

  }, [informe, tipoInfo, casoSeleccionado])

  const cambiarInforme = (valor) => {
    setInforme(valor)
    setCasoSeleccionado("Modelo Base")
    document.getElementById('casosModelo').style.display = "none";
  }

  console.log(informe)
  return (
    <>

      <div className={style.contenedor}>
        <select
          onChange={(e) => setIndice(e.target.value)}>
          {informeAuditor?.map(t => {
            return (
              <option
                value={t.indice}
              >
                {t.seccion}: {t.modelo}
              </option>
            )
          })
          }
        </select>

        <p>Seccion {informeAuditor[indice].seccion} - {informeAuditor[indice].modelo}</p>
        <select
          onChange={(e) => cambiarInforme(e.target.value)}
        >
          <option
            //disabled
            selected={informe == "" ? true : false}
            value={""}>
            Elegir informe
          </option>
          {/* tipos de opinion */}
          {opciones?.caso.map(m => {
            return (
              <option>
                {m.modelo}
              </option>
            )
          })}
        </select>
        <select
          value={casoSeleccionado}
          onChange={(e) => setCasoSeleccionado(e.target.value)}>
          <option

            selected>
            Modelo Base
          </option>
          {/* casos dentro del mismo tipo de opinion */}
          {casosModelo?.map((c) => {
            return (
              <option
                value={c.numero}
              >
                {c.descripcion}
              </option>
            )
          })}
        </select>

        <div>
          <label for="tipoCC">
            <input
              id='tipoCC'
              value={tipoInfo}
              onChange={(e) => setTipoInfo("CC")}
              name='tipoInfo'
              type="radio" />

            Cifras Correspondientes
          </label>

          <>
            <label for="tipoECC">
              <input
                id='tipoECC'
                value={tipoInfo}
                onChange={(e) => setTipoInfo("ECC")}
                name='tipoInfo'
                type="radio" />

              Estados Contables Comparativos
            </label>
          </>


        </div>
        <div
          id='casosModelo'>

        </div>
        <div className='informeAuditoria'>
          <div id='titulo'>
          </div>
          <div id='destinatarioEncabezado'>
          </div>
          <div id='destinatarioCuit'>
          </div>
          <div id='destinatarioDomicilio'>
          </div>

          <div
            id='opinionECC'>
            <h1 id='opinion2Titulo'></h1>
            <div id='opinion2Texto'></div>
          </div>

          <h1 id='opinionTitulo'></h1>
          <div id='opinionTexto'></div>

          <div
            id='fundamentoECC'>
            <h1 id='fundamento2Titulo'></h1>
            <div id='fundamento2Texto'></div>
          </div>

          <h1 id='fundamentoTitulo'></h1>
          <div id='fundamentoTexto'></div>



          <div id='enfuncionamiento'>

          </div>
          <div id='enfasis'>

          </div>
          <div id='otrainfo'>

          </div>
          <div id='otrascuestiones'>

          </div>
          <div id='responsabilidadesDir'>

          </div>
          <div id='responsabilidadesAuditor'>

          </div>
          <div id='informeRequerimientos'>

          </div>
          <div id='lugarFecha'>

          </div>
          <div id='idAuditor'>

          </div>
        </div>

        <hr></hr>
      </div>
    </>
  )
}