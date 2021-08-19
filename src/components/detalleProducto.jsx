import React, { useEffect, useState } from 'react';
import {
    useParams, Link
} from "react-router-dom";
import './comun.css';
import './botones.css';
import './detalleProducto.css';

function DetalleProducto(){
    let { idProducto } = useParams();
    const [disponibilidad, cambiarDisponibilidad] = useState('');
    const [producto, cambiarProducto] = useState([]);

    useEffect( () => {
        if(!idProducto) return <div>No hay productos</div>;

        Promise.all([
            fetch(`http://localhost:4000/obtProducto/?id=${idProducto}`, { method: "GET" })
        ])
        .then(promesaResuelta => {
            Promise.all(promesaResuelta.map(pR => pR.json()))
            .then(([resultadoProducto]) => {
                cambiarProducto(resultadoProducto.data[0]);
            })
        })
        .catch(err => {
            return(
                <div>
                    No se encuentra el producto seleccionado. Vuelva a cargar la página
                </div>
            );
        });
    }, [idProducto]);

    return(
        <main id="mainDetalle">
                <div className="img-detalle">
                    <img src={producto.imagen} alt="Imagen producto" />
                </div>
                <div className="detalleProducto">
                    <h2>{producto.nombre}</h2>
                    {producto.stock > 0
                        ? <div className="disponibilidad">
                            <p className="pDisponibilidad">Disponibilidad: </p><p className="disponible">Disponible para retirar</p>
                          </div>
                        : <div className="disponibilidad">
                            <p className="pDisponibilidad">Disponibilidad: </p><p className="sinStock">Sin Stock</p>
                          </div>
                    }
                    <p>Precio: USD {producto.precio}</p>
                    <label htmlFor="">Cantidad</label>
                    <input type="number" min="1" max={producto.stock} step="1" defaultValue="1" />
                    <button className="custom-btn btn-2 boton1">Añadir al carrito</button>
                </div>
                <div className="descripcionDetalle">
                    <h2>Descripcion</h2>
                    <p>{producto.descripcion}</p>
                </div>
        </main>
    );
}

export default DetalleProducto;