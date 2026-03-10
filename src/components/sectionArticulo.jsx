import React from 'react';
import ArticulosProductos from './articuloProducto';
import SkeletonCard from './SkeletonCard';
import Spinner from './Spinner';
import './Spinner.css';

function SectionArticulo({ productos, estiloSection, idSection, titulo, idDiv, loading, error }) {
    if (!estiloSection || !idSection || !titulo || !idDiv) return null;

    return (
        <section className={`${estiloSection} page-fade`} id={idSection} aria-labelledby={`titulo-${idSection}`}>
            <h2 className="section-titulo" id={`titulo-${idSection}`}>{titulo}</h2>
            <div id={idDiv} className="media-q">
                {loading ? (
                    <>
                        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                    </>
                ) : error ? (
                    <div className="section-feedback error" role="alert">
                        <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                        <p>{error}</p>
                    </div>
                ) : productos.length === 0 ? (
                    <div className="section-feedback empty">
                        <i className="fas fa-box-open" aria-hidden="true"></i>
                        <p>No hay productos disponibles.</p>
                    </div>
                ) : (
                    <ArticulosProductos productos={productos} />
                )}
            </div>
        </section>
    );
}

export default SectionArticulo;