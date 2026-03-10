import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';

// Fix default marker icons broken by Vite's asset pipeline
import markerIcon2x  from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon    from 'leaflet/dist/images/marker-icon.png';
import markerShadow  from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl:       markerIcon,
    shadowUrl:     markerShadow,
});

const SUCURSALES = {
    'Sucursal 1': {
        lat:      -34.883817,
        lng:      -56.171343,
        direccion: 'Juan Paullier 2378 entre Amézaga y Domingo Aramburú',
    },
    'Sucursal 2': {
        lat:      -34.898653,
        lng:      -56.138224,
        direccion: 'Demóstenes 3532',
    },
};

function Mapa({ sucursal }) {
    const info = SUCURSALES[sucursal];

    const center = useMemo(
        () => (info ? [info.lat, info.lng] : [-34.891, -56.154]),
        [info]
    );

    if (!info) {
        return (
            <main id="main">
                <p>Sucursal no encontrada.</p>
            </main>
        );
    }

    return (
        <main id="main">
            <div id="contenedor">
                <MapContainer
                    key={sucursal}
                    center={center}
                    zoom={16}
                    id="map"
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={center}>
                        <Popup>
                            <strong>IT's Possible — {sucursal}</strong><br />
                            {info.direccion}
                        </Popup>
                    </Marker>
                </MapContainer>

                <div className="horario">
                    <h3>Horario de atención</h3>
                    <ul>
                        <li>Lunes a Viernes: 9:00–13:00 y 14:00–19:00 hs</li>
                        <li>Sábados: 9:00–14:00 hs</li>
                    </ul>
                </div>

                <div className="ubicacion">
                    <h3>Dirección</h3>
                    <ul>
                        <li>{info.direccion}</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default Mapa;
