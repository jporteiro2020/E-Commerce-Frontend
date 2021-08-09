import React from 'react';
import './login.css';

function Login(){
    return(
        <main id="main">
            <div>
                <form action="" className="login">
                    <h2 className="titulo-login">Login</h2>
                    <input type="text" name="" id="emailLogin" placeholder="email" />
                    <input type="password" name="" id="passLogin" placeholder="contraseña" />
                    <button type="submit" id="btn-Login" className="custom-btn btn-3"><span>Acceder</span></button>
                </form>
                <div id="olvidoSuContraseña">
                    <a href="/recuperar">¿Olvidó su contraseña?</a>
                </div>
            </div>
        </main>
    );
}

export default Login;