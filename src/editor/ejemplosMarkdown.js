export const ejemplosMarkdown = [
    {
        nombre: "Artículos ganancias",
        explicacion: "Se pueden citar artículos de la ley (texto ordenado y el decreto) dependerá del capitulo en el que se encuentre (IVA, GANANCIAS, BS PERSONALES), por defecto será ganancias:",
        texto: [
            'Ley texto ordenado del respectivo capitulo: `Artículo 2`',
            'Decreto Reglamentario del respectivo capitulo: `Artículo 2 DR`',
            'Ley procedimiento tributario: `Artículo 2 LPT`'
        ],
        curso: "impuestos"
    },
    {
        nombre: "headers",
        explicacion: "",
        texto: [
            '# Titulo: h1',
            '## Titulo: h2',
            '### Titulo: h3',
            '#### Titulo: h4',
            '##### Titulo: h5'
        ]
    },
    {
        nombre: "links",
        explicacion: "Diferentes formas de poner enlaces, las referencias en el ejemplo se añaden en la misma linea pero pueden y deberían agregarse abajo del todo del input para tener mayor claridad.",
        texto: [
            '[Soy un enlace](https://www.google.com)',
            '[Soy un enlace con titulo](https://www.google.com "Googles Homepage")',
            'Link en linea <http://www.example.com>',
            '[Link con REFERENCIA texto][texto de REFERENCIA] \n\n [texto de REFERENCIA]: https://www.mozilla.org',
            '[REFERENCIA numerica link][1] \n\n [1]: http://slashdot.org',
            'O REFERENCIAs con corchete y texto [link text itself]. \n\n [link text itself]: http://www.reddit.com',
            '[link relativo a la sección 2 del capitulo 1](../../1/Impuesto%20a%20las%20ganancias/2)',
            '[link relativo a la sección 19 del capitulo 1 de auditoria](../../../auditoria/11/capitulo1/19)',
            '[link relativo a para transformar en tablas](/texto-a-tabla)',
            '[link relativo a la home](/)'
        ]
    },
    {
        nombre: "imagenes",
        explicacion: "![texto que se ve en caso de no cargar la imagen](link de la imagen 'texto que se ve al dejar el mouse encima')",
        texto: [
            '![texto](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)',
            '![alt text](/favicon.ico "Logo Title Text 1")',
            '![alt text][logo] \n\n luego lo referencias de esta forma: \n\n  [logo]: http://localhost:3000/favicon.ico "Logo Title Text 2"'
        ]
    },
    {
        nombre: "Consola",
        explicacion: "De esta forma se puede pasar texto a la consola para ver más información",
        texto: [
            '`aspecto subjetivo`, `hecho imponible`, `precio de transferencia`',
        ]
    },
    {
        nombre: "Tablas",
        explicacion: "En el siguiente enlace se puede transformar de texto a tabla",
        texto: [
            "[Transformar de texto a tabla en este enlace](/texto-a-tabla)"
        ]
    },
    {
        nombre: "Separadores",
        explicacion: "Tres o más, hay tres opciones (*), (-) o (_):",
        texto: [
            "---",
            "***",
            "___"
        ]
    },
    {
        nombre: "Estilos",
        explicacion: "",
        texto: [
            "párrafo normal",
            "> Esto es una cita.",
            "**bloque destacado**",
            "remarcar *palabra* en un párrafo",
            "~~Tachar palabras.~~"
        ]
    },
    {
        nombre: "Listas",
        explicacion: "",
        texto: [
            "1- No funciona, pero sirve para numerar",
            "1) 1.si no hay espacio de ve el 1.",
            "1. Aca se identa y no se ve la numeración",
            "- Igual al anterior",
            "- - se puede identar mas de una vez"
        ]
    },
    {
        nombre: "Videos de Youtube",
        explicacion: "Con el id del video reemplazar: [![Texto si no carga](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_ACA/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_ACA)",
        texto: [
            "[![Video de](http://img.youtube.com/vi/b7aQqAFio2s/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)"
        ]
    }
] 