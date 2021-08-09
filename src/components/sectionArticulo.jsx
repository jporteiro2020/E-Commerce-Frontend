import React from "react";
import ArticulosProductos from './articuloProducto';

function SectionArticulo(props) {
    const productos = props.productos;
    const estiloSection = props.estiloSection;
    const idSection = props.idSection;
    const titulo = props.titulo;
    const idDiv = props.idDiv;
    const keyVal = props.keyVal;
  
    if (productos.length === 0) {
        return <div>No hay productos</div>;
    }

    if(!estiloSection | !idSection | !titulo | !idDiv){
        return <div>No hay productos</div>;
    }

    return (
        <section className={estiloSection} id={idSection} key = { keyVal }>
            <h2>{titulo}</h2>
            <div id={idDiv} className="media-q">
                <ArticulosProductos productos = {productos}/>
            </div>
        </section>
    );
}

export default SectionArticulo;