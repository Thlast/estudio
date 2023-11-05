import { alertainfo } from "../alertas";
import { v4 as uuidv4 } from 'uuid';

export const conciliar = (resumenBancarioValoresSeleccionados, mayorBancoValoresSeleccionados, resumenBancarioMontoSeleccionados, mayorBancoMontoSeleccionados, tratamiendoRealizado, conciliados, resumenBancario, mayorBanco, agregarEn) => {
    if (resumenBancarioValoresSeleccionados - mayorBancoValoresSeleccionados?.length == 0) {
        alertainfo("Debes seleccionar movimientos para conciliar")
    } else {
        //SI LA DIFERENCIA ES 0
        if (resumenBancarioMontoSeleccionados == mayorBancoMontoSeleccionados) {

            const nuevoConciliado = { tratamiento: "coincidencia", resumen: resumenBancarioValoresSeleccionados, mayor: mayorBancoValoresSeleccionados }

            const indicesResumen = resumenBancarioValoresSeleccionados.map(selectedValue => {
                return resumenBancario.findIndex(v => v.id === selectedValue.id);
            });

            const indicesBanco = mayorBancoValoresSeleccionados.map(selectedValue => {
                return mayorBanco.findIndex(v => v.id === selectedValue.id);
            });

            indicesResumen?.map(ir => { return resumenBancario[ir].conciliado = true, resumenBancario[ir].seleccionado = false })
            indicesBanco?.map(ir => { return mayorBanco[ir].conciliado = true, mayorBanco[ir].seleccionado = false })

            return nuevoConciliado;
        }
        //SI HAY DIFERENCIA. SE AGREGA EL TRATAMIENTO RESPECTIVO
        else {
            //TENGO QUE AGREGAR UNA CONTRA PARTIDA
            const rBancario = [...resumenBancarioValoresSeleccionados]
            const mBanco = [...mayorBancoValoresSeleccionados]
            if (agregarEn == "Mayor") {//TENGO QUE AGREGAR MOVIMIENTO AL MAYOR 
                mBanco.push({
                    conciliado: true,
                    seleccionado: false,
                    id: uuidv4(),
                    fecha: "Ajuste",
                    concepto: `Ajuste: ${tratamiendoRealizado}`,
                    debe: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados < 0 ? -(mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
                    haber: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados > 0 ? (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
                    saldo: ""
                })
            } else {
                rBancario.push({
                    conciliado: true,
                    seleccionado: false,
                    id: uuidv4(),
                    fecha: "Ajuste",
                    concepto: `Ajuste: ${tratamiendoRealizado}`,
                    debe: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados < 0 ? -(mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
                    haber: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados > 0 ? (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
                    saldo: ""
                })
            }
            const nuevoConciliado = { tratamiento: tratamiendoRealizado, resumen: rBancario, mayor: mBanco }

            const indicesResumen = resumenBancarioValoresSeleccionados.map(selectedValue => {
                return resumenBancario.findIndex(v => v.id === selectedValue.id);
            });

            const indicesBanco = mayorBancoValoresSeleccionados.map(selectedValue => {
                return mayorBanco.findIndex(v => v.id === selectedValue.id);
            });

            indicesResumen?.map(ir => { return resumenBancario[ir].conciliado = true, resumenBancario[ir].seleccionado = false })
            indicesBanco?.map(ir => { return mayorBanco[ir].conciliado = true, mayorBanco[ir].seleccionado = false })

            return nuevoConciliado
        }
    }
}