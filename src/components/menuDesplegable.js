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
          {menuOpen ?
            <button
              ref={menuCerrarRef}
              className={style.cerrarMenu}
              onClick={toggleMenu}>{"<"}
            </button>
            :
            <button
              id="abrirMenu"
              className={style.abrirMenu}
              onClick={toggleMenu}>{">"}
            </button>
          }
        </>
      }
    </div>
  );
}


