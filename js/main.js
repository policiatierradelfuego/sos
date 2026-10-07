/**
 * Panel de Seguridad y Emergencias - Policía de Tierra del Fuego
 * JS Interactivo (opcional para tracking de clicks, animaciones o comportamientos)
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Panel de Emergencias Policía TDF cargado correctamente.');

  // Ejemplo: Interceptación o log de eventos para analítica de botones de emergencia si se requiere
  const emergencyLinks = document.querySelectorAll('.pdtf-emergency, .pdtf-911');
  emergencyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetNumber = link.getAttribute('href');
      console.log(`Llamada directa iniciada hacia: ${targetNumber}`);
    });
  });
});
