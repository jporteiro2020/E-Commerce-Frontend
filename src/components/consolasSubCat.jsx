import React, { useState, useEffect } from "react";
import {
    useParams
} from "react-router-dom";
import './tienda.css';
import SectionArticulo from './sectionArticulo';

function ConsolasSubCat(){
    let { stringCategoria } = useParams();
    const [consolas, cambiarConsolas] = useState([]);
    const [titulo, cambiarTitulo] = useState('');
    
    useEffect( () => {
        if(!stringCategoria) return <div>No hay productos</div>;
        cambiarTitulo(stringCategoria.toUpperCase());

        Promise.all([
            fetch(`http://localhost:4000/obtProductosConsSubCat/?subCat=${stringCategoria}`, { method: "GET" })
        ])
        .then(promesaResuelta => {
            Promise.all(promesaResuelta.map(pR => pR.json()))
            .then(([consolasP]) => {
                cambiarConsolas(consolasP.data);
            });
        })
        .catch(err => {
            return(
                <div>
                    No hay productos disponibles. Vuelva a cargar la página
                </div>
            );
        });
    }, [stringCategoria]);

    return(
        <main id="main">
            <SectionArticulo 
                productos = {consolas} 
                estiloSection = {"Consolas"} 
                idSection = {"Consolas"} 
                titulo = {titulo} 
                idDiv = {"divConsolas"}
                keyVal = { 4 }
            />
        </main> 
    );
}

export default ConsolasSubCat;