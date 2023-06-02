import { useEffect, useState } from "react";
import { articulosImpuestoALasGanancias, getSectionById } from "./constantesarticulos"
import { decretoReglamentario } from "./decretoReglamentario";
import { procedimientoTributario } from "./procedimientoTributario";
import { getSectionRT, identificarRT } from "./rt53";
import { RT53 } from "./rt53";

export function Articulos(props) {

  const { articulo, recargarFuncionClickcode } = props;
  const [sectionHtml, setSeccionHtml] = useState("")
  const [linkLey, setLinkLey] = useState("")

  function formatArticleId(str) {

    str.toLowerCase().replace(/[-º°`'".,]/g, '')

    if (str.endsWith("dr")) {
      const numeroArticulo = parseInt(str.match(/\d+/)[0]);
      const formatoArticulo = `articulo${numeroArticulo.toString().padStart(4, "0")}___${numeroArticulo.toString().padStart(2, "0")}_`;
      return formatoArticulo;
    }
    else if (str.endsWith("lpt")) {
      const id = str.match(/\d/);
      const paddedId = id ? id[0].padStart(4, '0') : '0000';
      return `articulo${paddedId}____`;
    }
    else {
      const id = str.match(/\d+$/);
      const paddedId = id ? id[0].padStart(4, '0') : '0000';
      return `articulo${paddedId}____`;
    }

  }

  function getRTNumber(input) {
    input.toLowerCase().replace(/[-º°`'".,]/g, '')

    const regex = /^rt\s*(\d+)/i;
    const matches = input.match(regex);
    console.log(input, matches)
    if (matches && matches.length > 1) {
      console.log(`RT${matches[1]}`)
      return `RT${matches[1]}`;
    }

    return '';
  }


  useEffect(() => {
    const valorBuscar = articulo.toLowerCase().replace(/[-º°`'".,]/g, '')

    if (valorBuscar.endsWith("dr")) {
      setSeccionHtml(getSectionById(decretoReglamentario, `${formatArticleId(articulo)}`))
      setLinkLey("http://biblioteca.afip.gob.ar/dcp/DEC_C_000862_2019_12_06")
    }

    else if (valorBuscar.endsWith("lpt")) {
      setSeccionHtml(getSectionById(procedimientoTributario, `${formatArticleId(articulo)}`))
      setLinkLey("http://biblioteca.afip.gob.ar/dcp/TOR_C_011683_1998_07_13")
    }
    // si tengo una rt
    else if (valorBuscar.startsWith("rt")) {
      setSeccionHtml(getSectionRT(getRTNumber(articulo), articulo.toUpperCase()))
    }

    else {
      setSeccionHtml(getSectionById(articulosImpuestoALasGanancias, `${formatArticleId(articulo)}`))
      setLinkLey("http://biblioteca.afip.gob.ar/dcp/DEC_C_000862_2019_12_06")
    }

  }, [articulo])

  useEffect(() => {
    recargarFuncionClickcode()
  }, [sectionHtml])

  const patron = /artículo\s+(\d+)/gi;
  // let resultado = asd.replace(patron, '<code>artículo $1</code>');



  return (
    <>
      {linkLey ?
        <>
          <blockquote>Link a la ley:
            <em
              style={{ textDecoration: "underline" }}>

              <a
                target="_blank"
                href={`${linkLey}#${formatArticleId(articulo)}`}>
                {articulo}
              </a>
            </em>
          </blockquote>
        </>
        :
        null
      }
      <div
        dangerouslySetInnerHTML={{ __html: `${sectionHtml.replace(patron, '<code>artículo $1</code>')}` }}
      >
      </div>

    </>
  )

}