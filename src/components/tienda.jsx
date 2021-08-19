import React, { useState, useEffect } from "react";
import './tienda.css';
import SectionArticulo from './sectionArticulo';

function Tienda(){
    const [destacados, cambiarDestacados] = useState([]);
    const [pcsEscritorio, cambiarPcsEscritorio] = useState([]);
    const [notebooks, cambiarNotebooks] = useState([]);
    const [consolas, cambiarConsolas] = useState([]);
    
    useEffect( () => {
        Promise.all([
            fetch("http://localhost:4000/obtProdDestacado", { method: "GET" }), 
            fetch("http://localhost:4000/obtProductosPC", { method: "GET" }),
            fetch("http://localhost:4000/obtProductosNot", { method: "GET" }),
            fetch("http://localhost:4000/obtProductosCons", { method: "GET" })
        ])
        .then(promesasResueltas => {
            Promise.all(promesasResueltas.map(pR => pR.json()))
            .then(([destacadosP, pcEscritorioP, notebooksP, consolasP]) => {
                cambiarDestacados(destacadosP.data);
                cambiarPcsEscritorio(pcEscritorioP.data);
                cambiarNotebooks(notebooksP.data);
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
                productos = {destacados} 
                estiloSection = {"destacado"} 
                idSection = {"destacados"} 
                titulo = {"Destacados"} 
                idDiv = {"divDestacado"}
                keyVal = { 1 }
            />
            <SectionArticulo 
                productos = {pcsEscritorio} 
                estiloSection = {"PC-Escritorio"} 
                idSection = {"PC-Escritorio"} 
                titulo = {"PC Escritorio"} 
                idDiv = {"divEscritorio"}
                keyVal = { 2 }
            />
            <SectionArticulo 
                productos = {notebooks} 
                estiloSection = {"Notebooks"} 
                idSection = {"Notebooks"} 
                titulo = {"Notebooks"} 
                idDiv = {"divNotebook"}
                keyVal = { 3 }
            />
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

export default Tienda;