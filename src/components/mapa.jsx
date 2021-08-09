import React, { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapa.css';
import mapboxgl from 'mapbox-gl';

function Mapa({ sucursal }) {
    const [direccion, setDireccion] = useState('');

    useEffect( () => {
        function cargarMapa(lat, lng){
            mapboxgl.accessToken = 'pk.eyJ1IjoianBvcnRlaXJvIiwiYSI6ImNrbm54MzV4eTEyaXoyc294Y3F3bXV0d3AifQ.MLAbktKm3nrID_oLqs1B8g';
            const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [lng, lat], // starting position [lng, lat]
                zoom: 16 // starting zoom
            });
    
            new mapboxgl.Marker({
                color: "black",
                draggable: false
                }).setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup().setHTML(sucursal))
                .addTo(map);
            
                map.addControl(new mapboxgl.NavigationControl());
                map.addControl(new mapboxgl.FullscreenControl());
        }

        if(sucursal === 'Sucursal 1'){
            setDireccion('Juan Paullier 2378 entre Amézaga y Domingo Aramburú');
            cargarMapa(-34.883817, -56.171343);
        }

        if(sucursal === 'Sucursal 2'){
            setDireccion('Demóstenes 3532');
            cargarMapa(-34.898653, -56.138224);
        }
    }, [sucursal]);

    

    return(
        <main id="main">
            <div id="contenedor">
                <div id="map"></div>
                <div className="horario">
                    <p>Nuestro horario de atención es:</p>
                    <ul>
                        <li>De Lunes a Viernes de 9:00 a 13 y 14 a 19 hrs</li>
                        <li>Los Sábados de  9 a 14hrs</li>
                    </ul>
                </div>
                <div className="ubicacion">
                    <p>Dirección:</p>
                    <ul>
                        <li>{ direccion }</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
  
export default Mapa;