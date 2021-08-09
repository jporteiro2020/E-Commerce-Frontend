import React from 'react';
import { Link } from "react-router-dom";
import './comun.css';
import './footer.css';
import './botones.css';

function Footer(){
    return(
        <footer>
            <form action="" className="subscripcion">
                <h2 className="titulo-suscripcion">Subscribirse</h2>
                <input type="text" name="" id="nombreSuscripcion" placeholder="Nombre" className="nombre-suscripcion" />
                <input type="text" name="" id="emailSuscripcion" placeholder="E-mail" className="email-suscripcion" />
                <button type="submit" className="custom-btn btn-3" id="btnSuscribir"><span>Recibir Ofertas</span></button>
            </form>
            <div className="direccion-footer">
                <p>Nos puedes encontrar en nuestras dos sucursales:</p>
                <ul>
                    <li>
                        {/*onClick="location.href='/sucursal1'"*/}
                        Dirección: Juan Paullier 2378 entre Amézaga y Domingo Aramburú - Mapa: <Link to="/sucursal1"><button className="custom-btn btn-16"><i className="fas fa-map-marked-alt"></i></button></Link>
                    </li>
                    <li>
                        {/*onClick="location.href='/sucursal2'"*/}
                        Dirección: Demóstenes 3532 - Mapa: <Link to="/sucursal2"><button className="custom-btn btn-16"><i className="fas fa-map-marked-alt"></i></button></Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;