import React, { useState, useEffect } from "react";
import './tienda.css';
import SectionArticulo from './sectionArticulo';

function Consolas(){
    const [consolas, cambiarConsolas] = useState([]);
    
    useEffect( () => {
        Promise.all([
            fetch("http://localhost:4000/obtProductosCons", { method: "GET" })
        ])
        .then(promesaResuelta => {
            Promise.all(promesaResuelta.map(pR => pR.json()))
            .then(([consolasP]) => {
                cambiarConsolas(consolasP.data);
            });
        })
        .catch(err => {
            console.log(err);

            return(
                <div>
                    No hay productos disponibles. Vuelva a cargar la página
                </div>
            );
        });
    }, []);

    return(
        <main id="main">
            <SectionArticulo 
                productos = {consolas} 
                estiloSection = {"Consolas"} 
                idSection = {"Consolas"} 
                titulo = {"Consolas"} 
                idDiv = {"divConsolas"}
                keyVal = { 4 }
            />
        </main>
    );
}

export default Consolas;