import React, { useContext, useEffect, useState } from 'react';
import JSConfetti from 'js-confetti'
import { useAuth } from '../context/AuthContext';
import { modificarConfetti } from './servicios/cursos/datosUser/userConfig';
import { UserConfig } from '../context/UserConfig';

export function ConfettiOptions() {

  const { confetti, obtenerConfettiUsuario } = useContext(UserConfig)
  const jsConfetti = new JSConfetti()
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [desactivar, setDesactivar] = useState(confetti?.estado);
  const { user } = useAuth()
  const handleCheckboxChange = (event) => {

    const { value, checked } = event.target;
    if (checked) {
      setSelectedIcons((prevSelectedIcons) => [...prevSelectedIcons, value]);
    } else {
      setSelectedIcons((prevSelectedIcons) =>
        prevSelectedIcons.filter((icon) => icon !== value)
      );
    }
  };

  const icons = [
    { label: '🌈', value: '🌈' },
    { label: '⚡️', value: '⚡️' },
    { label: '💥', value: '💥' },
    { label: '✨', value: '✨' },
    { label: '💫', value: '💫' },
    { label: '🌸', value: '🌸' }
  ];

  const probarConfetti = () => {
    if (desactivar) {

    } else {
      if (selectedIcons?.length > 0) {
        jsConfetti.addConfetti({ emojis: [...selectedIcons] })
      } else {
        jsConfetti.addConfetti()
      }
    }

  }
  const guardarConfetti = async () => {

    await modificarConfetti(user.uid, selectedIcons, desactivar)
    obtenerConfettiUsuario()
  }

  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      Configura tu confetti:
      <label>
        Desactivado:{" "}
        <input
          checked={desactivar}
          onChange={() => setDesactivar(!desactivar)}
          type="checkbox"
          value={desactivar}
        ></input>
      </label>
      {confetti ?
        <label>
          Actual:{" "}
          {/* <input
            onChange={handleCheckboxChange}
            disabled={desactivar}
            type="checkbox"
            value={confetti}
          /> */}
          {confetti?.emojis}
        </label>
        :
        null
      }
      {icons?.map((icon) => (
        <label key={icon.value}>
          <input
            disabled={desactivar}
            type="checkbox"
            value={icon.value}
            checked={selectedIcons.includes(icon.value)}
            onChange={handleCheckboxChange}
          />
          {icon.label}
        </label>
      ))}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
        <button
          className='boton home-boton'
          onClick={() => probarConfetti()}
        >
          Probar
        </button>
        <button
          className='boton btn-primary'
          onClick={() => guardarConfetti()}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}