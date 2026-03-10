import React from 'react';
import { useParams } from 'react-router-dom';
import '../components/tienda.css';
import SectionArticulo from '../components/sectionArticulo';
import { useProductos } from '../hooks/useProductos';
import { buscarProductos } from '../api/productos';

function Busqueda() {
    const { stringBusqueda } = useParams();

    const { productos, loading, error } = useProductos(
        () => buscarProductos(stringBusqueda),
        [stringBusqueda]
    );

    return (
        <main id="main">
            <SectionArticulo
                productos={productos}
                loading={loading}
                error={error}
                estiloSection="destacado"
                idSection="busqueda"
                titulo={`Resultados para "${stringBusqueda}"`}
                idDiv="divBusqueda"
            />
        </main>
    );
}

export default Busqueda;