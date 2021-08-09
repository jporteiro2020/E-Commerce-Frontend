import React from 'react';
import './comun.css';
import './registro.css';

function Registro(){
    return(
        <main id="main">
            <div>
                <form action="" className="registro">
                    <h2 className="titulo-registro">Registro</h2>
                    <input type="text" name="" id="nombreRegistro" placeholder="Nombre" />
                    <input type="text" name="" id="apellidoRegistro" placeholder="Apellido" />
                    <input type="text" name="" id="direccionRegistro" placeholder="Dirección" />
                    <input type="text" name="" id="emailRegistro" placeholder="email" />
                    <input type="text" name="" id="telefonoRegistro" placeholder="telefono" />
                    <input type="password" name="" id="passwordRegistro" placeholder="contraseña" />
                    <input type="password" name="" id="repetirPasswordRegistro" placeholder="repetir contraseña" />
                    <button type="submit" id="btn-Registro" className="custom-btn btn-3"><span>Registrarme</span></button>
                </form>
            </div>
        </main>
    );
}

export default Registro;