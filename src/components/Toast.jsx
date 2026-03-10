import React, { useEffect, useRef } from 'react';
import './Toast.css';

/**
 * Toast individual. Se autodestruye después de `duration` ms.
 * Props: { id, type ('success'|'error'|'info'|'warning'), message, onClose }
 */
export function Toast({ id, type = 'info', message, onClose, duration = 3500 }) {
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timerRef.current);
    }, [id, duration, onClose]);

    const icons = {
        success: 'fas fa-check-circle',
        error:   'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info:    'fas fa-info-circle',
    };

    return (
        <div className={`toast toast--${type}`} role="alert" aria-live="polite">
            <i className={`toast__icon ${icons[type]}`} aria-hidden="true"></i>
            <span className="toast__message">{message}</span>
            <button
                className="toast__close"
                onClick={() => onClose(id)}
                aria-label="Cerrar notificación"
            >
                <i className="fas fa-times"></i>
            </button>
            <span className="toast__progress" style={{ animationDuration: `${duration}ms` }}></span>
        </div>
    );
}

/**
 * Contenedor de toasts. Renderizar una sola vez en App.
 * Props: { toasts, onClose }
 */
export function ToastContainer({ toasts, onClose }) {
    if (!toasts.length) return null;
    return (
        <div className="toast-container" aria-label="Notificaciones">
            {toasts.map((t) => (
                <Toast key={t.id} {...t} onClose={onClose} />
            ))}
        </div>
    );
}
