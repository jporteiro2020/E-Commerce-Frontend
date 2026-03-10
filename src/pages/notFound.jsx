import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './notFound.css';

function NotFound() {
    const navigate = useNavigate();
    return (
        <main className="not-found-page" aria-labelledby="not-found-title">
            <div className="not-found-inner">
                <div className="not-found-code" aria-hidden="true">
                    <span>4</span>
                    <span className="not-found-zero">
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </span>
                    <span>4</span>
                </div>
                <h1 id="not-found-title" className="not-found-title">Página no encontrada</h1>
                <p className="not-found-desc">
                    La dirección que buscaste no existe o fue movida.
                </p>
                <div className="not-found-actions">
                    <button className="btn-primary" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left" aria-hidden="true"></i> Volver
                    </button>
                    <Link to="/" className="btn-secondary">Ir al inicio</Link>
                    <Link to="/tienda" className="btn-secondary">Ver tienda</Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;
