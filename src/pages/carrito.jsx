import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import { selectIsAuthenticated, selectToken } from '../store/authSlice';
import {
    getCarritoAPI,
    actualizarItemAPI,
    eliminarItemAPI,
    vaciarCarritoAPI,
    checkout as checkoutAPI,
} from '../api/productos';
import { useToastContext } from '../context/ToastContext';
import Spinner from '../components/Spinner';
import './carrito.css';

/** Normaliza un ítem del servidor al formato de display */
const fromServer = (it) => ({
    id:       it.idproducto ?? it.idProducto,
    name:     it.nombre,
    image:    it.imagen,
    price:    Number(it.precio),
    quantity: Number(it.cantidad),
    subtotal: Number(it.subtotal),
});

/** Normaliza un ítem de Redux al formato de display */
const fromRedux = ({ product: p, quantity }) => ({
    id:       p.id,
    name:     p.descripcioncorta ?? p.nombre,
    image:    p.imagen,
    price:    Number(p.precio),
    quantity,
    subtotal: Number(p.precio) * quantity,
});

function Carrito() {
    const dispatch      = useDispatch();
    const navigate      = useNavigate();
    const { showToast } = useToastContext();
    const isAuth        = useSelector(selectIsAuthenticated);
    const token         = useSelector(selectToken);
    const reduxItems    = useSelector(selectCartItems);
    const reduxTotal    = useSelector(selectCartTotal);

    const [serverItems,  setServerItems]  = useState(null);   // null = no cargado aún
    const [loadingCart,  setLoadingCart]  = useState(false);
    const [checkingOut,  setCheckingOut]  = useState(false);

    /* â”€â”€ Carga desde el servidor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    const loadServerCart = useCallback(() => {
        setLoadingCart(true);
        getCarritoAPI(token)
            .then(({ items }) => setServerItems(items))
            .catch(() => {
                showToast('No se pudo cargar el carrito desde el servidor', 'error');
                setServerItems([]);
            })
            .finally(() => setLoadingCart(false));
    }, [token]);

    useEffect(() => {
        if (isAuth) loadServerCart();
    }, [isAuth, loadServerCart]);

    /* â”€â”€ Fuente de datos: servidor si auth, Redux si no â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    const useServer    = isAuth && serverItems !== null;
    const displayItems = useServer
        ? serverItems.map(fromServer)
        : reduxItems.map(fromRedux);
    const displayTotal = useServer
        ? displayItems.reduce((acc, it) => acc + it.subtotal, 0)
        : reduxTotal;

    /* â”€â”€ Mutaciones â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    const handleQty = async (item, newQty) => {
        if (newQty < 1) return;
        if (useServer) {
            // Actualización optimista
            setServerItems((prev) =>
                prev.map((it) => {
                    const id = it.idproducto ?? it.idProducto;
                    return id === item.id
                        ? { ...it, cantidad: newQty, subtotal: it.precio * newQty }
                        : it;
                })
            );
            try {
                await actualizarItemAPI(item.id, newQty, token);
            } catch (err) {
                loadServerCart(); // Revertir recargando
                showToast(err?.data?.error?.message ?? 'Error al actualizar cantidad', 'error');
            }
        } else {
            dispatch({ type: 'cart/updateQuantity', payload: { id: item.id, quantity: newQty } });
        }
    };

    const handleRemove = async (item) => {
        if (useServer) {
            setServerItems((prev) =>
                prev.filter((it) => (it.idproducto ?? it.idProducto) !== item.id)
            );
            try {
                await eliminarItemAPI(item.id, token);
                showToast(`"${item.name}" eliminado del carrito`, 'info');
            } catch (err) {
                loadServerCart();
                showToast(err?.data?.error?.message ?? 'Error al eliminar el producto', 'error');
            }
        } else {
            dispatch({ type: 'cart/removeItem', payload: item.id });
            showToast(`"${item.name}" eliminado del carrito`, 'info');
        }
    };

    const handleClear = async () => {
        if (useServer) {
            setServerItems([]);
            try {
                await vaciarCarritoAPI(token);
                showToast('Carrito vaciado', 'info');
            } catch (err) {
                loadServerCart();
                showToast(err?.data?.error?.message ?? 'Error al vaciar el carrito', 'error');
            }
        } else {
            dispatch(clearCart());
            showToast('Carrito vaciado', 'info');
        }
    };

    const handleCheckout = async () => {
        if (!isAuth) {
            navigate('/checkout-invitado');
            return;
        }
        setCheckingOut(true);
        try {
            const res = await checkoutAPI(token);
            dispatch(clearCart());
            // checkout response: { ok: true, data: { idOrden, estado, total } }
            const idOrden = res?.data?.idOrden;
            showToast(
                idOrden ? `¡Orden #${idOrden} creada! Confirmá el pago para completar tu compra.` : '¡Orden creada correctamente!',
                'success'
            );
            navigate(idOrden ? `/mis-ordenes/${idOrden}` : '/mis-ordenes');
        } catch (err) {
            const msg = err?.data?.error?.message ?? 'No se pudo crear la orden';
            showToast(msg, 'error');
        } finally {
            setCheckingOut(false);
        }
    };

    /* â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    if (loadingCart && serverItems === null) {
        return (
            <main id="main" className="carrito-page">
                <h1 className="carrito-titulo">Tu carrito</h1>
                <div className="carrito-loading"><Spinner size="lg" /></div>
            </main>
        );
    }

    if (displayItems.length === 0) {
        return (
            <main id="main" className="carrito-page">
                <h1 className="carrito-titulo">Tu carrito</h1>
                <div className="carrito-empty">
                    <i className="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <Link to="/tienda" className="carrito-btn-primary">
                        <i className="fas fa-store"></i> Ver productos
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main id="main" className="carrito-page">
            <div className="carrito-header">
                <h1 className="carrito-titulo">Tu carrito</h1>
                <button className="carrito-vaciar" onClick={handleClear}>
                    <i className="fas fa-trash-alt"></i> Vaciar carrito
                </button>
            </div>

            <div className="carrito-layout">
                {/* â”€â”€ Lista â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div className="carrito-items">
                    {displayItems.map((item) => (
                        <div className="carrito-item" key={item.id}>
                            <Link to={`/detalle/${item.id}`} className="carrito-item-img-wrap">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="carrito-item-img"
                                    loading="lazy"
                                />
                            </Link>

                            <div className="carrito-item-info">
                                <Link to={`/detalle/${item.id}`} className="carrito-item-name">
                                    {item.name}
                                </Link>
                                <span className="carrito-item-unit">
                                    USD {item.price.toFixed(2)} c/u
                                </span>
                            </div>

                            <div className="carrito-item-qty">
                                <button
                                    className="qty-btn"
                                    aria-label="Disminuir cantidad"
                                    onClick={() => handleQty(item, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <span className="qty-value">{item.quantity}</span>
                                <button
                                    className="qty-btn"
                                    aria-label="Aumentar cantidad"
                                    onClick={() => handleQty(item, item.quantity + 1)}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>

                            <span className="carrito-item-subtotal">
                                USD {item.subtotal.toFixed(2)}
                            </span>

                            <button
                                className="carrito-item-remove"
                                aria-label={`Eliminar ${item.name}`}
                                onClick={() => handleRemove(item)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    ))}
                </div>

                {/* â”€â”€ Resumen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <aside className="carrito-resumen">
                    <h2>Resumen</h2>

                    <div className="resumen-lineas">
                        {displayItems.map((item) => (
                            <div className="resumen-linea" key={item.id}>
                                <span className="resumen-linea-name">
                                    {item.name}
                                    {item.quantity > 1 && <em> ×{item.quantity}</em>}
                                </span>
                                <span>USD {item.subtotal.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="resumen-total">
                        <span>Total</span>
                        <span>USD {displayTotal.toFixed(2)}</span>
                    </div>

                    <button
                        className="carrito-btn-primary carrito-checkout"
                        onClick={handleCheckout}
                        disabled={checkingOut}
                    >
                        {checkingOut
                            ? <><Spinner size="sm" /> Procesando…</>
                            : <><i className="fas fa-credit-card"></i> Proceder al pago</>
                        }
                    </button>

                    <Link to="/tienda" className="carrito-btn-secondary">
                        <i className="fas fa-arrow-left"></i> Seguir comprando
                    </Link>
                </aside>
            </div>
        </main>
    );
}

export default Carrito;

