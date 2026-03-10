import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authSlice';
import './inicio.css';

function Inicio() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <main id="main-inicio">
            <section className="hero">
                <div className="hero-content">
                    <h1>¡Bienvenido a <span className="hero-brand">IT's Possible!</span></h1>
                    <p className="hero-subtitle">
                        Tu tienda de Hardware y Software. Encontrá una gran variedad de productos
                        para profesionales y entusiastas de la tecnología.
                    </p>
                    <div className="hero-actions">
                        <Link to="/tienda">
                            <button className="btn-hero-primary">Ir a la tienda</button>
                        </Link>
                        {!isAuthenticated && (
                            <>
                                <Link to="/registro">
                                    <button className="btn-hero-secondary">Registrarme</button>
                                </Link>
                                <Link to="/login">
                                    <button className="btn-hero-secondary">Iniciar sesión</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="info-cards">
                <div className="info-card">
                    <i className="fas fa-clock"></i>
                    <h3>Horario de atención</h3>
                    <ul>
                        <li>Lunes a Viernes: 9:00–13:00 y 14:00–19:00 hs</li>
                        <li>Sábados: 9:00–14:00 hs</li>
                    </ul>
                </div>
                <div className="info-card">
                    <i className="fas fa-map-marker-alt"></i>
                    <h3>Sucursales</h3>
                    <ul>
                        <li>
                            Juan Paullier 2378, entre Amézaga y Domingo Aramburú
                            <Link to="/sucursal1" className="mapa-link"> Ver mapa →</Link>
                        </li>
                        <li>
                            Demóstenes 3532
                            <Link to="/sucursal2" className="mapa-link"> Ver mapa →</Link>
                        </li>
                    </ul>
                </div>
                <div className="info-card">
                    <i className="fab fa-whatsapp"></i>
                    <h3>Contacto directo</h3>
                    <p className="contacto-numero">094 850 906</p>
                    <p className="contacto-hint">Consultános por WhatsApp</p>
                </div>
            </section>
        </main>
    );
}

export default Inicio;