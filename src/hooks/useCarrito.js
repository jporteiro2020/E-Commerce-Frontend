import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity, removeItem, clearCart } from '../store/cartSlice';
import { selectIsAuthenticated, selectToken } from '../store/authSlice';
import {
    agregarItemAPI,
    actualizarItemAPI,
    eliminarItemAPI,
    vaciarCarritoAPI,
} from '../api/productos';

/**
 * Abstrae todas las operaciones de carrito.
 * - Autenticado  → siempre llama a la API + actualiza Redux
 * - No autenticado → solo actualiza Redux (carrito de invitado)
 *
 * Uso: const { addToCart } = useCarrito();
 */
export function useCarrito() {
    const dispatch    = useDispatch();
    const isAuth      = useSelector(selectIsAuthenticated);
    const token       = useSelector(selectToken);

    /** Agrega (o incrementa) un item. product debe tener al menos { id } */
    const addToCart = async (product, quantity = 1) => {
        dispatch(addItem({ product, quantity }));
        if (isAuth) {
            try {
                await agregarItemAPI(product.id, quantity, token);
            } catch (e) {
                console.warn('[useCarrito] Error al sincronizar agregar:', e?.message);
            }
        }
    };

    /** Establece la cantidad exacta de un item (value absoluto, no delta) */
    const updateQty = async (productId, newQty) => {
        dispatch(updateQuantity({ id: productId, quantity: newQty }));
        if (isAuth) {
            try {
                await actualizarItemAPI(productId, newQty, token);
            } catch (e) {
                console.warn('[useCarrito] Error al sincronizar actualizar:', e?.message);
            }
        }
    };

    /** Elimina un item del carrito */
    const removeFromCart = async (productId) => {
        dispatch(removeItem(productId));
        if (isAuth) {
            try {
                await eliminarItemAPI(productId, token);
            } catch (e) {
                console.warn('[useCarrito] Error al sincronizar eliminar:', e?.message);
            }
        }
    };

    /** Vacía todo el carrito */
    const emptyCart = async () => {
        dispatch(clearCart());
        if (isAuth) {
            try {
                await vaciarCarritoAPI(token);
            } catch (e) {
                console.warn('[useCarrito] Error al sincronizar vaciar:', e?.message);
            }
        }
    };

    return { addToCart, updateQty, removeFromCart, emptyCart };
}
