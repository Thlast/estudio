import { useEffect, useState } from "react";
import { buscarRT } from "../servicios/consola/buscarRT";
import { Link } from "react-router-dom";
import { buscarArticulo } from "../servicios/consola/buscarArticulo";
import { Spinner } from '../Login/Spinner'
import { CardSkeleton } from "../../modulos-css/esqueletoSeccion";
export function Articulos(props) {

  const { articulo, recargarFuncionClickcode, capituloId } = props;
  const [sectionHtml, setSeccionHtml] = useState("")
  const [linkLey, setLinkLey] = useState("")
  const [linkRT, setLinkRT] = useState("")
  const [cargando, setCargando] = useState(false)

  const linkDR = [
    { ley: "Ganancias", link: "http://biblioteca.afip.gob.ar/dcp/DEC_C_000862_2019_12_06" },
    { ley: "IVA", link: "http://biblioteca.afip.gob.ar/dcp/DEC_C_000692_1998_06_11" },
    { ley: "BsPersonales", link: "http://biblioteca.afip.gob.ar/dcp/DEC_C_000127_1996_02_09" },
  ]
  const linkDeLey = [
    { ley: "Ganancias", link: "http://biblioteca.afip.gob.ar/dcp/LEY_C_020628_2019_12_05" },
    { ley: "IVA", link: "http://biblioteca.afip.gob.ar/dcp/TOR_C_020631_1997_03_26" },
    { ley: "BsPersonales", link: "http://biblioteca.afip.gob.ar/dcp/TOR_C_023966_1997_03_26" },
  ]

  function formatArticleId(str) {
    str.toLowerCase().replace(/[-º°`'".,]/g, '')

    //DE LA NUEVA FORMA SOLO MANDO EL NUMERO DEL ARTICULO
    if (str.endsWith("dr")) {
      const numeroArticulo = parseInt(str.match(/\d+/)[0]);
      // const formatoArticulo = `articulo${numeroArticulo.toString().padStart(4, "0")}___${numeroArticulo.toString().padStart(2, "0")}_`;
      // return formatoArticulo;
      return numeroArticulo
    }
    else if (str.endsWith("lpt") || str.endsWith("cm")) {
      const id = parseInt(str.match(/\d+/)[0]);
      // const paddedId = id ? id[0].padStart(4, '0') : '0000';
      // return `articulo${paddedId}____`;
      return id
    }
    else {
      const id = str.match(/\d+$/);
      // const paddedId = id ? id[0].padStart(4, '0') : '0000';
      // return `articulo${paddedId}____`;
      return id
    }

  }

  function getRTNumber(input) {
    input.toLowerCase().replace(/[-º°`'".,]/g, '')

    const regex = /^rt\s*(\d+)/i;
    const matches = input.match(regex);
    //console.log(input, matches)
    if (matches && matches.length > 1) {
      //console.log(`RT${matches[1]}`)
      return `rt${matches[1]}`;
    } else {

      return undefined
    }

  }

  const [ley, setLey] = useState()
  useEffect(() => {
    setCargando(true)
    const valorBuscar = articulo.toLowerCase().replace(/[-º°`'".,]/g, '')
    let ley = ""
    switch (capituloId) {
      case "1": ley = "Ganancias"; break;
      case "3": ley = "IVA"; break;
      case "4": ley = "BsPersonales"; break;
      default: ley = "Ganancias";
    }
    //para los que no son decreto
    setLey(ley)

    let patron = /(artículo\s+(\d+)(?:º)?)(?!(\sde\s+la\sLey|\sde\seste\sartículo|\d))/g;


    if (valorBuscar.endsWith("dr")) {
      buscarArticulo(`dr${ley}`, `${formatArticleId(articulo)}`).then(data => {
        let patronDR = /(artículo\s+(\d+)(?:º)?)(?=\s+de\seste\sdecreto\b)/gi
        //setSeccionHtml(data.replace(/artículo\s+(\d+)(?:º)?\s+de\s+la\s+ley/g, '<code>artículo $1</code> de la ley').replace(patronDR, '<code>$1$</code>3'))
        setSeccionHtml(data.replace(/artículo\s+(\d+)(?:º)?\s+de\s+la\s+ley/g, '<code>artículo $1</code> de la ley').replace(patronDR, '<code>$1 dr</code>'))
        setCargando(false)
      })
      //setSeccionHtml(getSectionById(decretoReglamentario, `${formatArticleId(articulo)}`))
      let link = linkDR.filter(l => l.ley === ley).flatMap(l => l.link);
      setLinkLey(link);

    }

    else if (valorBuscar.endsWith("cm")) {
      buscarArticulo(`toConvenioMultilateral`, `${formatArticleId(articulo)}`).then(data => {
        setSeccionHtml(data.replace(patron, '<code>$1 CM</code>'))
          setLey("convenioMultilateral")
          setCargando(false)
          setLinkLey("https://www.ca.gob.ar/convenio-multilateral-menu-pagina-legales")
      })

    }

    else if (valorBuscar.endsWith("lpt")) {
      if (valorBuscar.includes("dr")) {
        buscarArticulo("procedimientoDR", `${formatArticleId(articulo)}`).then(data => {
          setSeccionHtml(data.replace(patron, '<code>$1 DR LPT</code>'))
          setLey("procedimiento tributario")
          setCargando(false)
          setLinkLey("http://biblioteca.afip.gob.ar/dcp/DEC_C_001397_1979_06_12")
        })
      } 
      else {

        buscarArticulo("procedimiento", `${formatArticleId(articulo)}`).then(data => {
          setSeccionHtml(data.replace(patron, '<code>$1 LPT</code>'))
          setLey("procedimiento tributario")
          setCargando(false)
          setLinkLey("http://biblioteca.afip.gob.ar/dcp/TOR_C_011683_1998_07_13")
        })
      }

      //setSeccionHtml(getSectionById(procedimientoTributario, `${formatArticleId(articulo)}`))
    }
    // si tengo una rt
    else if (valorBuscar.startsWith("rt")) {
      buscarRT(getRTNumber(articulo), articulo).then(data => {
        setSeccionHtml(data)
        setLinkRT(`/verRT/${getRTNumber(articulo)}`)
        setCargando(false)
      })

    }
    else {
      buscarArticulo(`to${ley}`, `${formatArticleId(articulo)}`).then(data => {
        setSeccionHtml(data.replace(patron, '<code>$1</code>'))
        setCargando(false)
      })
      //setSeccionHtml(getSectionById(articulosImpuestoALasGanancias, `${formatArticleId(articulo)}`))
      let link = linkDeLey.filter(l => l.ley === ley).flatMap(l => l.link);
      setLinkLey(link);

    }

  }, [articulo])

  useEffect(() => {
    if (!cargando && recargarFuncionClickcode) {
      recargarFuncionClickcode()
    }
  }, [cargando])

  return (
    <>
      {cargando ? <CardSkeleton /> :
        <>
          {linkLey ?
            <>
              <blockquote>Link a la ley:
                <em
                  style={{ textDecoration: "underline" }}>
                  <a
                    target="_blank"
                    //href={`${linkLey}#${formatArticleId(articulo)}`}
                    href={linkLey}
                  >
                    {ley}
                  </a>
                </em>
              </blockquote>
            </>
            :
            null
          }
          {linkRT ?
            <>
              <em
                style={{ textDecoration: "underline" }}>
                <Link
                  to={linkRT}
                >
                  Ver {getRTNumber(articulo)} completa
                </Link>
              </em>
              <hr></hr>
              <p>Indice:{" "}<code>{getRTNumber(articulo)}</code></p>
            </>
            :
            null
          }
          <div
            dangerouslySetInnerHTML={{ __html: `${sectionHtml}` }}
          >
          </div>
        </>
      }
    </>

  )

}