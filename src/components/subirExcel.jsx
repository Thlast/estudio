import React, { useState } from 'react';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  const [separador, setSeparador] = useState("")
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('archivoExcel', file);

    try {
      const response = await fetch(`${urlserverSQL}/subirArchivo/${separador}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const contentDisposition = response.headers.get('content-disposition');


        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        let filename = 'nuevoArchivo.txt';

        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        // Realizar acciones adicionales después de subir y descargar el archivo
        console.log('Archivo subido y descargado exitosamente');

      } else {
        throw new Error('Error al subir el archivo');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      // Manejo de errores, como mostrar un mensaje al usuario
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='separador' value={separador} onChange={(e) => setSeparador(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Subir Archivo</button>
    </form>
  );
};

export default FileUploadForm;
