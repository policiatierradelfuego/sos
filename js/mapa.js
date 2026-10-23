// ============================================================
// Mapa de Dependencias - Lectura de CSV y Geolocalización GPS
// Policía de Tierra del Fuego
// ============================================================

// 1. Datos de comisarías: se leen del JSON unificado (el mismo que usa la página de comisarías).
//    Cada página toma solo los campos que necesita (aquí: nombre, ciudad, lat, lng).
const DEPENDENCIAS_URL = 'comisarias/data/dependencias.json';
let COMISARIAS_DATA = [];

async function cargarComisarias() {
    const response = await fetch(DEPENDENCIAS_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const ciudades = ['Río Grande', 'Ushuaia', 'Tolhuin'];
    COMISARIAS_DATA = data
        .filter(d => /comisar/i.test(d.dependencia) && Number.isFinite(d.lat) && Number.isFinite(d.lng))
        .map(d => {
            const ciudad = ciudades.find(c => d.dependencia.toLowerCase().includes(c.toLowerCase())) || '';
            const nombre = ciudad
                ? d.dependencia.replace(new RegExp(ciudad, 'gi'), '').replace(/\s+/g, ' ').trim()
                : d.dependencia;
            return { ciudad, nombre, lat: d.lat, lng: d.lng };
        });
}

let map = null;
let userMarker = null;
let userCircle = null;

// Modo de búsqueda: 'general' (sin Género y Familia) o 'genero' (solo Género y Familia)
let modoBusqueda = 'general';

function esGeneroYFamilia(c) {
    return c.nombre.includes('Género y Familia');
}

// --- i18n: traducción de textos dinámicos (se vuelven a dibujar al cambiar de idioma) ---
const tr = (k, p) => {
    let s = window.PDTF_i18n ? window.PDTF_i18n.t(k) : k;
    if (p) Object.keys(p).forEach(n => { s = s.replace('{' + n + '}', p[n]); });
    return s;
};

let estadoGps = { title: 'gps_getting_location', sub: 'gps_requesting', params: null };
let ultimoCercano = null; // { comisaria, distKm, buscaGenero }

function renderGps() {
    const t = document.getElementById('gpsTitle');
    const s = document.getElementById('gpsSubtitle');
    if (t) t.textContent = tr(estadoGps.title);
    if (s) s.textContent = tr(estadoGps.sub, estadoGps.params);
}

function setEstadoGps(title, sub, params) {
    estadoGps = { title, sub, params: params || null };
    renderGps();
}

function renderCercano() {
    if (!ultimoCercano) return;
    const { comisaria, distKm, buscaGenero } = ultimoCercano;
    document.getElementById('nearestBadge').textContent = tr(buscaGenero ? 'badge_nearest_family' : 'badge_nearest_general');
    document.getElementById('nearestName').textContent = `${comisaria.nombre} (${comisaria.ciudad})`;
    document.getElementById('nearestDist').textContent = distKm < 1
        ? tr('dist_meters', { n: Math.round(distKm * 1000) })
        : tr('dist_km', { n: distKm.toFixed(2) });
}

window.addEventListener('pdtf:languagechange', () => {
    renderGps();
    renderCercano();
});

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

    // Icono violeta para Comisarías de Género y Familia
    const generoIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Agregar marcadores de todas las comisarías en el mapa
    COMISARIAS_DATA.forEach(c => {
        const marker = L.marker([c.lat, c.lng], { icon: esGeneroYFamilia(c) ? generoIcon : comisariaIcon }).addTo(map);
        const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;
        // El contenido se genera al abrir el popup, así siempre respeta el idioma activo
        marker.bindPopup(() => `
            <div class="popup-content">
                <h4>${c.nombre}</h4>
                <p><strong>${tr('popup_city')}</strong> ${c.ciudad}</p>
                <a class="popup-link" href="${mapUrl}" target="_blank">🗺️ ${tr('popup_directions')}</a>
            </div>
        `);
    });

    // Cargar posición del usuario mediante GPS.
    // Si el permiso ya fue concedido se pide de inmediato; si no, se espera a que el
    // usuario cierre el cartel informativo (ver mapa.html) para que el aviso salga primero.
    if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' })
            .then(r => { if (r.state === 'granted') obtenerUbicacionGPS(); })
            .catch(() => {});
    }
}

// Función para solicitar ubicación GPS
// modo: 'general' (comisarías que no son Género y Familia) o 'genero' (solo Género y Familia)
function obtenerUbicacionGPS(modo) {
    if (modo === 'general' || modo === 'genero') modoBusqueda = modo;
    const buscaGenero = modoBusqueda === 'genero';

    document.getElementById('recenterBtn').classList.toggle('gps-btn--active', !buscaGenero);
    document.getElementById('generoBtn').classList.toggle('gps-btn--active', buscaGenero);
    const gpsIcon = document.getElementById('gpsIcon');

    if (!navigator.geolocation) {
        setEstadoGps('gps_unsupported', 'gps_unsupported_sub');
        return;
    }

    setEstadoGps('gps_getting_location', 'gps_requesting_sub');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Actualizar interfaz GPS
            setEstadoGps('gps_detected', 'gps_coords', {
                lat: userLat.toFixed(4),
                lng: userLng.toFixed(4),
                acc: Math.round(accuracy)
            });
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
                userMarker.bindPopup(() => `<strong>📍 ${tr('popup_you')}</strong>`).openPopup();
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

            COMISARIAS_DATA.filter(c => esGeneroYFamilia(c) === buscaGenero).forEach(c => {
                const dist = calcularDistanciaKm(userLat, userLng, c.lat, c.lng);
                if (dist < menorDistancia) {
                    menorDistancia = dist;
                    comisariaMasCercana = c;
                }
            });

            if (comisariaMasCercana) {
                // Mostrar banner con la comisaría más cercana
                const nearestBanner = document.getElementById('nearestBanner');
                const nearestNavBtn = document.getElementById('nearestNavBtn');

                ultimoCercano = { comisaria: comisariaMasCercana, distKm: menorDistancia, buscaGenero };
                renderCercano();

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
            if (error.code === error.PERMISSION_DENIED) {
                setEstadoGps('gps_unavailable', 'gps_denied');
            } else {
                setEstadoGps('gps_unavailable', 'gps_no_signal');
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await cargarComisarias();
    } catch (error) {
        console.error('No se pudo leer dependencias.json:', error);
    }
    initMap();
});
