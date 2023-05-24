import { alertasuccess } from "../../../alertas"
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const obtenerConfetti = async (idUser) => {
    const data = await fetch(`${urlserver}/datosUser/confetti/${idUser}`)
    return data.json()
}
// export const modificarConfetti = async (idUser, confetti, estado) => {

//     const url = `${urlserver}/datosUser/actualizarconfetti/${idUser}`;
//     const emojis = []
//     if (confetti) {
//         confetti.map(e => {
//             emojis.push(e)
//         })
//     }

//     let respuesta = {};

//     await fetch(url, {
//         method: 'PUT',
//         body: JSON.stringify({
//             emojis: emojis.join(""),
//             estado: estado
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//         .catch(error => (console.error('Error:', error)))
//         .then(response => (
//             alertasuccess("Modificado", confetti),
//             respuesta = response)
//         )
//     return respuesta
// }
export const modificarConfetti = async (idUser, confetti, estado) => {
    const urlput = `${urlserver}/datosUser/actualizarconfetti/${idUser}`;
    const urlpost = `${urlserver}/datosUser/crearconfetti/${idUser}`;
    const emojis = []
    if (confetti) {
        confetti.map(e => {
            emojis.push(e)
        })
    }
    let respuesta = {};

    try {
        const response = await fetch(urlput, {
            method: 'PUT',
            body: JSON.stringify({
                emojis: emojis.join(''),
                estado: estado
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            alertasuccess('Modificado', {emojis: emojis.join(''), estado: estado});
            respuesta = data;
        } else if (response.status === 404) {
            // No se encontró el registro, crear uno nuevo

            const createResponse = await fetch(urlpost, {
                method: 'POST',
                body: JSON.stringify({
                    emojis: emojis.join(''),
                    estado: estado,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (createResponse.ok) {
                const data = await createResponse.json();
                alertasuccess('Creado', {emojis: emojis.join(''), estado: estado});
                respuesta = data;
            } else {
                console.error('Error al crear el registro:', createResponse.statusText);
            }
        } else {
            console.error('Error al modificar el registro:', response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
    
    return respuesta;
};
