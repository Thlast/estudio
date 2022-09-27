import React, { useState, useEffect } from 'react';


export function FormModificarPregunta(props) {

    const {modificarPregunta} = props;
    const {preguntaModificar} = props || {};

    const [preg, setPreg] = useState(preguntaModificar.pregunta);
    const [resp, setResp] = useState(preguntaModificar.respuesta);
    const [mat, setMat] = useState("Contabilidad VII");
		const [tipo, setTipo] = useState(preguntaModificar.tipo);
    const [idmodif, setIdModif] = useState(preguntaModificar.id);
    const [curso, setCurso] = useState(preguntaModificar.curso);
    const {seccion} = props;
    const [a, setA] = useState(preguntaModificar.opciones.a);
    const [b, setB] = useState(preguntaModificar.opciones.b);
    const [c, setC] = useState(preguntaModificar.opciones.c);
    const [d, setD] = useState(preguntaModificar.opciones.d);
    const [opciones, setOpciones] = useState({
      a: a,
      b: b,
      c: c,
      d: d
    })
    const [correcta, setCorrecta] = useState(preguntaModificar.correcta);
    const {titulo} = props;
    

    const cambiarTipo = (t) => {
        setTipo(t);
        if(t == "multiple") {
          setCorrecta("a")
        }
      }

  
return (
  <div>
  
  <form
  className='form-container'
  onSubmit={
    (event) => modificarPregunta(mat, tipo, preg, resp, curso, a,b,c,d, correcta, idmodif, seccion, titulo, event)}>
    <select required onChange={ e => setMat(e.target.value)} class="home-boton" for="mat" value={mat}>
          <option>
            Contabilidad VII
          </option>
          <option>
            Auditoria
          </option>
          <option>
            Impuestos
          </option>
      </select>     
    <div>
    <select required onChange={ e => cambiarTipo(e.target.value)} class="home-boton" for="tipo" value={tipo}>
          <option>
            Normal
          </option>
          <option>
            Multiple
          </option>
      </select>
    </div>
      <div className="pyr-container">
      <label className="form-pyr" for="pregunta">
        <textarea className="form-pyr" required onChange={ e => setPreg(e.target.value)} placeholder="Escribe una pregunta" name="pregunta" type="text" value={preg}></textarea>
      </label>
      </div>
{tipo == "Multiple" &&
        <div>
          <div
          className='opciones-container'>
          <label class="form-opciones" for="a">
          <span>Opción A:</span>
        <textarea class="" required 
          onChange={ e => setA(e.target.value)} 
          placeholder="Escribe la opcion A" 
          name="pregunta" type="text" 
          value={a}>
        </textarea>
      </label>
      <label class="form-opciones" for="b">
      <span>Opción B:</span>
        <textarea class="" 
          required 
          onChange={ e => setB(e.target.value)} 
          placeholder="Escribe la opcion B" 
          name="pregunta" 
          type="text" 
          value={b}>
        </textarea>
      </label>      
      <label class="form-opciones" for="c">
      <span>Opción C:</span>
        <textarea class="" 
          required 
          onChange={ e => setC(e.target.value)} 
          placeholder="Escribe la opcion C" 
          name="pregunta" 
          type="text" 
          value={c}>
        </textarea>
      </label>
      <label class="" for="d">
      <span>Opción D:</span>
        <textarea class="form-opciones" 
          required 
          onChange={ e => setD(e.target.value)} 
          placeholder="Escribe la opcion D" 
          name="pregunta" 
          type="text" 
          value={d}>
        </textarea>
      </label>
      </div>
      <div>
      <p>Cual es la respuesta correcta?</p>
      <label>
      <select required value={correcta} onChange={ e => setCorrecta(e.target.value)} class="" for="rcorrecta">
          <option>
              a
          </option>
          <option>
              b
          </option>
          <option>
              c
          </option>
          <option>
              d
          </option>
      </select>
      </label>
    </div>
        </div>   
      }
      <p>Respuesta:</p>
      <div className="pyr-container">
      <label className="form-pyr" for="respuesta">
        <textarea className="form-pyr" onChange={ e => setResp(e.target.value)} placeholder="Escribe una respuesta o explicación" name="respuesta" type="text" value={resp}></textarea>
      </label>
      </div>
     <button 
        class="boton btn-primary">       
        Modificar
      </button>    
      </form>
</div>
    );
  }
