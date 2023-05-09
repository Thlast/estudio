import { useEffect, useState } from "react";
import { articulosImpuestoALasGanancias, getSectionById } from "./constantesarticulos"
export function Articulos(props) {

  const { articulo } = props;
  const [sectionHtml, setSeccionHtml] = useState("")

  function formatArticleId(str) {

    const id = str.match(/\d+$/);
    const paddedId = id ? id[0].padStart(4, '0') : '0000';
    return `articulo${paddedId}____`;
  }
  useEffect(() => {
    setSeccionHtml(getSectionById(articulosImpuestoALasGanancias, `${formatArticleId(articulo)}`))
  }, [articulo])


  return (
    <>
    <blockquote>Link a la ley:
        <em
          style={{ textDecoration: "underline" }}>
          <a
            target="_blank"
            href={`http://biblioteca.afip.gob.ar/dcp/LEY_C_020628_2019_12_05#${formatArticleId(articulo)}`}>
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