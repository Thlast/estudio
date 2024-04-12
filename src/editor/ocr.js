import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import Swal from 'sweetalert2';

const ImageUploader = (props) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const videoRef = useRef(null);

  const { realizarOCR } = props;

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


  // Función para mostrar una alerta antes de realizar OCR
  const alertaRealizarOCR = async (texto) => {
    Swal.fire({
      title: '¿Reemplazar contenido?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, reemplazar!',
      cancelButtonText: 'No, agregar y mantener lo anterior',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para reemplazar el contenido
        realizarOCR(texto, true);
        Swal.fire('Reemplazado!', '', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Lógica para mantener el contenido anterior y agregar el nuevo
        realizarOCR(texto, false);
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
      alertaRealizarOCR(result.data.text);
    } catch (error) {
      console.error('Error al realizar OCR:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        />
      <button 
      className='home-boton'
      onClick={performOCR}>Realizar OCR</button>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay />
      {/* {recognizedText && <div>{recognizedText}</div>} */}
      <br></br>
      {previewImage && <img src={previewImage} alt="Vista previa de la imagen" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default ImageUploader;
