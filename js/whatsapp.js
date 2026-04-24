/* ============================================
   MAKI EQUIPOS - WhatsApp Integration
   Smart routing by page context
   ============================================ */

const WHATSAPP_NUMBERS = {
  ventas: {
    number: '573134004912',
    label: 'Ventas',
    description: 'Cotizaciones y alquiler de equipos'
  },
  admin: {
    number: '573142647491',
    label: 'Área Administrativa',
    description: 'Facturación y trámites'
  },
  soporte: {
    number: '573142647491',
    label: 'Soporte Técnico',
    description: 'Asistencia técnica de equipos'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppFloat();
  initWhatsAppEquipButtons();
});

/* === Floating WhatsApp Button === */
function initWhatsAppFloat() {
  const floatBtn = document.querySelector('.whatsapp-float__btn');
  const optionsPanel = document.querySelector('.whatsapp-options');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (!floatBtn) return;

  // Determine behavior based on page
  const isContactPage = currentPage.includes('contacto');
  
  if (isContactPage && optionsPanel) {
    // On contact page: show options popup
    floatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      optionsPanel.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.whatsapp-float') && !e.target.closest('.whatsapp-options')) {
        optionsPanel.classList.remove('active');
      }
    });
  } else {
    // On other pages: go directly to Ventas
    floatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp(WHATSAPP_NUMBERS.ventas.number, '¡Hola! Me interesa conocer más sobre los equipos disponibles para alquiler.');
    });
  }
}

/* === Equipment-specific WhatsApp buttons === */
function initWhatsAppEquipButtons() {
  document.querySelectorAll('[data-whatsapp-equip]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const equipName = btn.dataset.whatsappEquip;
      const message = `¡Hola! Estoy interesado en cotizar el alquiler de: *${equipName}*. ¿Podrían enviarme información de disponibilidad y precios?`;
      openWhatsApp(WHATSAPP_NUMBERS.ventas.number, message);
    });
  });
}

/* === Open WhatsApp === */
function openWhatsApp(number, message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedMessage}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* === CTA WhatsApp buttons (general) === */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-whatsapp]');
  if (btn) {
    e.preventDefault();
    const area = btn.dataset.whatsapp;
    const config = WHATSAPP_NUMBERS[area] || WHATSAPP_NUMBERS.ventas;
    const message = btn.dataset.whatsappMessage || '¡Hola! Me interesa conocer más sobre sus servicios de alquiler de maquinaria y equipo.';
    openWhatsApp(config.number, message);
  }
});
