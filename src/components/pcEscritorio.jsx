import React, { useState, useEffect } from "react";
import './tienda.css';
import SectionArticulo from './sectionArticulo';

function PcEscritorio(){
    const [pcsEscritorio, cambiarPcsEscritorio] = useState([]);
    
    useEffect( () => {
        Promise.all([
            fetch("http://localhost:4000/obtProductosPC", { method: "GET" })
        ])
        .then(promesaResuelta => {
            Promise.all(promesaResuelta.map(pR => pR.json()))
            .then(([pcEscritorioP]) => {
                cambiarPcsEscritorio(pcEscritorioP.data);
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
                productos = {pcsEscritorio} 
                estiloSection = {"PC-Escritorio"} 
                idSection = {"PC-Escritorio"} 
                titulo = {"PC Escritorio"} 
                idDiv = {"divEscritorio"}
                keyVal = { 2 }
            />
        </main> 
    );
}

export default PcEscritorio;