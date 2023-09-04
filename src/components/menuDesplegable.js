import React, { useState, useRef, useContext } from "react";
import style from '../modulos-css/menuDesplegable.module.css'
import { Perfil } from "./Perfil";
import { useAuth } from "../context/AuthContext";

export function MenuDesplegable() {

  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const menuRef = useRef(null);
  const menuCerrarRef = useRef(null);
  //const menuAbrirRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMouseDown = (e) => {
    setStartX(e.pageX);
    setCurrentX(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (startX !== null) {
      setCurrentX(e.pageX);
      setOffsetX(e.pageX - startX);
      if (menuOpen && (e.pageX - startX) < 0) {
        menuRef.current.style.transform = `translateX(${offsetX}px)`;
        menuCerrarRef.current.style.transform = `translateX(${offsetX}px)`;
      }
      else if (!menuOpen && (e.pageX - startX) < 250) {
        menuRef.current.style.transform = `translateX(${offsetX + 40}px)`;
        //menuAbrirRef.current.style.transform = `translateX(${offsetX + 40}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    if (offsetX > 15) {
      setMenuOpen(true);
    } else if (offsetX < -50) {
      setMenuOpen(false);
    }
    setStartX(null);
    setCurrentX(null);
    setOffsetX(0);
    if (menuOpen) {
      menuCerrarRef.current.style.transform = "";
    }
    menuRef.current.style.transform = "";

    //menuAbrirRef.current.style.transform = "";
  };

  return (
    <div >
      {user &&
        <>
          <div
            className={menuOpen ? style.menuOpen : style.menu}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={menuRef}
          >
            <Perfil />

          </div>

          <button
            id="abrirMenu"
            className={style.abrirMenu}
            onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 6l16 0"></path>
              <path d="M4 12l16 0"></path>
              <path d="M4 18l16 0"></path>
            </svg>
          </button>

        </>
      }
    </div>
  );
}


