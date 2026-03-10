import React from 'react';
import '../components/tienda.css';
import SectionArticulo from '../components/sectionArticulo';
import { useProductos } from '../hooks/useProductos';
import { getProductosConsolas } from '../api/productos';

function Consolas() {
    const { productos, loading, error } = useProductos(getProductosConsolas, []);

    return (
        <main id="main">
            <SectionArticulo
                productos={productos}
                loading={loading}
                error={error}
                estiloSection="Consolas"
                idSection="Consolas"
                titulo="Consolas"
                idDiv="divConsolas"
            />
        </main>
    );
}

export default Consolas;