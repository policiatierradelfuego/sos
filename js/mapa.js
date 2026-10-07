// ============================================================
// Mapa de Dependencias - Lectura de CSV y Geolocalización GPS
// Policía de Tierra del Fuego
// ============================================================

// 1. Coordenadas parseadas directamente desde comisarias_coordenadas.csv
const COMISARIAS_DATA = [
    { ciudad: "Río Grande", nombre: "Comisaría Primera", lat: -53.7861167, lng: -67.7030976 },
    { ciudad: "Río Grande", nombre: "Comisaría Segunda", lat: -53.7920361, lng: -67.7208994 },
    { ciudad: "Río Grande", nombre: "Comisaría Tercera", lat: -53.7695004, lng: -67.7273625 },
    { ciudad: "Río Grande", nombre: "Comisaría Cuarta", lat: -53.8026975, lng: -67.6650583 },
    { ciudad: "Río Grande", nombre: "Comisaría Quinta", lat: -53.8020978, lng: -67.7538777 },
    { ciudad: "Río Grande", nombre: "Comisaría de Género y Familia", lat: -53.7950986, lng: -67.7252179 },
    { ciudad: "Tolhuin", nombre: "Comisaría Tolhuin", lat: -54.5117301, lng: -67.1961215 },
    { ciudad: "Tolhuin", nombre: "Comisaría de Género y Familia", lat: -54.5060194, lng: -67.2011994 },
    { ciudad: "Ushuaia", nombre: "Comisaría Primera", lat: -54.8035661, lng: -68.3146294 },
    { ciudad: "Ushuaia", nombre: "Comisaría Segunda", lat: -54.8174216, lng: -68.3353046 },
    { ciudad: "Ushuaia", nombre: "Comisaría Cuarta", lat: -54.830547, lng: -68.3567312 },
    { ciudad: "Ushuaia", nombre: "Comisaría Quinta", lat: -54.78695, lng: -68.27268 },
    { ciudad: "Ushuaia", nombre: "Comisaría de Género y Familia N.º 2", lat: -54.7912559, lng: -68.2637382 },
    { ciudad: "Ushuaia", nombre: "Comisaría de Género y Familia N.º 1", lat: -54.8056929, lng: -68.3053641 }
];

let map = null;
let userMarker = null;
let userCircle = null;

// Fórmula de Haversine para calcular distancia en kilómetros entre 2 puntos GPS
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Inicialización del Mapa Leaflet
function initMap() {
    // Centro inicial general (Tierra del Fuego)
    const centroInicial = [-54.8035, -68.3146]; // Ushuaia por defecto
    map = L.map('map').setView(centroInicial, 12);

    // Servidor de mapas gratuito OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Icono azul para Comisarías
    const comisariaIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Agregar marcadores de todas las comisarías en el mapa
    COMISARIAS_DATA.forEach(c => {
        const marker = L.marker([c.lat, c.lng], { icon: comisariaIcon }).addTo(map);
        const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;
        marker.bindPopup(`
            <div class="popup-content">
                <h4>${c.nombre}</h4>
                <p><strong>Ciudad:</strong> ${c.ciudad}</p>
                <a class="popup-link" href="${mapUrl}" target="_blank">🗺️ Cómo llegar</a>
            </div>
        `);
    });

    // Cargar posición del usuario mediante GPS
    obtenerUbicacionGPS();
}

// Función para solicitar ubicación GPS
function obtenerUbicacionGPS() {
    const gpsTitle = document.getElementById('gpsTitle');
    const gpsSubtitle = document.getElementById('gpsSubtitle');
    const gpsIcon = document.getElementById('gpsIcon');

    if (!navigator.geolocation) {
        gpsTitle.textContent = "Geolocalización no soportada";
        gpsSubtitle.textContent = "Tu navegador o dispositivo no admite la lectura de ubicación por GPS.";
        return;
    }

    gpsTitle.textContent = "Obteniendo ubicación del móvil...";
    gpsSubtitle.textContent = "Solicitando coordenadas GPS al dispositivo...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Actualizar interfaz GPS
            gpsTitle.textContent = "Ubicación detectada por GPS";
            gpsSubtitle.textContent = `Coordenadas: ${userLat.toFixed(4)}, ${userLng.toFixed(4)} (precisión ~${Math.round(accuracy)}m)`;
            if (gpsIcon) gpsIcon.classList.add('active');

            // Icono rojo para el móvil / usuario
            const userIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            // Si ya existía el marcador del usuario, actualizarlo
            if (userMarker) {
                userMarker.setLatLng([userLat, userLng]);
            } else {
                userMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(map);
                userMarker.bindPopup("<strong>📍 Tu Ubicación Actual</strong>").openPopup();
            }

            // Si ya existía el círculo de precisión, actualizarlo
            if (userCircle) {
                userCircle.setLatLng([userLat, userLng]);
                userCircle.setRadius(accuracy);
            } else {
                userCircle = L.circle([userLat, userLng], {
                    color: '#e74c3c',
                    fillColor: '#e74c3c',
                    fillOpacity: 0.15,
                    radius: accuracy
                }).addTo(map);
            }

            // Calcular cuál es la comisaría más cercana
            let comisariaMasCercana = null;
            let menorDistancia = Infinity;

            COMISARIAS_DATA.forEach(c => {
                const dist = calcularDistanciaKm(userLat, userLng, c.lat, c.lng);
                if (dist < menorDistancia) {
                    menorDistancia = dist;
                    comisariaMasCercana = c;
                }
            });

            if (comisariaMasCercana) {
                // Mostrar banner con la comisaría más cercana
                const nearestBanner = document.getElementById('nearestBanner');
                const nearestName = document.getElementById('nearestName');
                const nearestDist = document.getElementById('nearestDist');
                const nearestNavBtn = document.getElementById('nearestNavBtn');

                nearestName.textContent = `${comisariaMasCercana.nombre} (${comisariaMasCercana.ciudad})`;
                
                let distTexto = menorDistancia < 1 
                    ? `Aprox. ${Math.round(menorDistancia * 1000)} metros de tu posición`
                    : `Aprox. ${menorDistancia.toFixed(2)} km de tu posición`;
                
                nearestDist.textContent = distTexto;
                
                const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${comisariaMasCercana.lat},${comisariaMasCercana.lng}`;
                nearestNavBtn.href = mapsDirUrl;
                
                nearestBanner.classList.add('active');

                // Reorientar el mapa mostrando tanto la posición como la comisaría cercana
                const bounds = L.latLngBounds([
                    [userLat, userLng],
                    [comisariaMasCercana.lat, comisariaMasCercana.lng]
                ]);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        },
        (error) => {
            console.warn("Error o denegación de GPS:", error);
            gpsTitle.textContent = "Ubicación GPS no disponible";
            if (error.code === error.PERMISSION_DENIED) {
                gpsSubtitle.textContent = "Permiso de ubicación denegado por el usuario. Puedes activar el GPS en los permisos del navegador.";
            } else {
                gpsSubtitle.textContent = "No se pudo obtener la señal GPS de tu dispositivo.";
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

document.addEventListener('DOMContentLoaded', initMap);
