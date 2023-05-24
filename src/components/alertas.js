
import React, { useContext } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
const MySwal = withReactContent(Swal)
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

export const alertasuccess = async (mensaje, confetti) => {
  MySwal.fire({
    icon: 'success',
    title: <p>{mensaje}</p>,
    showConfirmButton: false,
    timer: 1500
  });
  if (!confetti?.estado) {
    if (confetti?.emojis) {
      await jsConfetti.addConfetti({ emojis: [...confetti.emojis] })
      jsConfetti.clearCanvas()
    } else {
      await jsConfetti.addConfetti()
      jsConfetti.clearCanvas()
    }
  }

}

export const alertafail = (mensaje) => {
  MySwal.fire({
    icon: 'error',
    title: <p>{mensaje}</p>,
    showConfirmButton: false,
    timer: 1500
  });
}

export const alertainfo = (mensaje) => {
  MySwal.fire({
    icon: 'info',
    title: <p>{mensaje}</p>,
    showConfirmButton: false,
    timer: 1500
  });
}

export const alertareiniciar = (funcionreiniciar) => {

  swalWithBootstrapButtons.fire({
    title: 'Desea reiniciar el contador?',
    text: "Ya has visto todas las preguntas de esta sección!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, reiniciar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      funcionreiniciar();
      swalWithBootstrapButtons.fire(
        'Reiniciado!',
        'Ya puedes volver a sortear preguntas :)',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'La funcion aleatoria no funcionara :(',
        'error'
      )
    }
  })

}

export const alertaexamen = (eliminar) => {

  swalWithBootstrapButtons.fire({
    title: 'Seguro desea eliminar el examen?',
    text: "Se eliminarán todas las preguntas en este examen, las agregadas se mantendrán en sus respectivas secciones",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar todo!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      eliminar();
      swalWithBootstrapButtons.fire(
        'Eliminado!',
        'navegando a examenes',
        'success'
      );
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'El examen y las preguntas no se han eliminado',
        'error'
      )
    }
  })
}
export const alertaquitar = (funcionquitar, curso) => {

  swalWithBootstrapButtons.fire({
    title: 'Quitar pregunta del examen?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, quitar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      funcionquitar();
      swalWithBootstrapButtons.fire(
        'Se ha quitado la pregunta!',
        '',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'La pregunta continúa en el examen',
        'error'
      )
    }
  })
}

export const alertalimpiarHistorialUsuario = (funcion, curso, user) => {

  swalWithBootstrapButtons.fire({
    title: `Seguro que desea limpiar el historial de ${curso}?`,
    text: "Se borrarán las preguntas contestadas correctamente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Si, eliminar historial de ${curso}`,
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      funcion(curso, user);
      swalWithBootstrapButtons.fire(
        `Se ha limpiado el historial de ${curso}!`,
        '',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        '',
        'error'
      )
    }
  })

}

export const alertareiniciarTabla = (funcionreiniciar) => {

  swalWithBootstrapButtons.fire({
    title: 'Reiniciar?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, reiniciar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      funcionreiniciar();
      swalWithBootstrapButtons.fire(
        'Reiniciado!',
        '',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        '',
        'error'
      )
    }
  })

}