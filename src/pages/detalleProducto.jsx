import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../api/productos';
import { useCarrito } from '../hooks/useCarrito';
import { useToastContext } from '../context/ToastContext';
import Spinner from '../components/Spinner';
import '../components/comun.css';
import './detalleProducto.css';
import '../components/Spinner.css';

function DetalleProducto() {
    const { idProducto } = useParams();
    const { addToCart } = useCarrito();
    const { showToast } = useToastContext();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (!idProducto) { setLoading(false); return; }
        setLoading(true);
        getProductoById(idProducto)
            .then((data) => setProducto(Array.isArray(data) ? data[0] : data))
            .catch(() => setError('No se pudo cargar el producto.'))
            .finally(() => setLoading(false));
    }, [idProducto]);

    const handleAddToCart = () => {
        if (!producto) return;
        addToCart(producto, qty);
        showToast(`«${producto.nombre}» agregado al carrito`, 'success');
    };

    if (loading) return (
        <main id="mainDetalle" className="page-fade">
            <div className="detalle-loading">
                <Spinner size="lg" label="Cargando producto..." />
            </div>
        </main>
    );

    if (error || !producto) return (
        <main id="mainDetalle" className="page-fade">
            <div className="detalle-error">
                <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                <p>{error ?? 'Producto no encontrado.'}</p>
                <Link to="/tienda" className="btn-back">← Volver a la tienda</Link>
            </div>
        </main>
    );

    return (
        <main id="mainDetalle" className="page-fade">
            <div className="img-detalle">
                <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
            </div>
            <div className="detalleProducto">
                <nav className="breadcrumb" aria-label="Breadcrumb">
                    <Link to="/tienda">Tienda</Link>
                    <span className="breadcrumb-sep" aria-hidden="true">/</span>
                    <span aria-current="page">{producto.nombre}</span>
                </nav>
                <h2>{producto.nombre}</h2>
                <div className="disponibilidad">
                    <p className="pDisponibilidad">Disponibilidad:</p>
                    {producto.stock > 0
                        ? <p className="disponible">✓ Disponible para retirar</p>
                        : <p className="sinStock">✗ Sin Stock</p>
                    }
                </div>
                <p className="precio-detalle">USD {producto.precio}</p>
                {producto.stock > 0 && (
                    <div className="qty-row">
                        <label htmlFor="qty-input">Cantidad</label>
                        <input
                            id="qty-input"
                            type="number"
                            min="1"
                            max={producto.stock}
                            step="1"
                            value={qty}
                            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                            aria-label="Cantidad"
                        />
                    </div>
                )}
                <button
                    className="btn-add-cart-detalle"
                    onClick={handleAddToCart}
                    disabled={producto.stock === 0}
                    aria-label={`Añadir ${qty} unidad${qty !== 1 ? 'es' : ''} al carrito`}
                >
                    <i className="fas fa-cart-plus" aria-hidden="true"></i>
                    Añadir al carrito
                </button>
            </div>
            <div className="descripcionDetalle">
                <h3>Descripción</h3>
                <p>{producto.descripcion}</p>
            </div>
        </main>
    );
}

export default DetalleProducto;