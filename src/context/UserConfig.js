import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { obtenerConfetti } from "../components/servicios/cursos/datosUser/userConfig";

export const UserConfig = React.createContext({})

export function UserConfigProvider({ children }) {

  const [mobile, setMobile] = useState(window.innerWidth <= 500)
  const [confetti, setConfetti] = useState()
  const { user } = useAuth()

  const obtenerConfettiUsuario = async () => {
    await obtenerConfetti(user?.uid).then(data => {
      setConfetti(data[0])
    })
  }

  //funcion para detectar si es mobile
  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth <= 770);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //cambio de tema
  const selectedTheme = localStorage.getItem('selected-theme')

  useEffect(() => {
    checkTema()
    if (user) {
      obtenerConfettiUsuario()
    }
  }, [user])

  const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? 'dark' : 'light'

  const checkTema = () => {
    const userHasDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (selectedTheme) {
      // Si se cumple la validación, preguntamos cuál fue el tema para saber si activamos o desactivamos el dark
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove']('dark-theme')
    } else {
      // Preguntamos si el usuario tiene tema dark en su sistema
      // En caso de que sí, lo activamos en la interfaz
      if (userHasDarkTheme) document.body.classList.add('dark-theme')
    }

  }
  const switchTema = () => {
    document.body.classList.toggle('dark-theme')
    // Guardamos el tema actual que eligió el usuario
    localStorage.setItem('selected-theme', getCurrentTheme())
  }
 
  return (
    <UserConfig.Provider value={{
      obtenerConfettiUsuario,
      confetti,
      mobile,
      switchTema
    }}>
      {children}
    </UserConfig.Provider>
  )
}