import React from 'react';
import { Link } from "react-router-dom";
import './comun.css';
import './botones.css';
import './inicio.css';

function Inicio(){
    return(
        <main id="main">
            <article id="article-index" className="article-grid">
                <div className="info-bienvenida">
                    <h1>¡Bienvenido a IT's Possible!</h1>
                    <p>Esta empresa se dedica a la venta de Hardware y Software, en esta tienda encontrarás una gran variedad de productos 
                    a su disposición.</p>
                </div>
                <div className="horario">
                    <p>Nuestro horario de atención es:</p>
                        <ul>
                            <li>
                                De Lunes a Viernes de 9:00 a 13 y 14 a 19 hrs
                            </li>
                            <li>
                                Los Sábados de  9 a 14hrs
                            </li>
                        </ul>
                </div>
                <div className="ubicacion">
                    <p>Nos puedes encontrar en nuestras dos sucursales:</p>
                    <ul>
                        <li>
                            Dirección: Juan Paullier 2378 entre Amézaga y Domingo Aramburú - Mapa: <Link to="/sucursal1"><button className="custom-btn btn-16"><i className="fas fa-map-marked-alt"></i></button></Link>
                        </li>
                        <li>
                            Dirección: Demóstenes 3532 - Mapa:  <Link to="/sucursal2"><button className="custom-btn btn-16"><i className="fas fa-map-marked-alt"></i></button></Link>
                        </li>
                    </ul>
                </div>
                <div className="divBotones">
                    <Link to="/tienda">
                        <button className="custom-btn btn-2 boton1">Ir a la tienda</button>
                    </Link>
                    <Link to="/login">
                        <button className="custom-btn btn-2 boton2">Iniciar Sesión</button>
                    </Link>
                    <Link to="/registro">
                        <button className="custom-btn btn-2 boton3">Registrarme</button>
                    </Link>
                </div>
            </article>
        </main>
    );
}

export default Inicio;