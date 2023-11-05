import { buscarPosiblesTotal } from "./buscarPosibles";
import { conciliar } from "./conciliarMovimientos";
import { encontrarSumasPosibles } from "./encontrarPosibles";
import { evaluarCombinaciones } from "./evaluarCombinaciones";

export const botConciliacion = async (resumen, mayorBanco, conciliadosInicial) => {
    const conciliados = [...conciliadosInicial]
    
    const conciliadosResumen = await conciliarResumen(resumen, mayorBanco, conciliados)

    const conciliadosMayor = await conciliarMayor(resumen, mayorBanco, conciliadosResumen)

    const conciliadosDefinitivos = await conciliarResumen(resumen, mayorBanco, conciliadosMayor, true)//BUSCO LOS RESTANTES PARA DIFERENCIAS PERMANENTE

    return conciliadosDefinitivos
}

export const conciliarResumen = async (resumen, mayorBanco, conciliadosInicial, restantes) => {
    const conciliados = [...conciliadosInicial]
    for (let i = 0; i < resumen.length; i++) {
        if (resumen[i].conciliado == false) {
            resumen[i].seleccionado = true;
            const resumenBancarioMontoSeleccionados = (-resumen[i].debe + resumen[i].haber)
            let mayorBancoMontoSeleccionados = 0
            const newNumbers = await buscarPosiblesTotal("mayor", mayorBancoMontoSeleccionados, resumenBancarioMontoSeleccionados, resumen, mayorBanco)
            console.log("newNumbers BOT", newNumbers)
            const targetSum = (-resumenBancarioMontoSeleccionados)
            const posibles = encontrarSumasPosibles(newNumbers, targetSum, 0, 0, []);
            const seleccionadosMayor = []
            const seleccionadosResumen = [resumen[i]]
            const combinacionesEvaluadas = await evaluarCombinaciones(posibles, seleccionadosMayor, seleccionadosResumen)
            console.log("BOT: combinacionesEvaluadas", combinacionesEvaluadas)
            const combinacionesEvaluadasOrdenadas = combinacionesEvaluadas?.sort((a, b) => {
                // Comparamos los valores de puntuación, que están en el último elemento de cada sub-array
                const puntuacionA = a.puntuacion;
                const puntuacionB = b.puntuacion;

                // Ordenamos de forma descendente (mayor a menor)
                return puntuacionB - puntuacionA;
            });

            mayorBancoMontoSeleccionados = -sumarMontosPrimerIndice(combinacionesEvaluadasOrdenadas);
            console.log("La suma de montos en el primer índice es:", mayorBancoMontoSeleccionados);

            const mayorBancoIds = combinacionesEvaluadasOrdenadas[0]?.combinaciones.map(c => c.id) || []
            const mayorBancoValoresSeleccionados = mayorBanco.filter(m => mayorBancoIds?.indexOf(m.id) !== -1);

            console.log("LOS VALORES:", mayorBanco, mayorBancoValoresSeleccionados)

            const agregarEn = "Mayor"
            if (!restantes && combinacionesEvaluadasOrdenadas && combinacionesEvaluadasOrdenadas.length > 0 && combinacionesEvaluadasOrdenadas[0].puntuacion > 0.5) {
                const tratamiendoRealizado = "temporal"
                //console.log("LA PUNTUACION ES MAYOR ENTONCES CONCILIO", combinacionesEvaluadasOrdenadas[0].puntuacion)
                const newConciliado = conciliar(
                    [resumen[i]],
                    mayorBancoValoresSeleccionados || [],
                    resumenBancarioMontoSeleccionados,
                    mayorBancoMontoSeleccionados,
                    tratamiendoRealizado,
                    conciliados,
                    resumen,
                    mayorBanco,
                    agregarEn
                )
                resumen[i].conciliado = true;
                mayorBanco.map(m => {if(mayorBancoIds?.indexOf(m.id) !== -1) {m.conciliado = true}});
                conciliados.push(newConciliado)
            } else if(restantes) {
                const tratamiendoRealizado = "permanente"
                const newConciliado = conciliar(
                    [resumen[i]],
                    mayorBancoValoresSeleccionados || [],
                    resumenBancarioMontoSeleccionados,
                    mayorBancoMontoSeleccionados,
                    tratamiendoRealizado,
                    conciliados,
                    resumen,
                    mayorBanco,
                    agregarEn
                )
                resumen[i].conciliado = true;
                mayorBanco.map(m => {if(mayorBancoIds?.indexOf(m.id) !== -1) {m.conciliado = true}});
                conciliados.push(newConciliado)
            }
            resumen?.map(r => r.seleccionado = false)
        }
    }

    return conciliados
}

const conciliarMayor = async (resumen, mayorBanco, conciliadosInicial) => {
    const conciliados = [...conciliadosInicial]
    for (let i = 0; i < mayorBanco.length; i++) {
        if (mayorBanco[i].conciliado == false) {

            mayorBanco[i].seleccionado = true;
            const mayorBancoMontoSeleccionados = (mayorBanco[i].debe - mayorBanco[i].haber)
            let resumenBancarioMontoSeleccionados = 0
            const newNumbers = await buscarPosiblesTotal("resumen", mayorBancoMontoSeleccionados, resumenBancarioMontoSeleccionados, resumen, mayorBanco)
            console.log("newNumbers BOT", newNumbers)
            const targetSum = (mayorBancoMontoSeleccionados)
            const posibles = encontrarSumasPosibles(newNumbers, targetSum, 0, 0, []);
            const seleccionadosResumen = []
            const seleccionadosMayor = [mayorBanco[i]]
            const combinacionesEvaluadas = await evaluarCombinaciones(posibles, seleccionadosMayor, seleccionadosResumen)
            console.log("BOT: combinacionesEvaluadas", combinacionesEvaluadas)
            const combinacionesEvaluadasOrdenadas = combinacionesEvaluadas?.sort((a, b) => {
                // Comparamos los valores de puntuación, que están en el último elemento de cada sub-array
                const puntuacionA = a.puntuacion;
                const puntuacionB = b.puntuacion;

                // Ordenamos de forma descendente (mayor a menor)
                return puntuacionB - puntuacionA;
            });

            resumenBancarioMontoSeleccionados = sumarMontosPrimerIndice(combinacionesEvaluadasOrdenadas);
            console.log("La suma de montos en el primer índice es:", resumenBancarioMontoSeleccionados);

            const resumenBancoIds = combinacionesEvaluadasOrdenadas[0]?.combinaciones.map(c => c.id) || []
            const resumenBancoValoresSeleccionados = resumen.filter(r => resumenBancoIds?.indexOf(r.id) !== -1);

            console.log("LOS VALORES:", resumen, resumenBancoValoresSeleccionados)

            const tratamiendoRealizado = "temporal"
            const agregarEn = "Mayor"

            const newConciliado = conciliar(
                resumenBancoValoresSeleccionados || [],
                [mayorBanco[i]],
                resumenBancarioMontoSeleccionados,
                mayorBancoMontoSeleccionados,
                tratamiendoRealizado,
                conciliados,
                resumen,
                mayorBanco,
                agregarEn
            )
            mayorBanco[i].conciliado = true;
            resumen.map(r => {if(resumenBancoIds?.indexOf(r.id) !== -1) {r.conciliado = true}});
            conciliados.push(newConciliado)
        }
    }
    return conciliados
}

function sumarMontosPrimerIndice(arr) {
    if (arr.length === 0) {
        return 0; // Devuelve 0 si el array está vacío
    }

    const primerIndice = arr[0];

    if (!primerIndice.combinaciones || primerIndice.combinaciones.length === 0) {
        return 0; // Devuelve 0 si no hay combinaciones en el primer índice
    }

    let sumaMontos = 0;

    for (const combinacion of primerIndice.combinaciones) {
        sumaMontos += combinacion.monto;
    }

    return sumaMontos;
}
