import { G1FAGanancias, G1FADeduccionesEspeciales, G2FAGanancias, G2FADeduccionesEspeciales, G3FADeduccionesEspeciales, G4FAGanancias, DeduccionesEspecialesComunes } from "./liquidaciones/categoriasConceptos";
const deduccionesGeneralesFijo = [
    "INTERESES, ACTUALIZACIONES Y GASTOS ORIGINADOS POR DEUDAS",
    "SEGUROS PARA CASOS DE MUERTE",
    "CONTRIBUCIONES",
    "AMORTIZACIONES DE BIENES INMATERIALES",
    "EN CONCEPTO DE ALQUILER DE INMUEBLE DESTINADO A CASA HABITACIÓN",
    "APORTES A PLANES DE SEGURO DE RETIRO PRIVADOS",
    "SERVICIO DOMESTICO",
]
const deduccionesGeneralesVariable = [
    "DONACIONES",
    "APORTES OBLIGATORIOS PARA OBRAS SOCIALES Y CUOTAS O ABONO POR COBERTURA MÉDICO-ASISTENCIAL",
    "HONORARIOS POR SERVICIO DE ASISTENCIA SANITARIA MÉDICA Y PARAMÉDICA",
]

const inicializarConceptos = (nombresConceptos) => {

    const conceptos = nombresConceptos || ["concepto"]
    return conceptos?.map(nombre => ({
        nombre,
        importe: 0
    }));
};
const valoresPorDefecto = { nombre: "concepto", importe: 0 }

export const liquidacionInicialDefault = {
    G1FA: {
        conceptos: inicializarConceptos(G1FAGanancias),
        deducciones: inicializarConceptos(G1FADeduccionesEspeciales),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 44", "Articulo 89", "Articulo 90", "Articulo 86"],
        total: 0
    },
    G2FA: {
        conceptos: inicializarConceptos(G2FAGanancias),
        deducciones: inicializarConceptos(G2FADeduccionesEspeciales),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 48", "Articulo 90", "Articulo 86"],
        total: 0
    },
    G3FA: {
        conceptos: inicializarConceptos(G3FADeduccionesEspeciales),
        deducciones: inicializarConceptos(G3FADeduccionesEspeciales),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 53", "Articulo 91", "Articulo 86"],
        total: 0
    },
    G4FA: {
        conceptos: inicializarConceptos(G4FAGanancias),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 82", "Articulo 86"],
        total: 0
    },
    DeduccionesGenerales: {
        conceptos: inicializarConceptos(deduccionesGeneralesFijo),
        articulos: ["Articulo 85", "Articulo 189"],
        total: 0
    },
    DeduccionesGeneralesFE: {
        conceptos: inicializarConceptos(deduccionesGeneralesFijo),
        articulos: ["Articulo 160", "Articulo 85", "Articulo 189"],
        total: 0
    },
    DeduccionesGeneralesConLimite: {
        conceptos: inicializarConceptos(deduccionesGeneralesVariable),
        articulos: ["Articulo 85", "Articulo 189"],
        total: 0
    },
    G1FE: {
        conceptos: inicializarConceptos(G1FAGanancias),
        deducciones: inicializarConceptos(G1FADeduccionesEspeciales),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 44", "Articulo 89", "Articulo 90", "Articulo 86", "Articulo 136", "Articulo 160"],
        total: 0
    },
    G2FE: {
        conceptos: inicializarConceptos(G2FAGanancias),
        deducciones: inicializarConceptos(G2FADeduccionesEspeciales),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 48", "Articulo 90", "Articulo 86", "Articulo 137", "Articulo 160"],
        total: 0
    },
    G3FE: {
        conceptos: inicializarConceptos(G3FADeduccionesEspeciales),
        deducciones: inicializarConceptos(G3FADeduccionesEspeciales),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 53", "Articulo 91", "Articulo 86", "Articulo 144", "Articulo 160"],
        total: 0
    },
    G4FE: {
        conceptos: inicializarConceptos(G4FAGanancias),
        deduccionesComunes: inicializarConceptos(DeduccionesEspecialesComunes),
        articulos: ["Articulo 82", "Articulo 86", "Articulo 157", "Articulo 158", "Articulo 160"],
        total: 0
    },
    GananciaNoImponible: {
        conceptos: inicializarConceptos(["GananciaNoImponible"]),
        articulos: ["Articulo 30"],
        total: 0
    },
    Cargasdefamilia: {
        conceptos: inicializarConceptos(["Cargasdefamilia"]),
        articulos: ["Articulo 30"],
        total: 0
    },
    DeducciónEspecial: {
        conceptos: inicializarConceptos(["DeducciónEspecial"]),
        articulos: ["Articulo 30"],
        total: 0
    },
    QuebrantosAnteriores: {
        conceptos: inicializarConceptos(["QuebrantosAnteriores"]),
        articulos: ["Articulo 25", "Articulo 74 DR", "Articulo 75 DR"],
        total: 0
    },
    QuebrantosAnterioresFE: {
        conceptos: inicializarConceptos(["QuebrantosAnterioresFE"]),
        articulos: ["Articulo 25", "Articulo 74 DR", "Articulo 75 DR", "Articulo 131", "Articulo 132", "Articulo 133"],
        total: 0
    },
    accionesFE: {
        conceptos: inicializarConceptos(["accionesFE"]),
        articulos: [],
        total: 0
    },
    inmueblesFE: {
        conceptos: inicializarConceptos(["inmueblesFE"]),
        articulos: [],
        total: 0
    },
    quebrantosEspecificosFE: {
        conceptos: inicializarConceptos(["quebrantosEspecificosFE"]),
        articulos: [],
        total: 0
    },
    deduccionesGeneralesFEespecifico: {
        conceptos: inicializarConceptos(["deduccionesGeneralesFEespecifico"]),
        articulos: ["Articulo 85", "Articulo 189"],
        total: 0
    },
    dividendos2018: {
        conceptos: inicializarConceptos(["dividendos2018"]),
        articulos: ["Artículo 97"],
        total: 0
    },
    dividendos2021: {
        conceptos: inicializarConceptos(["dividendos2021"]),
        articulos: ["Artículo 97"],
        total: 0
    },
    cedularTítulosSinAjuste: {
        conceptos: inicializarConceptos(["Titulos sin clausula de ajuste"]),
        // deducciones: inicializarConceptos(["cedularDeduccionEspecial"]),
        articulos: ["Articulo 98", "Artículo 100", "Artículo 262 DR"],
        total: 0
    },
    cedularConAjusteyMonedaDigital: {
        conceptos: inicializarConceptos(["Titulos con clausula de ajuste", "Moneda Digital"]),
        // deducciones: inicializarConceptos(["cedularDeduccionEspecial"]),
        articulos: ["Articulo 98", "Artículo 100", "Artículo 262 DR"],
        total: 0
    },
    cedularAcciones: {
        conceptos: inicializarConceptos(["cedularAcciones"]),
        articulos: ["Articulo 98"],
        total: 0
    },
    cedularDeduccionEspecialA: {
        conceptos:inicializarConceptos(["cedularDeduccionEspecial"]),
        articulos: ["Artículo 100", "Artículo 262 DR"],
        total: 0
    },
    cedularDeduccionEspecialB: {
        conceptos:inicializarConceptos(["cedularDeduccionEspecial"]),
        articulos: ["Artículo 100", "Artículo 262 DR"],
        total: 0
    },
    cedularInmuebles: {
        conceptos: inicializarConceptos(["cedularInmuebles"]),
        articulos: ["Artículo 99"],
        total: 0
    },
    //QUEBRANTOS DE CEDULAR
    quebrantoCedularInmuebles: {
        conceptos: inicializarConceptos(["quebrantoCedularInmuebles"]),
        articulos: ["Artículo 99"],
        total: 0
    },
    quebrantoCedularTítulosSinAjuste: {
        conceptos: inicializarConceptos(["quebrantoCedularTítulosSinAjuste"]),
        articulos: ["Artículo 99"],
        total: 0
    },
    quebrantoCedularConAjusteyMonedaDigital: {
        conceptos: inicializarConceptos(["quebrantoCedularConAjusteyMonedaDigital"]),
        articulos: ["Artículo 99"],
        total: 0
    },
    quebrantoCedularAcciones: {
        conceptos: inicializarConceptos(["quebrantoCedularAcciones"]),
        articulos: ["Artículo 99"],
        total: 0
    },
    quebrantoDividendos: {
        conceptos: inicializarConceptos(["quebrantoDividendos"]),
        articulos: ["Artículo 97"],
        total: 0
    }

}