import { alertafail, alertainfo, alertasuccess } from "../../../alertas";
import { getLiquidacion } from "../../../servicios/liquidacionesServicios/getLiquidaciones";

export async function verificarTotales(solucionEnviada) {
    try {
        const resultados = {};
        let cantidadTest = 0;
        let cantidadCorrectas = 0;

        const solucionCorrecta = await getLiquidacion("650b525f91183df5caa3ba46").then(data => {
            return data[0];
        });

        for (const categoria in solucionEnviada) {
            const info = solucionEnviada[categoria];
            const totalCalculado = info.total || 0;
            // Compara el total calculado con el total esperado y crea una respuesta
            if (totalCalculado === solucionCorrecta[categoria]?.total) {
                cantidadTest += 1;
                resultados[categoria] = 'Correcto';
                cantidadCorrectas += 1;
            } else if (categoria === "id") {
                // Puedes hacer algo específico si la categoría es "id"
            } else {
                cantidadTest += 1;
                resultados[categoria] = 'Incorrecto';
            }
        }

        if (cantidadCorrectas === cantidadTest) {
            alertasuccess(`${cantidadCorrectas}/${cantidadTest}`);
        } else {
            alertafail(`${cantidadCorrectas}/${cantidadTest}`);
        }

        return { resultados: resultados, correctas: cantidadCorrectas, tests: cantidadTest };
    } catch (error) {
        throw new error
    }
}
