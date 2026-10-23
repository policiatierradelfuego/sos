/**
 * Sistema de Internacionalización (i18n) - Policía de Tierra del Fuego
 * Soporta Español (es), Inglés (en) y Portugués (pt)
 */
(function () {
  const TRANSLATIONS = {
    es: {
      lang_es: 'Español',
      lang_en: 'Inglés',
      lang_pt: 'Portugués',
      page_title_home: 'Seguridad y Emergencias - Policía de Tierra del Fuego',
      page_title_map: 'Mapa de dependencias - Policía de Tierra del Fuego',
      kicker: 'Policía de Tierra del Fuego',
      home_title: 'Seguridad y emergencias',
      home_intro: 'Accesos rápidos para pedir ayuda, comunicar una emergencia y encontrar información útil.',
      call_911_aria: 'Llamar al 911',
      emergency_title: 'Emergencias de seguridad',
      emergency_desc: 'Delitos, situaciones de riesgo y auxilio inmediato.',
      emergency_badge: 'DISPONIBLE 24 H',
      quick_access_title: 'Accesos rápidos',
      tool_nearest_title: 'Comisaría más cercana',
      tool_nearest_desc: 'Encontrá la más cercana a tu ubicación actual',
      tool_stations_title: 'Listado de comisarías',
      tool_stations_desc: 'Dependencias y contactos',
      tool_services_title: 'Trámites y servicios',
      tool_services_desc: 'Información útil y gestiones',
      tool_safety_title: 'Consejos de seguridad',
      tool_safety_desc: 'Prevención y recomendaciones',
      share_btn: 'Compartir',
      footer_home: 'En una situación de riesgo inmediato, priorizá siempre la llamada al 911.',
      share_modal_title: 'Compartir',
      share_mail: 'Correo',
      share_copy: 'Copiar',
      share_copied: '¡Copiado!',
      share_close: 'Cerrar',
      share_msg_text: 'Panel de emergencias de la Policía de Tierra del Fuego: ',
      // Mapa
      back_home: '← Volver al panel principal',
      map_title: 'Mapa de comisarías',
      map_intro: 'Geolocalización y mapa de comisarías en Tierra del Fuego. Tu ubicación nos ayuda a indicarte la comisaría más cercana en caso de ayuda.',
      gps_getting_location: 'Obteniendo ubicación del móvil...',
      gps_requesting: 'Permite el acceso al GPS para detectar la comisaría más cercana.',
      gps_detected: 'Ubicación detectada por GPS',
      gps_btn_general: 'Comisaría más cercana',
      gps_btn_family: 'Género y Familia más cercana',
      badge_nearest_general: '📍 Comisaría más cercana a tu posición',
      badge_nearest_family: '💜 Comisaría de Género y Familia más cercana',
      btn_how_to_get: 'Cómo llegar (Google Maps)',
      btn_call_911: 'Llamar 911',
      gps_notice_title: 'Activá tu ubicación',
      gps_notice_text: 'Necesitamos tu GPS para mostrarte la comisaría más cercana. Es solo para ayudarte: no guardamos tus datos.',
      gps_notice_btn: 'Entendido',
      update_available: 'Hay una nueva versión disponible',
      gps_requesting_sub: 'Solicitando coordenadas GPS al dispositivo...',
      gps_unsupported: 'Geolocalización no soportada',
      gps_unsupported_sub: 'Tu navegador o dispositivo no admite la lectura de ubicación por GPS.',
      gps_coords: 'Coordenadas: {lat}, {lng} (precisión ~{acc}m)',
      gps_unavailable: 'Ubicación GPS no disponible',
      gps_denied: 'Permiso de ubicación denegado. Podés activar el GPS en los permisos del navegador.',
      gps_no_signal: 'No se pudo obtener la señal GPS de tu dispositivo.',
      dist_meters: 'Aprox. {n} metros de tu posición',
      dist_km: 'Aprox. {n} km de tu posición',
      popup_city: 'Ciudad:',
      popup_directions: 'Cómo llegar',
      popup_you: 'Tu ubicación actual',
      page_title_stations: 'Comisarías - Policía de Tierra del Fuego',
      stations_kicker: 'Comisarías',
      stations_title: 'Comisarías',
      stations_intro: 'Elegí una zona para consultar sus dependencias y medios de contacto.',
      select_zone: 'Seleccioná una zona',
      zone_north: 'Zona Norte',
      zone_center: 'Zona Centro',
      zone_south: 'Zona Sur',
      view_stations: 'Ver comisarías',
      back_zones: '← Volver a zonas',
      see_all_zones: '← Ver todas las zonas',
      available_deps: 'Dependencias disponibles',
      loading_stations: 'Cargando comisarías...',
      stations_load_error: 'No se pudieron cargar las dependencias. Intentá nuevamente más tarde.',
      stations_empty: 'No se encontraron comisarías para esta zona.',
      page_title_rg: 'Comisarías Río Grande | Policía de Tierra del Fuego',
      page_title_tol: 'Comisarías Tolhuin | Policía de Tierra del Fuego',
      page_title_ush: 'Comisarías Ushuaia | Policía de Tierra del Fuego',
      intro_rg: 'Dependencias policiales de Río Grande.',
      intro_tol: 'Dependencias policiales de Tolhuin.',
      intro_ush: 'Dependencias policiales de Ushuaia.',
      action_go: 'Ir',
      action_tel: 'Tel',
      update_btn: 'Actualizar'
    },
    en: {
      lang_es: 'Spanish',
      lang_en: 'English',
      lang_pt: 'Portuguese',
      page_title_home: 'Safety & Emergencies - Tierra del Fuego Police',
      page_title_map: 'Police Stations Map - Tierra del Fuego Police',
      kicker: 'Tierra del Fuego Police',
      home_title: 'Safety & Emergencies',
      home_intro: 'Quick access to call for help, report an emergency, and find useful information.',
      call_911_aria: 'Call 911',
      emergency_title: 'Security Emergencies',
      emergency_desc: 'Crimes, risk situations, and immediate assistance.',
      emergency_badge: 'AVAILABLE 24/7',
      quick_access_title: 'Quick Access',
      tool_nearest_title: 'Nearest Police Station',
      tool_nearest_desc: 'Find the closest station to your current location',
      tool_stations_title: 'Police Stations List',
      tool_stations_desc: 'Facilities and contact details',
      tool_services_title: 'Procedures & Services',
      tool_services_desc: 'Useful information and administrative procedures',
      tool_safety_title: 'Safety Advice',
      tool_safety_desc: 'Prevention and recommendations',
      share_btn: 'Share',
      footer_home: 'In an immediate risk situation, always prioritize calling 911.',
      share_modal_title: 'Share',
      share_mail: 'Email',
      share_copy: 'Copy',
      share_copied: 'Copied!',
      share_close: 'Close',
      share_msg_text: 'Tierra del Fuego Police Emergency Panel: ',
      // Mapa
      back_home: '← Back to main panel',
      map_title: 'Police Stations Map',
      map_intro: 'Geolocation and map of police stations in Tierra del Fuego. Your location helps us direct you to the nearest station in an emergency.',
      gps_getting_location: 'Getting device location...',
      gps_requesting: 'Allow GPS access to find the nearest police station.',
      gps_detected: 'Location detected by GPS',
      gps_btn_general: 'Nearest Police Station',
      gps_btn_family: 'Nearest Family & Gender Station',
      badge_nearest_general: '📍 Nearest police station to your location',
      badge_nearest_family: '💜 Nearest Family & Gender station',
      btn_how_to_get: 'Get Directions (Google Maps)',
      btn_call_911: 'Call 911',
      gps_notice_title: 'Enable your location',
      gps_notice_text: 'We need your GPS to show you the nearest police station. It is only to assist you: we do not store your data.',
      gps_notice_btn: 'Got it',
      update_available: 'A new version is available',
      gps_requesting_sub: 'Requesting GPS coordinates from the device...',
      gps_unsupported: 'Geolocation not supported',
      gps_unsupported_sub: 'Your browser or device does not support GPS location.',
      gps_coords: 'Coordinates: {lat}, {lng} (accuracy ~{acc}m)',
      gps_unavailable: 'GPS location unavailable',
      gps_denied: 'Location permission denied. You can enable GPS in your browser permissions.',
      gps_no_signal: 'Could not get a GPS signal from your device.',
      dist_meters: 'Approx. {n} meters from your position',
      dist_km: 'Approx. {n} km from your position',
      popup_city: 'City:',
      popup_directions: 'Get directions',
      popup_you: 'Your current location',
      page_title_stations: 'Police Stations - Tierra del Fuego Police',
      stations_kicker: 'Police Stations',
      stations_title: 'Police Stations',
      stations_intro: 'Choose a zone to see its facilities and contact details.',
      select_zone: 'Select a zone',
      zone_north: 'North Zone',
      zone_center: 'Central Zone',
      zone_south: 'South Zone',
      view_stations: 'View stations',
      back_zones: '← Back to zones',
      see_all_zones: '← See all zones',
      available_deps: 'Available facilities',
      loading_stations: 'Loading police stations...',
      stations_load_error: 'Facilities could not be loaded. Please try again later.',
      stations_empty: 'No police stations were found for this zone.',
      page_title_rg: 'Río Grande Police Stations | Tierra del Fuego Police',
      page_title_tol: 'Tolhuin Police Stations | Tierra del Fuego Police',
      page_title_ush: 'Ushuaia Police Stations | Tierra del Fuego Police',
      intro_rg: 'Police facilities in Río Grande.',
      intro_tol: 'Police facilities in Tolhuin.',
      intro_ush: 'Police facilities in Ushuaia.',
      action_go: 'Go',
      action_tel: 'Call',
      update_btn: 'Update'
    },
    pt: {
      lang_es: 'Espanhol',
      lang_en: 'Inglês',
      lang_pt: 'Português',
      page_title_home: 'Segurança e Emergências - Polícia da Terra do Fogo',
      page_title_map: 'Mapa de delegacias - Polícia da Terra do Fogo',
      kicker: 'Polícia da Terra do Fogo',
      home_title: 'Segurança e emergências',
      home_intro: 'Acesso rápido para pedir ajuda, comunicar uma emergência e encontrar informações úteis.',
      call_911_aria: 'Ligar para o 911',
      emergency_title: 'Emergências de segurança',
      emergency_desc: 'Crimes, situações de risco e assistência imediata.',
      emergency_badge: 'DISPONÍVEL 24 H',
      quick_access_title: 'Acessos rápidos',
      tool_nearest_title: 'Delegacia mais próxima',
      tool_nearest_desc: 'Encontre a mais próxima da sua localização atual',
      tool_stations_title: 'Lista de delegacias',
      tool_stations_desc: 'Unidades e contatos',
      tool_services_title: 'Procedimentos e serviços',
      tool_services_desc: 'Informações úteis e serviços administrativos',
      tool_safety_title: 'Dicas de segurança',
      tool_safety_desc: 'Prevenção e recomendações',
      share_btn: 'Compartilhar',
      footer_home: 'Em uma situação de risco imediato, priorize sempre a ligação para o 911.',
      share_modal_title: 'Compartilhar',
      share_mail: 'E-mail',
      share_copy: 'Copiar',
      share_copied: 'Copiado!',
      share_close: 'Fechar',
      share_msg_text: 'Painel de Emergência da Polícia da Terra do Fogo: ',
      // Mapa
      back_home: '← Voltar ao painel principal',
      map_title: 'Mapa de delegacias',
      map_intro: 'Geolocalização e mapa de delegacias na Terra do Fogo. Sua localização nos ajuda a indicar a delegacia mais próxima.',
      gps_getting_location: 'Obtendo localização do dispositivo...',
      gps_requesting: 'Permita o acesso ao GPS para detectar a delegacia mais próxima.',
      gps_detected: 'Localização detectada por GPS',
      gps_btn_general: 'Delegacia mais próxima',
      gps_btn_family: 'Gênero e Família mais próxima',
      badge_nearest_general: '📍 Delegacia mais próxima da sua localização',
      badge_nearest_family: '💜 Delegacia de Gênero e Família mais próxima',
      btn_how_to_get: 'Como chegar (Google Maps)',
      btn_call_911: 'Ligar 911',
      gps_notice_title: 'Ative sua localização',
      gps_notice_text: 'Precisamos do seu GPS para mostrar a delegacia mais próxima. É apenas para ajudar você: não armazenamos seus dados.',
      gps_notice_btn: 'Entendido',
      update_available: 'Uma nova versão está disponível',
      gps_requesting_sub: 'Solicitando coordenadas GPS ao dispositivo...',
      gps_unsupported: 'Geolocalização não suportada',
      gps_unsupported_sub: 'Seu navegador ou dispositivo não permite a leitura de localização por GPS.',
      gps_coords: 'Coordenadas: {lat}, {lng} (precisão ~{acc}m)',
      gps_unavailable: 'Localização GPS indisponível',
      gps_denied: 'Permissão de localização negada. Você pode ativar o GPS nas permissões do navegador.',
      gps_no_signal: 'Não foi possível obter o sinal GPS do seu dispositivo.',
      dist_meters: 'Aprox. {n} metros da sua posição',
      dist_km: 'Aprox. {n} km da sua posição',
      popup_city: 'Cidade:',
      popup_directions: 'Como chegar',
      popup_you: 'Sua localização atual',
      page_title_stations: 'Delegacias - Polícia da Terra do Fogo',
      stations_kicker: 'Delegacias',
      stations_title: 'Delegacias',
      stations_intro: 'Escolha uma zona para consultar suas unidades e meios de contato.',
      select_zone: 'Selecione uma zona',
      zone_north: 'Zona Norte',
      zone_center: 'Zona Centro',
      zone_south: 'Zona Sul',
      view_stations: 'Ver delegacias',
      back_zones: '← Voltar às zonas',
      see_all_zones: '← Ver todas as zonas',
      available_deps: 'Unidades disponíveis',
      loading_stations: 'Carregando delegacias...',
      stations_load_error: 'Não foi possível carregar as unidades. Tente novamente mais tarde.',
      stations_empty: 'Nenhuma delegacia foi encontrada para esta zona.',
      page_title_rg: 'Delegacias de Río Grande | Polícia da Terra do Fogo',
      page_title_tol: 'Delegacias de Tolhuin | Polícia da Terra do Fogo',
      page_title_ush: 'Delegacias de Ushuaia | Polícia da Terra do Fogo',
      intro_rg: 'Unidades policiais de Río Grande.',
      intro_tol: 'Unidades policiais de Tolhuin.',
      intro_ush: 'Unidades policiais de Ushuaia.',
      action_go: 'Ir',
      action_tel: 'Ligar',
      update_btn: 'Atualizar'
    }
  };

  const STORAGE_KEY = 'pdtf_lang';

  function detectLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;

    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('pt')) return 'pt';
    if (navLang.startsWith('en')) return 'en';
    return 'es';
  }

  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'es';
    const dict = TRANSLATIONS[lang];
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // Actualizar elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Actualizar atributos específicos (data-i18n-attr="attr:key,attr2:key2")
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const mappings = el.getAttribute('data-i18n-attr').split(',');
      mappings.forEach(m => {
        const [attr, key] = m.split(':').map(s => s.trim());
        if (attr && key && dict[key]) {
          el.setAttribute(attr, dict[key]);
        }
      });
    });

    // Actualizar botones de cambio de idioma
    document.querySelectorAll('.pdtf-lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Evento personalizado para páginas que necesitan lógica extra
    window.dispatchEvent(new CustomEvent('pdtf:languagechange', { detail: { lang, dict } }));
  }

  window.PDTF_i18n = {
    get current() {
      return localStorage.getItem(STORAGE_KEY) || detectLanguage();
    },
    t(key) {
      const lang = this.current;
      return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.es && TRANSLATIONS.es[key]) || key;
    },
    setLanguage: applyLanguage,
    translations: TRANSLATIONS
  };

  // Inicializar al cargar el DOM o script
  function init() {
    const lang = detectLanguage();
    applyLanguage(lang);

    // Delegación de clics para selectores de idioma
    document.addEventListener('click', e => {
      const btn = e.target.closest('.pdtf-lang-btn');
      if (btn) {
        const newLang = btn.getAttribute('data-lang');
        if (newLang) applyLanguage(newLang);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
