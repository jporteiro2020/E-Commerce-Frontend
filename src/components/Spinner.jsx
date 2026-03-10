import React from 'react';
import './Spinner.css';

/**
 * Spinner de carga.
 * size: 'sm' | 'md' | 'lg' | 'page'
 * overlay: true  → cubre toda la pantalla con fondo semitransparente
 * label: texto accesible (sr-only)
 */
export default function Spinner({ size = 'md', overlay = false, label = 'Cargando...' }) {
    const spinner = (
        <div className={`spinner spinner--${size}`} role="status" aria-label={label}>
            <div className="spinner__ring">
                <svg viewBox="0 0 50 50" aria-hidden="true">
                    <circle
                        className="spinner__track"
                        cx="25" cy="25" r="20"
                        fill="none"
                        strokeWidth="4"
                    />
                    <circle
                        className="spinner__arc"
                        cx="25" cy="25" r="20"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            {size === 'page' && (
                <p className="spinner__label">{label}</p>
            )}
        </div>
    );

    if (overlay) {
        return <div className="spinner-overlay">{spinner}</div>;
    }

    return spinner;
}
