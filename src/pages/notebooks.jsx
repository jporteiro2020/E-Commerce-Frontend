import React from 'react';
import '../components/tienda.css';
import SectionArticulo from '../components/sectionArticulo';
import { useProductos } from '../hooks/useProductos';
import { getProductosNotebooks } from '../api/productos';

function Notebooks() {
    const { productos, loading, error } = useProductos(getProductosNotebooks, []);

    return (
        <main id="main">
            <SectionArticulo
                productos={productos}
                loading={loading}
                error={error}
                estiloSection="Notebooks"
                idSection="Notebooks"
                titulo="Notebooks"
                idDiv="divNotebook"
            />
        </main>
    );
}

export default Notebooks;