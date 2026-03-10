import { useState, useCallback } from 'react';

let nextId = 1;

/**
 * Hook para gestionar toasts.
 * Devuelve { toasts, showToast, closeToast }
 * showToast(message, type?) → type: 'success' | 'error' | 'warning' | 'info'
 */
export function useToast() {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = nextId++;
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    }, []);

    const closeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, showToast, closeToast };
}
