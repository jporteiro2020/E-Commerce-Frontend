import React from 'react';
import '../components/tienda.css';
import SectionArticulo from '../components/sectionArticulo';
import { useProductos } from '../hooks/useProductos';
import {
    getDestacados,
    getProductosPC,
    getProductosNotebooks,
    getProductosConsolas,
} from '../api/productos';

function Tienda() {
    const { productos: destacados,    loading: lD  } = useProductos(getDestacados,         []);
    const { productos: pcsEscritorio, loading: lPC } = useProductos(getProductosPC,          []);
    const { productos: notebooks,     loading: lNot } = useProductos(getProductosNotebooks,  []);
    const { productos: consolas,      loading: lCons } = useProductos(getProductosConsolas,  []);

    return (
        <main id="main">
            <SectionArticulo productos={destacados}    loading={lD}    estiloSection="destacado"    idSection="destacados"    titulo="Destacados"    idDiv="divDestacado" />
            <SectionArticulo productos={pcsEscritorio} loading={lPC}   estiloSection="PC-Escritorio" idSection="PC-Escritorio" titulo="PC Escritorio" idDiv="divEscritorio" />
            <SectionArticulo productos={notebooks}     loading={lNot}  estiloSection="Notebooks"    idSection="Notebooks"    titulo="Notebooks"    idDiv="divNotebook" />
            <SectionArticulo productos={consolas}      loading={lCons} estiloSection="Consolas"     idSection="Consolas"     titulo="Consolas"     idDiv="divConsolas" />
        </main>
    );
}

export default Tienda;