let mipos;

function geoFindMe() {

    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      return;
    }

    /* Con esta función, en caso de que pudimos obtener correctamente la ubicación actual del usuario, dibuja el mapa con
       la posición actual del usuario y la posición de la sucursal, y dibuja un camino entre ambos puntos */
    function success(pos) {
        mipos = {lat: pos.coords.latitude, lon: pos.coords.longitude};

        /* Se instancia un nuevo mapa */
        mymap = new L.map("mapid").setView([mipos.lat, mipos.lon], 15);

        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianBvcnRlaXJvIiwiYSI6ImNrbm54MzV4eTEyaXoyc294Y3F3bXV0d3AifQ.MLAbktKm3nrID_oLqs1B8g",
            {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            accessToken: "your.mapbox.access.token"
            }
        ).addTo(mymap);

        L.marker([mipos.lat, mipos.lon])
            .bindPopup('YO')
            .addTo(mymap);

        /* Se crea la ruta entre ambas ubicaciones */
        L.Routing.control({
            waypoints: [
                L.latLng(mipos.lat, mipos.lon),
                L.latLng(-34.898653, -56.138224)
            ]
        }).addTo(mymap);
    }

    /* Con esta función, en caso de que NO pudimos obtener correctamente la ubicación actual del usuario, dibuja el mapa con
       la posición de la sucursal */
    function error() {

        /* Se instancia un nuevo mapa */
        mymap = new L.map("mapid").setView([-34.898653, -56.138224], 15);

        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianBvcnRlaXJvIiwiYSI6ImNrbm54MzV4eTEyaXoyc294Y3F3bXV0d3AifQ.MLAbktKm3nrID_oLqs1B8g",
            {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            accessToken: "your.mapbox.access.token"
            }
        ).addTo(mymap);

        /* Se marca la posición de la sucursal */
        L.marker([-34.898653, -56.138224])
            .bindPopup('Sucursal 2')
            .addTo(mymap);
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe();