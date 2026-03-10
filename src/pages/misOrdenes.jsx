import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/authSlice';
import { getMisOrdenes } from '../api/productos';
import Spinner from '../components/Spinner';
import './ordenes.css';

// Backend returns states in UPPERCASE: PENDIENTE_PAGO, PAGADA, CANCELADA
const ESTADO_LABEL = {
    PENDIENTE_PAGO: { label: 'Pendiente de pago', cls: 'estado-pendiente' },
    PAGADA:         { label: 'Pagada',             cls: 'estado-pagada'    },
    CANCELADA:      { label: 'Cancelada',          cls: 'estado-cancelada' },
};

function MisOrdenes() {
    const token = useSelector(selectToken);
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMisOrdenes(token)
            .then(setOrdenes)
            .catch(() => setError('No se pudieron cargar las órdenes.'))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return (
        <main id="main" className="ordenes-page">
            <div className="ordenes-center"><Spinner size="lg" /></div>
        </main>
    );
    if (error) return (
        <main id="main" className="ordenes-page">
            <div className="ordenes-center ordenes-error">{error}</div>
        </main>
    );

    return (
        <main id="main" className="ordenes-page">
            <h1 className="ordenes-titulo">Mis órdenes</h1>

            {ordenes.length === 0 ? (
                <div className="ordenes-empty">
                    <i className="fas fa-box-open"></i>
                    <p>Todavía no realizaste ningún pedido.</p>
                    <Link to="/tienda" className="ordenes-btn-tienda">Ver productos</Link>
                </div>
            ) : (
                <div className="ordenes-list">
                    {ordenes.map((o) => {
                        const estado = ESTADO_LABEL[o.estado] ?? { label: o.estado, cls: '' };
                        return (
                            // Backend returns 'id', not 'idorden'
                            <Link to={`/mis-ordenes/${o.id}`} className="orden-card" key={o.id}>
                                <div className="orden-card-left">
                                    <span className="orden-id">Orden #{o.id}</span>
                                    <span className="orden-fecha">{new Date(o.fecha).toLocaleDateString('es-UY')}</span>
                                </div>
                                <div className="orden-card-right">
                                    <span className={`orden-estado ${estado.cls}`}>{estado.label}</span>
                                    <span className="orden-total">USD {Number(o.total ?? 0).toFixed(2)}</span>
                                </div>
                                <i className="fas fa-chevron-right orden-arrow"></i>
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default MisOrdenes;
