// ============================================================
// Comisarías - Lógica para renderizar desde la BD (Supabase/Excel)
// ============================================================

const ZONAS_MAP = {
    'norte': 'Dirección General Regional Zona Norte',
    'centro': 'Dirección General Regional Zona Centro',
    'sur': 'Dirección General Regional Zona Sur'
};

// Diccionario opcional para mapas por nombre de dependencia.
// Las imágenes se declaran localmente en data/dependencias.json.
const EXTRAS_COMISARIAS = {
    "Comisaría Quinta Río Grande": {
        map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.651737754877!2d-67.73977502324707!3d-53.76673897241857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4b163e79435b87%3A0xb2b404d0ab02a1b5!2sComisaria%20Quinta!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    },
    "Comisaría de Género y Familia Río Grande": {
        map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.651737754877!2d-67.73977502324707!3d-53.76673897241857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4b163e79435b87%3A0xb2b404d0ab02a1b5!2sComisaria%20Quinta!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    },
    "Comisaría Tolhuin": {
        map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4677.346896567364!2d-67.1994626248386!3d-54.512684812601716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4c3db3bd000001%3A0xc6222b467657d423!2sComisaria%20Policial%20Tolhuin!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    },
    "Comisaría Primera Ushuaia": {
        map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4547.01633519391!2d-68.3039871!3d-54.8080894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4c22b51268cd15%3A0xc3b83b3e2b2512a2!2sComisaria%20Primera%20Ushuaia!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Identificar la zona actual desde el atributo data-zona en el body
    const zonaActual = document.body.dataset.zona;
    if (!zonaActual || !ZONAS_MAP[zonaActual]) return;

    // 2. Mostrar spinner si existe
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.classList.remove('hidden');

    // 3. Obtener datos locales. No se realizan consultas a Supabase ni a otros servicios.
    let allData = [];
    try {
        const response = await fetch('data/dependencias.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allData = await response.json();
    } catch (error) {
        console.error('No se pudo leer el archivo local de dependencias:', error);
        const grid = document.getElementById('comisariasGrid');
        if (grid) {
            grid.innerHTML = '<p class="pdtf-empty">No se pudieron cargar las dependencias. Verificá el archivo <code>comisarias/data/dependencias.json</code>.</p>';
        }
        if (spinner) spinner.classList.add('hidden');
        return;
    }

    // Deduplicar datos (ignorando case/espacios en guía, dependencia y responsable)
    const uniqueMap = new Map();
    allData.forEach(item => {
        const g = (item.guia || '').trim().toLowerCase();
        const d = (item.dependencia || '').trim().toLowerCase();
        const r = (item.responsable || '').trim().toLowerCase();
        const key = `${g}|${d}|${r}`;
        if (!uniqueMap.has(key)) {
            uniqueMap.set(key, item);
        }
    });
    allData = Array.from(uniqueMap.values());

    // 4. Filtrar datos para la zona actual
    const targetGuia = ZONAS_MAP[zonaActual];
    // Solo mostramos las que sean "Comisaría" para limpiar un poco (opcional)
    const comisariasZona = allData.filter(item => 
        item.guia === targetGuia && 
        item.dependencia.toLowerCase().includes('comisar')
    );

    // 5. Renderizar
    const grid = document.getElementById('comisariasGrid');
    if (grid) {
        grid.innerHTML = ''; // Limpiar
        
        if (comisariasZona.length === 0) {
            grid.innerHTML = '<p class="pdtf-empty">No se encontraron comisarías para esta zona.</p>';
        } else {
            // DEBUG: Ver qué columnas trae la primera comisaría (quitar después)
            console.log("Datos de la primera comisaría detectada:", comisariasZona[0]);
            
            comisariasZona.forEach(comisaria => {
                // 1. Limpieza de Título y Ciudad
                let title = comisaria.dependencia;
                let city = "";
                
                if (title.toLowerCase().includes("río grande")) {
                    title = title.replace(/Río Grande/gi, "").trim();
                    city = "Río Grande";
                } else if (title.toLowerCase().includes("ushuaia")) {
                    title = title.replace(/Ushuaia/gi, "").trim();
                    city = "Ushuaia";
                } else if (title.toLowerCase().includes("tolhuin")) {
                    title = title.replace(/Tolhuin/gi, "").trim();
                    city = "Tolhuin";
                }

                // 2. Detección de URL de mapa
                const rawMapa = comisaria.mapa || comisaria.Mapa || comisaria.MAPA || comisaria.map || null;

                const extras = EXTRAS_COMISARIAS[comisaria.dependencia] || { map: "#" };

                // Extraer link del mapa si es un iframe o generar búsqueda por defecto
                let mapLink = "#";
                const mapContent = rawMapa || extras.map;
                const tieneCoords = Number.isFinite(comisaria.lat) && Number.isFinite(comisaria.lng);
                
                if (tieneCoords) {
                    // Ubicación exacta tomada de las coordenadas (dependencias.json)
                    mapLink = `https://www.google.com/maps/search/?api=1&query=${comisaria.lat},${comisaria.lng}`;
                } else if (mapContent && mapContent.includes('<iframe')) {
                    const match = mapContent.match(/src="([^"]+)"/);
                    mapLink = match ? match[1] : "#";
                } else if (mapContent && mapContent !== "#") {
                    mapLink = mapContent;
                } else {
                    // Si no hay mapa en la BD, crear un link de búsqueda dinámico en Google Maps
                    const query = `${comisaria.dependencia} ${city} Tierra del Fuego`;
                    mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
                }

                // 3. Renderizado de la tarjeta
                const whatsapp = comisaria.whatsapp?.replace(/\D/g, '');
                const telefono = comisaria.telefono?.replace(/\D/g, '');
                const cardHtml = `
                    <article class="comisaria-card">
                        <div class="comisaria-info">
                            <h2 class="comisaria-title">
                                ${title}
                                <span class="city-suffix">${city}</span>
                            </h2>
                            
                            <ul class="comisaria-contact-list">
                                ${comisaria.direccion ? `<li>${comisaria.direccion}</li>` : ''}
                                ${comisaria.telefono ? `<li>${comisaria.telefono}</li>` : ''}
                                ${comisaria.whatsapp ? `<li>+54 9 ${comisaria.whatsapp}</li>` : ''}
                            </ul>

                            <div class="comisaria-actions">
                                <a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="action-btn">
                                    <span class="material-symbols-rounded" aria-hidden="true">location_on</span>
                                    Ir
                                </a>
                                ${whatsapp ? `<a href="https://wa.me/549${whatsapp}" target="_blank" rel="noopener noreferrer" class="action-btn">
                                    <span class="material-symbols-rounded" aria-hidden="true">chat</span>
                                    WA
                                </a>` : ''}
                                ${telefono ? `<a href="tel:${telefono}" class="action-btn">
                                    <span class="material-symbols-rounded" aria-hidden="true">call</span>
                                    Tel
                                </a>` : ''}
                            </div>
                        </div>
                    </article>
                `;
                grid.innerHTML += cardHtml;
            });
        }
    }

    if (spinner) spinner.classList.add('hidden');
});
