import React, { useState, useEffect } from "react";
import './tienda.css';
import SectionArticulo from './sectionArticulo';

function Notebooks(){
    const [notebooks, cambiarNotebooks] = useState([]);
    
    useEffect( () => {
        Promise.all([
            fetch("http://localhost:4000/obtProductosNot", { method: "GET" })
        ])
        .then(promesaResuelta => {
            Promise.all(promesaResuelta.map(pR => pR.json()))
            .then(([notebooksP]) => {
                cambiarNotebooks(notebooksP.data);
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
                productos = {notebooks} 
                estiloSection = {"Notebooks"} 
                idSection = {"Notebooks"} 
                titulo = {"Notebooks"} 
                idDiv = {"divNotebook"}
                keyVal = { 3 }
            />
        </main> 
    );
}

export default Notebooks;