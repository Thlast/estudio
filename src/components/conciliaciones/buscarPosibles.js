export const buscarPosiblesTotal = (buscar, mayorBancoMontoSeleccionados, resumenBancarioMontoSeleccionados, resumenBancario, mayorBanco) => {
//ESTA FUNCION SOLO FILTRA LOS ARRAY EN LOS QUE DEBE BUSCAR PARA LUEGO encontrarPosibles
    const diferencia = (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados)

    if (diferencia < 0) { //
        //console.log("buscar en mayor un DEBE o en resumen un DEBE")
        const buscarResumen = resumenBancario.filter(v => (v.conciliado == false && v.seleccionado == false))
            .map(f => {
                if (f.debe + f.haber !== 0) {

                    //console.log(f.debe, f.haber)          
                    return ({ extracto: f.extracto, id: f.id, fecha: f.fecha, monto: f.haber - f.debe });
                }
            })
            .filter(Boolean);
        const buscarMayor = mayorBanco.filter(v => (v.conciliado == false && v.seleccionado == false))
            .map(f => {
                if (f.debe + f.haber !== 0) {

                    //console.log(f.debe, f.haber)
                    return ({ extracto: f.extracto, id: f.id, fecha: f.fecha, monto: -f.debe + f.haber });
                }
            })
            .filter(Boolean);
        if (buscar == "mayor") {
            return buscarMayor

        } else if (buscar == "resumen") {
            return buscarResumen

        } else {
            return buscarMayor.concat(buscarResumen)

        }

    } else if (diferencia > 0) { //
        console.log("buscar en mayor un HABER o en resumen un HABER")
        const buscarResumen = resumenBancario
            .filter(v => (v.conciliado == false && v.seleccionado == false))
            .map(f => {
                if (f.debe + f.haber !== 0) {

                    return ({ extracto: f.extracto, id: f.id, fecha: f.fecha, monto: f.haber - f.debe });
                }
            })
            .filter(Boolean);
        const buscarMayor = mayorBanco
            .filter(v => (v.conciliado == false && v.seleccionado == false))
            .map(f => {
                if (f.debe + f.haber !== 0) {

                    return ({ extracto: f.extracto, id: f.id, fecha: f.fecha, monto: -f.debe + f.haber });
                }
            })
            .filter(Boolean);

        if (buscar == "mayor") {
            return buscarMayor

        } else if (buscar == "resumen") {
            return buscarResumen

        } else {
            return buscarMayor.concat(buscarResumen)

        }
    }


}