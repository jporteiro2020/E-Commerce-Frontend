import React, { createContext, useContext } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

const ToastContext = createContext(null);

/**
 * Envuelve la app y expone showToast via contexto.
 * Uso: const { showToast } = useToastContext();
 */
export function ToastProvider({ children }) {
    const { toasts, showToast, closeToast } = useToast();
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} onClose={closeToast} />
        </ToastContext.Provider>
    );
}

export function useToastContext() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToastContext debe usarse dentro de <ToastProvider>');
    return ctx;
}
