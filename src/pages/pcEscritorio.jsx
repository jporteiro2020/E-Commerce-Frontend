import React from 'react';
import '../components/tienda.css';
import SectionArticulo from '../components/sectionArticulo';
import { useProductos } from '../hooks/useProductos';
import { getProductosPC } from '../api/productos';

function PcEscritorio() {
    const { productos, loading, error } = useProductos(getProductosPC, []);

    return (
        <main id="main">
            <SectionArticulo
                productos={productos}
                loading={loading}
                error={error}
                estiloSection="PC-Escritorio"
                idSection="PC-Escritorio"
                titulo="PC Escritorio"
                idDiv="divEscritorio"
            />
        </main>
    );
}

export default PcEscritorio;