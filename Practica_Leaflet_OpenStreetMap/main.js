let lat
let lon

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta) => {
            lat =   20.86904034204911
            lon =   -98.31314110838478

            const coordenadas = [lat, lon]

            let map = L.map('map').setView(coordenadas, 16);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">openstreetmap</a>'
            }).addTo(map);

            let marcador = L.marker(coordenadas).addTo(map)
            var polygon = L.polygon([
                [20.869024614888094, -98.31317477107365],
                [20.869098532530508, -98.31309903002368],
                [20.86897586067852, -98.31295764673041],
                [20.868887788517927, -98.31303507091484]
            ]).addTo(map);
            marcador.bindPopup('<b>Estoy Aqui...</b> <br> Mis coordenadas son: <br>Latitud: ' +
                lat + '<br>Longitud: ' + lon).openPopup();
            polygon.bindPopup("Hola! este es el perimetro de mi casa y aqui es donde vivo");

        },
        ()=> { })
} else {

}