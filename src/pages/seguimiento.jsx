import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { consultarOrdenInvitadoAPI } from '../api/productos';
import Spinner from '../components/Spinner';
import './seguimiento.css';

const ESTADO_LABEL = {
    PENDIENTE_PAGO: { label: 'Pendiente de pago', cls: 'estado-pendiente' },
    PAGADA:         { label: 'Pagada',             cls: 'estado-pagada'    },
    ENVIADA:        { label: 'Enviada',             cls: 'estado-enviada'   },
    ENTREGADA:      { label: 'Entregada',           cls: 'estado-entregada' },
    CANCELADA:      { label: 'Cancelada',           cls: 'estado-cancelada' },
};

function Seguimiento() {
    const { trackingToken: tokenFromUrl } = useParams();

    const [token,   setToken]   = useState(tokenFromUrl ?? '');
    const [data,    setData]    = useState(null);   // { orden, detalle }
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(null);

    const buscar = async (tkn) => {
        const t = tkn?.trim();
        if (!t) return;
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const result = await consultarOrdenInvitadoAPI(t);
            setData(result);
        } catch {
            setError('No se encontró ninguna orden con ese token. Verificá que estés ingresando el token correcto.');
        } finally {
            setLoading(false);
        }
    };

    // Auto-buscar si viene el token por URL
    useEffect(() => {
        if (tokenFromUrl) buscar(tokenFromUrl);
    }, [tokenFromUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        buscar(token);
    };

    const orden   = data?.orden;
    const detalle = data?.detalle ?? [];
    const estado  = orden ? (ESTADO_LABEL[orden.estado] ?? { label: orden.estado, cls: '' }) : null;

    return (
        <main className="seguimiento-page">
            <h1 className="seguimiento-titulo">Seguimiento de pedido</h1>

            {/* ── Buscador ── */}
            <form className="seguimiento-form" onSubmit={handleSubmit}>
                <div className="seguimiento-input-wrap">
                    <i className="fas fa-search seguimiento-search-icon"></i>
                    <input
                        type="text"
                        className="seguimiento-input"
                        placeholder="Ingresá tu token de seguimiento"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>
                <button type="submit" className="seguimiento-btn" disabled={loading || !token.trim()}>
                    {loading ? <Spinner size="sm" /> : 'Consultar'}
                </button>
            </form>

            {/* ── Estados ── */}
            {error && (
                <div className="seguimiento-error">
                    <i className="fas fa-exclamation-circle"></i> {error}
                </div>
            )}

            {/* ── Resultado ── */}
            {orden && (
                <div className="seguimiento-resultado">

                    {/* Cabecera orden */}
                    <div className="seg-card">
                        <div className="seg-card-header">
                            <span className="seg-orden-id">Orden #{orden.id}</span>
                            <span className={`orden-estado ${estado.cls}`}>{estado.label}</span>
                        </div>
                        <div className="seg-card-meta">
                            <span><i className="fas fa-calendar-alt"></i> {new Date(orden.fecha).toLocaleDateString('es-UY')}</span>
                            <span><i className="fas fa-envelope"></i> {orden.email}</span>
                        </div>
                    </div>

                    {/* Datos de envío */}
                    <div className="seg-card">
                        <h3 className="seg-section-title">
                            <i className="fas fa-map-marker-alt"></i> Datos de envío
                        </h3>
                        <div className="seg-info-grid">
                            <div className="seg-info-item">
                                <span className="seg-label">Nombre</span>
                                <span>{orden.nombre} {orden.apellido}</span>
                            </div>
                            <div className="seg-info-item">
                                <span className="seg-label">Teléfono</span>
                                <span>{orden.telefono}</span>
                            </div>
                            <div className="seg-info-item seg-full">
                                <span className="seg-label">Dirección</span>
                                <span>{orden.direccionEnvio}, {orden.ciudad} {orden.codigoPostal}, {orden.pais}</span>
                            </div>
                        </div>
                    </div>

                    {/* Detalle de productos */}
                    <div className="seg-card">
                        <h3 className="seg-section-title">
                            <i className="fas fa-box"></i> Productos
                        </h3>
                        <div className="seg-detalle-list">
                            {detalle.map((item) => (
                                <div className="seg-detalle-row" key={item.idproducto ?? item.idProducto}>
                                    <span className="seg-prod-name">
                                        {item.producto}
                                        <em> ×{item.cantidad}</em>
                                    </span>
                                    <span className="seg-prod-precio">
                                        USD {Number(item.preciounitario ?? item.precioUnitario).toFixed(2)}
                                        <span className="seg-prod-sub"> → USD {Number(item.subtotal).toFixed(2)}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="seg-total">
                            <span>Total del pedido</span>
                            <span>USD {Number(orden.total).toFixed(2)}</span>
                        </div>
                    </div>

                </div>
            )}

            {/* ── Links ── */}
            <div className="seguimiento-links">
                <Link to="/tienda">
                    <i className="fas fa-store"></i> Seguir comprando
                </Link>
                <Link to="/login">
                    <i className="fas fa-user"></i> Iniciar sesión
                </Link>
            </div>
        </main>
    );
}

export default Seguimiento;
