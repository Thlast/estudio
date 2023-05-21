import { useEffect, useState } from "react";
import { articulosImpuestoALasGanancias, getSectionById } from "./constantesarticulos"
import { decretoReglamentario } from "./decretoReglamentario";
import { procedimientoTributario } from "./procedimientoTributario";
export function Articulos(props) {

  const { articulo } = props;
  const [sectionHtml, setSeccionHtml] = useState("")
  const [linkLey, setLinkLey] = useState("")

  function formatArticleId(str) {

    
    if (articulo.endsWith("dr")) {
      const numeroArticulo = parseInt(articulo.match(/\d+/)[0]);
      const formatoArticulo = `articulo${numeroArticulo.toString().padStart(4, "0")}___${numeroArticulo.toString().padStart(2, "0")}_`;
      return formatoArticulo;
    } 
    else if (articulo.endsWith("lpt")) {
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


  useEffect(() => {
    if (articulo.endsWith("dr")) {
      setSeccionHtml(getSectionById(decretoReglamentario, `${formatArticleId(articulo)}`))
      setLinkLey("http://biblioteca.afip.gob.ar/dcp/DEC_C_000862_2019_12_06")
    } else if (articulo.endsWith("lpt")){
      setSeccionHtml(getSectionById(procedimientoTributario, `${formatArticleId(articulo)}`))
      setLinkLey("http://biblioteca.afip.gob.ar/dcp/TOR_C_011683_1998_07_13")
    } else {
      setSeccionHtml(getSectionById(articulosImpuestoALasGanancias, `${formatArticleId(articulo)}`))
      setLinkLey("http://biblioteca.afip.gob.ar/dcp/DEC_C_000862_2019_12_06")
    }

  }, [articulo])


  return (
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
    <div
      dangerouslySetInnerHTML={{ __html: `${sectionHtml}` }}
    >
    </div>
    
    </>
  )

}