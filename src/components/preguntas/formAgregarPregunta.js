import React, { useState, useEffect } from 'react';

export function FormAgregarPregunta(props) {

    const {titulo} = props;
    const {crearPregunta} = props;
    const {seccion} = props;
    const {curso} = props;
    const [preg, setPreg] = useState();
    const [resp, setResp] = useState();
    const [mat, setMat] = useState(curso);
		const [tipo, setTipo] = useState("Normal");
    const [a, setA] = useState();
    const [b, setB] = useState();
    const [c, setC] = useState();
    const [d, setD] = useState();
    const [opciones, setOpciones] = useState({
      a: a,
      b: b,
      c: c,
      d: d
    })
    const [correcta, setCorrecta] = useState("a");
      
      const cambiarTipo = (t) => {
        setTipo(t);
        if(t == "multiple") {
          setCorrecta("a")
        }
      }
  
    const limpiarPregunta = () => {
      setPreg("");
      setResp("");
      setTipo("Normal");
      setA("");
      setB("");
      setC("");
      setD("");
      setCorrecta("a")
    }
    return (
      <div>
  
      <form
      className='form-container'
      onSubmit={
        (event) => 
        (crearPregunta(mat, tipo, preg, resp, curso, a,b,c,d, correcta, seccion, titulo, event), 
        limpiarPregunta())}>
        <select required onChange={ e => setMat(e.target.value)} class="home-boton" for="materias" value={mat}>
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
            class="boton btn-primary" 
            >
            Agregar
          </button>            
          </form>
    </div>
    );
  }
