import React from 'react';
import './comun.css';
import './recuperar.css';

function Recuperar(){
    return(
        <main id="main">
            <div>
                <form action="" className="recuperar">
                    <h2 className="titulo-recuperar">Recuperar contraseña</h2>
                    <input type="text" name="" id="" placeholder="email" />
                    <button type="submit" id="btn-recuperar" className="custom-btn btn-3"><span>Recuperar</span></button>
                </form>
            </div>
        </main>
    );
}

export default Recuperar;