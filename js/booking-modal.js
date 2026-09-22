/**
 * KTM Butwal Showroom - Test Ride Booking & Quotation Modal Handler
 */

function openBookingModal(bikeId = null, serviceType = 'Test Ride') {
  const modal = document.getElementById('bookingModal');
  const bikeSelect = document.getElementById('modalBikeSelect');
  const serviceTypeInput = document.getElementById('modalServiceType');
  const titleEl = document.getElementById('modalTitle');

  if (!modal) return;

  if (titleEl) {
    titleEl.textContent = serviceType === 'Test Ride' ? 'BOOK A TEST RIDE — BUTWAL' : 'GET ON-ROAD PRICE QUOTATION';
  }

  if (serviceTypeInput) {
    serviceTypeInput.value = serviceType;
  }

  // Populate bike dropdown if needed
  if (bikeSelect && bikeSelect.children.length <= 1) {
    const bikes = window.KTM_BIKES_DATA || [];
    bikeSelect.innerHTML = '<option value="">-- Choose Your KTM Machine --</option>' + 
      bikes.map(b => `<option value="${b.name}">${b.name} (${b.priceFormatted})</option>`).join('');
  }

  if (bikeId && bikeSelect) {
    const bikes = window.KTM_BIKES_DATA || [];
    const found = bikes.find(b => b.id === bikeId);
    if (found) {
      bikeSelect.value = found.name;
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('modalName')?.value || '';
  const phone = document.getElementById('modalPhone')?.value || '';
  const bike = document.getElementById('modalBikeSelect')?.value || 'KTM Motorcycle';
  const date = document.getElementById('modalDate')?.value || 'Earliest Available';
  const serviceType = document.getElementById('modalServiceType')?.value || 'Test Ride';
  const notes = document.getElementById('modalNotes')?.value || '';

  if (!name || !phone) {
    alert('Please provide your name and phone number.');
    return;
  }

  const bookingCode = 'KTM-BTW-' + Math.floor(1000 + Math.random() * 9000);

  // Construct pre-filled WhatsApp message for Highway Autovilla Butwal
  const waMessage = encodeURIComponent(
    `Hello KTM Butwal (Highway Autovilla),\n\n` +
    `I would like to request a *${serviceType}* via your official website.\n\n` +
    `• Name: ${name}\n` +
    `• Phone: +977 ${phone}\n` +
    `• Bike: ${bike}\n` +
    `• Preferred Date: ${date}\n` +
    `• Booking Ref: ${bookingCode}\n` +
    (notes ? `• Remarks: ${notes}\n\n` : '\n') +
    `Please confirm the schedule at Kalikanagar showroom. Thank you!`
  );

  const waUrl = `https://wa.me/9779802622282?text=${waMessage}`;

  // Show Success Banner inside modal before redirecting
  const formWrap = document.getElementById('modalFormContainer');
  if (formWrap) {
    formWrap.innerHTML = `
      <div class="booking-success-box">
        <div class="success-icon">🏁</div>
        <h3>BOOKING SUBMITTED!</h3>
        <p class="success-ref">Booking Reference: <strong>${bookingCode}</strong></p>
        <p>Our sales team at <strong>Highway Autovilla Kalikanagar, Butwal</strong> will contact you promptly at <strong>+977 ${phone}</strong>.</p>
        <div class="success-actions">
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-ktm-whatsapp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Open in WhatsApp Instantly
          </a>
          <button type="button" class="btn-ktm-outline" onclick="closeBookingModal()">Done</button>
        </div>
      </div>
    `;
  }
}

window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.handleBookingSubmit = handleBookingSubmit;
