import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ImageUploader = (props) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const { realizarOCR } = props
    // Función para subir imagen desde el dispositivo
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para capturar imagen desde la cámara
    const handleCaptureButtonClick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoTrack = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(videoTrack);
            const photoBlob = await imageCapture.takePhoto();
            setPreviewImage(URL.createObjectURL(photoBlob));
        } catch (error) {
            console.error('Error al capturar la imagen:', error);
        }
    };

    const alertaRealizarOCR = (texto) => {
        Swal.fire({
          title: '¿Reemplazar contenido?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, remplazar!',
          cancelButtonText: 'No, agregar y MANTENER lo anterior!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            // Lógica para reemplazar el contenido
            realizarOCR(texto, true)
            Swal.fire('Reemplazado!', '', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Lógica para mantener el contenido anterior y agregar el nuevo
            realizarOCR(texto, false)
            Swal.fire('Agregado', '', 'success');
          }
        });
      };

    // Función para realizar OCR en la imagen
    const performOCR = async () => {
        try {
            const result = await Tesseract.recognize(
                previewImage,
                'spa',
                { logger: m => console.log(m) }
            );
            setRecognizedText(result.data.text);
            alertaRealizarOCR(result.data.text)

        } catch (error) {
            console.error('Error al realizar OCR:', error);
        }
    };

    return (
        <div className='form'>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange} />
            <button
                className='home-boton'
                onClick={handleCaptureButtonClick}>
                Capturar
            </button>
            <button
                className='home-boton'
                onClick={performOCR}>
                Realizar OCR
            </button>
            {previewImage &&
                <img src={previewImage} alt="Vista previa de la imagen" style={{ maxWidth: '300px' }} />
            }
            {/* {recognizedText &&
                <div>
                    {recognizedText}
                </div>
            } */}
        </div>
    );
};

export default ImageUploader;
