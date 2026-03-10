import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/authSlice';
import { getDetalleOrden, confirmarPago, cancelarOrden } from '../api/productos';
import { useToastContext } from '../context/ToastContext';
import Spinner from '../components/Spinner';
import './ordenes.css';

// Backend returns states in UPPERCASE: PENDIENTE_PAGO, PAGADA, CANCELADA
const ESTADO_LABEL = {
    PENDIENTE_PAGO: { label: 'Pendiente de pago', cls: 'estado-pendiente' },
    PAGADA:         { label: 'Pagada',             cls: 'estado-pagada'    },
    CANCELADA:      { label: 'Cancelada',          cls: 'estado-cancelada' },
};

function DetalleOrden() {
    const { idOrden } = useParams();
    const token = useSelector(selectToken);
    const { showToast } = useToastContext();
    const navigate = useNavigate();

    // Backend returns { orden: {...}, detalle: [...] } inside json.data
    const [orden,      setOrden]      = useState(null);
    const [detalle,    setDetalle]    = useState([]);
    const [loading,    setLoading]    = useState(true);
    const [paying,     setPaying]     = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [error,      setError]      = useState(null);

    useEffect(() => {
        getDetalleOrden(idOrden, token)
            .then(({ orden: o, detalle: d }) => {
                setOrden(o);
                setDetalle(d ?? []);
            })
            .catch(() => setError('No se pudo cargar la orden.'))
            .finally(() => setLoading(false));
    }, [idOrden, token]);

    const handleConfirmarPago = async () => {
        setPaying(true);
        try {
            // postJSON returns the full json; backend wraps the orden row in json.data
            const res = await confirmarPago(idOrden, token);
            setOrden(res.data);
            showToast('¡Pago confirmado! Tu orden está en proceso.', 'success');
        } catch (err) {
            showToast(err?.data?.error?.message ?? 'No se pudo confirmar el pago', 'error');
        } finally {
            setPaying(false);
        }
    };

    const handleCancelarOrden = async () => {
        setCancelling(true);
        try {
            const res = await cancelarOrden(idOrden, token);
            setOrden(res.data);
            showToast('Orden cancelada. El stock de los productos ha sido restaurado.', 'success');
        } catch (err) {
            showToast(err?.data?.error?.message ?? 'No se pudo cancelar la orden', 'error');
        } finally {
            setCancelling(false);
        }
    };

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
    if (!orden)  return null;

    const estado = ESTADO_LABEL[orden.estado] ?? { label: orden.estado, cls: '' };
    const total  = Number(orden.total ?? 0);

    return (
        <main id="main" className="ordenes-page">
            <button className="ordenes-back" onClick={() => navigate('/mis-ordenes')}>
                <i className="fas fa-arrow-left"></i> Volver a mis órdenes
            </button>

            <div className="detalle-header">
                <div>
                    {/* Backend returns 'id', not 'idorden' */}
                    <h1 className="ordenes-titulo">Orden #{orden.id}</h1>
                    <p className="detalle-fecha">{new Date(orden.fecha).toLocaleDateString('es-UY', { dateStyle: 'long' })}</p>
                </div>
                <span className={`orden-estado ${estado.cls}`}>{estado.label}</span>
            </div>

            {/* Items */}
            <section className="detalle-section">
                <h2>Productos</h2>
                <div className="detalle-items">
                    {detalle.length === 0 ? (
                        <p className="detalle-empty">Sin productos</p>
                    ) : detalle.map((it, i) => (
                        <div className="detalle-item" key={i}>
                            <div className="detalle-item-info">
                                {/* detalle row has: idproducto, nombre, cantidad, preciounitario, subtotal */}
                                <span className="detalle-item-name">{it.nombre ?? `Producto #${it.idproducto}`}</span>
                                <span className="detalle-item-qty">
                                    {it.cantidad} × USD {Number(it.preciounitario).toFixed(2)}
                                </span>
                            </div>
                            <span className="detalle-item-price">USD {Number(it.subtotal).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="detalle-total">
                    <span>Total</span>
                    <span>USD {total.toFixed(2)}</span>
                </div>
            </section>

            {/* Acciones: solo visibles cuando la orden está pendiente de pago */}
            {orden.estado === 'PENDIENTE_PAGO' && (
                <div className="detalle-actions">
                    <button
                        className="detalle-btn-cancelar"
                        onClick={handleCancelarOrden}
                        disabled={paying || cancelling}
                    >
                        {cancelling
                            ? <><Spinner size="sm" /> Cancelando…</>
                            : <><i className="fas fa-times-circle"></i> Cancelar orden</>}
                    </button>
                    <button
                        className="detalle-btn-pagar"
                        onClick={handleConfirmarPago}
                        disabled={paying || cancelling}
                    >
                        {paying
                            ? <><Spinner size="sm" /> Confirmando…</>
                            : <><i className="fas fa-credit-card"></i> Confirmar pago</>}
                    </button>
                </div>
            )}
        </main>
    );
}

export default DetalleOrden;
