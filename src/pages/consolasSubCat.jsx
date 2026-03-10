import React from 'react';
import { useParams } from 'react-router-dom';
import '../components/tienda.css';
import SectionArticulo from '../components/sectionArticulo';
import { useProductos } from '../hooks/useProductos';
import { getProductosConsSubCat } from '../api/productos';

function ConsolasSubCat() {
    const { stringCategoria } = useParams();
    const titulo = stringCategoria ? stringCategoria.toUpperCase() : '';

    const { productos, loading, error } = useProductos(
        () => getProductosConsSubCat(stringCategoria),
        [stringCategoria]
    );

    return (
        <main id="main">
            <SectionArticulo
                productos={productos}
                loading={loading}
                error={error}
                estiloSection="Consolas"
                idSection="Consolas"
                titulo={titulo}
                idDiv="divConsolas"
            />
        </main>
    );
}

export default ConsolasSubCat;