import React, { useState, useEffect } from "react";
import {
    useParams
} from "react-router-dom";
//import './comun.css';
import './tienda.css';
import SectionArticulo from './sectionArticulo';

function Busqueda(){
    let { stringBusqueda } = useParams();
    const [productosBusqueda, cambiarProductosBusqueda] = useState([]);
    
    useEffect( () => {
        if(!stringBusqueda) return <div>No hay productos</div>;

        Promise.all([
            fetch(`http://localhost:4000/obtProductos/?busqueda=${stringBusqueda}`, { method: "GET" })
        ])
        .then(promesaResuelta => {
            Promise.all(promesaResuelta.map(pR => pR.json()))
            .then(([resultadoBusqueda]) => {
                cambiarProductosBusqueda(resultadoBusqueda.data);
            })
        })
        .catch(err => {
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
                productos = {productosBusqueda} 
                estiloSection = {"destacado"} 
                idSection = {"busqueda"} 
                titulo = {"Resultado búsqueda"} 
                idDiv = {"divBusqueda"}
                keyVal = { 1 }
            />
        </main> 
    );
}

export default Busqueda;