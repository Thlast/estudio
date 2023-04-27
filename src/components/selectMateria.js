import { useContext } from 'react';
import { MateriasContext } from '../context/MateriasContext';
import { Spinner } from './Login/Spinner';

export function SelectMateria() {

  const { matPreferida } = useContext(MateriasContext);
  const { materias } = useContext(MateriasContext);
  const { preferenciaMateria } = useContext(MateriasContext);
  const { cargandoMaterias } = useContext(MateriasContext);

  return (
    <>
      {cargandoMaterias ? <Spinner></Spinner> :
        <select
          onChange={(e) => preferenciaMateria(e.target.value)}
          class="boton home-boton"
          value={matPreferida}
          name="curso"
          for="materias">
          {materias.map(a => {
            return (
              <option
                key={"materia-" + a.CursoId}
                value={a.CursoId}>
                {a.CursoNombre}
              </option>
            )
          })
          }
        </select>
      }
    </>
  )
}