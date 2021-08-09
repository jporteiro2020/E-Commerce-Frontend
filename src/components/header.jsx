import React from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import './comun.css';
import './header.css';

function Header(){
    let history = useHistory();
    const buscar = e => {
        e.preventDefault();
        if(e.target[0].value){
            history.push(`/busqueda/${ e.target[0].value }`);
        }
    }

    return(
        <header>
            <Link to="/"><img src='/Recursos/LOGO.png' alt="Logo" className="logo" /></Link>
            <nav>
                <ul className="ul-nav">
                    <li><a href="/"><i className="fas fa-align-justify"></i> <span id="nombreNav">Productos</span></a>
                        <ul>
                            <li><a href="/">PC Escritorio</a></li>
                            <li><a href="/">Notebooks</a></li>
                            <li><a href="/">Componentes</a></li>
                            <li><a href="/">Consolas <i className="fas fa-angle-right"></i></a>
                                <ul>
                                    <li><a href="/">Play Station</a></li>
                                    <li><a href="/">XBOX</a></li>
                                    <li><a href="/">Nintendo</a></li>
                                    <li><a href="/">Retro</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <form className="estilo-busqueda busqueda" onSubmit = { buscar }>
                <input type="search" placeholder="Buscar..." id="buscador" />
                <button type = "submit" id="btnBuscador"><i className="fas fa-search"></i></button>
            </form>
            <div className="contacto">
                <p className="contacto-p">Contacto</p>
                <i className="fab fa-whatsapp wpp-icon-grid"></i><p className="wpp-p-grid">094850906</p>
            </div>
            {/*onClick="location.href='/carrito'"*/}
            <button><div className="carrito"><p className="precio">0,00</p><i className="fas fa-shopping-cart cart icono"></i></div></button>
        </header>
    );
}

export default Header;