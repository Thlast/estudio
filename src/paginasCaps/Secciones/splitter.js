import * as React from "react";
import { useEffect, useRef } from "react";
import "./splitter.css"

export const WindowSplitter = ({ Left, Right }) => {
    // create element ref
    const separatorRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    useEffect(() => {
        const divSeparator = separatorRef.current;
        const divLeft = leftRef.current;
        const divRight = rightRef.current;
        let mouseDownInfo;
        const onMouseDown = (event) => {
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            mouseDownInfo = {
                e: event,
                leftWidth: divLeft.offsetWidth,
                rightWidth: divRight.offsetWidth,
                separatorLeft: divSeparator.offsetLeft
            };
        };
        const onMouseMove = (event) => {
            
            let widthSplitter = 10*100/window.innerWidth; // 10px * 100 / tamaño total del window. Resultado en %
            let delta = event.clientX - mouseDownInfo.e.x;
            
            // divSeparator.style.left = `${mouseDownInfo.separatorLeft + delta}px`;
            // divLeft.style.width = `${mouseDownInfo.leftWidth + delta}px`;
            // divRight.style.width = `${mouseDownInfo.rightWidth - delta}px`;

            /* Div separador */
            divSeparator.style.left = `${(mouseDownInfo.separatorLeft + delta) * 100 / window.innerWidth <= 0 ? "0" 
                                        : ((mouseDownInfo.separatorLeft + delta) * 100 / window.innerWidth) >= 100 - widthSplitter ? 100 - widthSplitter 
                                        : (mouseDownInfo.separatorLeft + delta) * 100 / window.innerWidth}%`;
            /* Div Left */
            divLeft.style.width = `${(mouseDownInfo.rightWidth - delta) * 100 / window.innerWidth >= 100 ? "0" 
                                    : (mouseDownInfo.leftWidth + delta) * 100 / window.innerWidth >= 100 - widthSplitter ? 100 - widthSplitter
                                    : (mouseDownInfo.leftWidth + delta) * 100 / window.innerWidth}%`;
            /* Div Right */                            
            divRight.style.width = `${(mouseDownInfo.rightWidth - delta) * 100 / window.innerWidth >= 100 ? "100"
                                    : (mouseDownInfo.rightWidth - delta) * 100 / window.innerWidth <= (0 + widthSplitter) ? 0 + widthSplitter 
                                    : (mouseDownInfo.rightWidth - delta) * 100 / window.innerWidth}%`;
           
        };
        const onMouseUp = (event) => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        // subscribe event
        divSeparator.addEventListener('mousedown', onMouseDown);
        return () => {
            // unsubscribe event
            divSeparator.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);
    return (
        <>
        <div className= "split left" id= "left" ref= {leftRef} style={{ width: "calc(50%)"}}>{Left}</div>
        <div className= "split right" id= "right" ref= {rightRef} style={{width: "calc(50%)"}}>{Right}</div>
        <div className= "split separator" id= "separator" ref={separatorRef} style={{left: `calc(50%)`}}></div>

        </>
    )
};