/**
 * KTM Bike Showroom Butwal - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  renderBikesGrid('all');
  renderRouteCards();
  setupFilterTabs();
  setupRevLimiterHUD();
  setupBikeSpecModal();
  setupMobileNav();

  // Initialize companion modules
  if (typeof initComparator === 'function') initComparator();
  if (typeof initEmiCalculator === 'function') initEmiCalculator();
});

// Render Bikes Grid
function renderBikesGrid(filterCategory = 'all') {
  const container = document.getElementById('bikesGrid');
  if (!container) return;

  const bikes = window.KTM_BIKES_DATA || [];
  const filtered = filterCategory === 'all' 
    ? bikes 
    : bikes.filter(b => b.category === filterCategory);

  container.innerHTML = filtered.map(bike => `
    <article class="bike-card" data-category="${bike.category}" id="card-${bike.id}">
      <div class="bike-card-ribbon">${bike.badge}</div>
      <div class="bike-card-image-wrap">
        <img src="${bike.image}" alt="${bike.name}" class="bike-img" loading="lazy" />
        <div class="bike-colors-preview">
          ${bike.colors.map(c => `<span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>`).join('')}
        </div>
      </div>
      <div class="bike-card-content">
        <div class="bike-meta-row">
          <span class="bike-category-tag">${bike.categoryName}</span>
          <span class="bike-cc-tag">${bike.quickSpecs.displacement}</span>
        </div>
        <h3 class="bike-title">${bike.name}</h3>
        <p class="bike-tagline">${bike.tagline}</p>

        <div class="bike-key-specs-grid">
          <div class="key-spec-item">
            <span class="spec-label">POWER</span>
            <span class="spec-val">${bike.quickSpecs.power.split('@')[0]}</span>
          </div>
          <div class="key-spec-item">
            <span class="spec-label">TORQUE</span>
            <span class="spec-val">${bike.quickSpecs.torque.split('@')[0]}</span>
          </div>
          <div class="key-spec-item">
            <span class="spec-label">WEIGHT</span>
            <span class="spec-val">${bike.quickSpecs.weight.split(' ')[0]} kg</span>
          </div>
          <div class="key-spec-item">
            <span class="spec-label">TOP SPEED</span>
            <span class="spec-val">${bike.quickSpecs.topSpeed}</span>
          </div>
        </div>

        <div class="bike-pricing-box">
          <div class="price-details">
            <span class="price-caption">Showroom Price (Butwal)</span>
            <span class="price-value">${bike.priceFormatted}</span>
          </div>
          <div class="emi-tag">
            <span>EMI from</span>
            <strong>NPR ${bike.emiStartNPR.toLocaleString()}/mo*</strong>
          </div>
        </div>

        <div class="bike-card-actions">
          <button class="btn-ktm" onclick="openBookingModal('${bike.id}', 'Test Ride')">
            Book Test Ride
          </button>
          <button class="btn-ktm-outline" onclick="openSpecModal('${bike.id}')">
            View Specs
          </button>
        </div>

        <div class="bike-card-subactions">
          <button class="btn-rev-mini" onclick="loadAndRevBike('${bike.id}')" title="Test Engine Exhaust Sound">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            Rev Engine Sound
          </button>
          <button class="btn-compare-mini" onclick="setComparatorBike('${bike.id}')" title="Compare with another model">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
            Compare
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Filter tabs
function setupFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-filter');
      renderBikesGrid(category);
    });
  });
}

// Butwal Routes Rendering
function renderRouteCards() {
  const container = document.getElementById('routesGrid');
  if (!container) return;

  const routes = window.BUTWAL_ROUTES || [];
  container.innerHTML = routes.map(route => `
    <div class="route-card">
      <div class="route-tag">${route.tag}</div>
      <h4>${route.title}</h4>
      <p class="route-distance">📍 ${route.fromTo}</p>
      <p class="route-elevation">⛰️ ${route.elevation}</p>
      <p class="route-desc">${route.description}</p>
      <div class="route-footer">
        <span class="route-bike-label">Ideal Machine:</span>
        <span class="route-bike-val">${route.recommendedBike}</span>
      </div>
    </div>
  `).join('');
}

// Rev Limiter HUD and Engine Sound Simulator
function setupRevLimiterHUD() {
  const throttleBtn = document.getElementById('hudThrottleBtn');
  const killSwitchBtn = document.getElementById('hudKillSwitch');
  const bikeSelector = document.getElementById('hudBikeSoundSelect');
  const playClipBtn = document.getElementById('btnPlayRealClip');

  // Populate HUD Sound bike selector
  if (bikeSelector) {
    const bikes = window.KTM_BIKES_DATA || [];
    bikeSelector.innerHTML = bikes.map(b => 
      `<option value="${b.id}">${b.name} (${b.categoryName})</option>`
    ).join('');

    // Initialize default bike
    if (bikes.length > 0 && window.ktmEngine) {
      window.ktmEngine.setBike(bikes[0]);
    }

    bikeSelector.addEventListener('change', (e) => {
      const bike = bikes.find(b => b.id === e.target.value);
      if (bike && window.ktmEngine) {
        window.ktmEngine.setBike(bike);
      }
    });
  }

  // Real recorded studio clip toggle
  if (playClipBtn) {
    playClipBtn.addEventListener('click', () => {
      if (window.ktmEngine) {
        window.ktmEngine.toggleRealClip();
      }
    });
  }

  if (throttleBtn) {
    // Mouse and touch hold to rev
    const startRev = (e) => {
      e.preventDefault();
      throttleBtn.classList.add('pressed');
      if (window.ktmEngine) {
        window.ktmEngine.pressThrottle();
      }
    };

    const stopRev = (e) => {
      e.preventDefault();
      throttleBtn.classList.remove('pressed');
      if (window.ktmEngine) {
        window.ktmEngine.releaseThrottle();
      }
    };

    throttleBtn.addEventListener('mousedown', startRev);
    window.addEventListener('mouseup', stopRev);
    throttleBtn.addEventListener('touchstart', startRev, { passive: false });
    window.addEventListener('touchend', stopRev);

    // Keyboard Spacebar for revving
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        throttleBtn.classList.add('pressed');
        if (window.ktmEngine) {
          window.ktmEngine.pressThrottle();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        throttleBtn.classList.remove('pressed');
        if (window.ktmEngine) {
          window.ktmEngine.releaseThrottle();
        }
      }
    });
  }

  if (killSwitchBtn) {
    killSwitchBtn.addEventListener('click', () => {
      if (window.ktmEngine) {
        window.ktmEngine.stopEngine();
      }
      killSwitchBtn.classList.add('triggered');
      setTimeout(() => killSwitchBtn.classList.remove('triggered'), 400);
    });
  }
}

function loadAndRevBike(bikeId) {
  const bikes = window.KTM_BIKES_DATA || [];
  const bike = bikes.find(b => b.id === bikeId);
  if (!bike) return;

  const selector = document.getElementById('hudBikeSoundSelect');
  if (selector) {
    selector.value = bike.id;
  }
  if (window.ktmEngine) {
    window.ktmEngine.setBike(bike);
    window.ktmEngine.pressThrottle();
    setTimeout(() => {
      window.ktmEngine.releaseThrottle();
    }, 2000);
  }

  // Scroll smoothly to HUD if not visible
  const hudEl = document.getElementById('engine-hud-section');
  if (hudEl) {
    hudEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function setComparatorBike(bikeId) {
  const select1 = document.getElementById('compareSelect1');
  const compSection = document.getElementById('comparator-section');
  if (select1) {
    select1.value = bikeId;
    select1.dispatchEvent(new Event('change'));
  }
  if (compSection) {
    compSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Specs Modal
function setupBikeSpecModal() {
  const modal = document.getElementById('bikeSpecsModal');
  const closeBtn = document.getElementById('closeSpecModalBtn');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

function openSpecModal(bikeId) {
  const modal = document.getElementById('bikeSpecsModal');
  const content = document.getElementById('specModalBody');
  if (!modal || !content) return;

  const bikes = window.KTM_BIKES_DATA || [];
  const bike = bikes.find(b => b.id === bikeId);
  if (!bike) return;

  content.innerHTML = `
    <div class="spec-modal-header">
      <div class="modal-bike-thumb">
        <img src="${bike.image}" alt="${bike.name}" />
      </div>
      <div class="modal-bike-title-block">
        <span class="modal-cat">${bike.categoryName} • ${bike.badge}</span>
        <h2>${bike.name}</h2>
        <p class="modal-tagline">${bike.tagline}</p>
        <div class="modal-price">${bike.priceFormatted} <small>(Showroom Butwal)</small></div>
      </div>
    </div>

    <div class="spec-modal-highlights">
      <h4>KEY HIGHLIGHTS</h4>
      <ul>
        ${bike.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div class="spec-detailed-grid">
      <div class="spec-section">
        <h4>ENGINE & TRANSMISSION</h4>
        <table>
          <tr><td>Engine Type</td><td>${bike.specs.engine}</td></tr>
          <tr><td>Displacement</td><td>${bike.specs.displacement}</td></tr>
          <tr><td>Bore x Stroke</td><td>${bike.specs.boreStroke}</td></tr>
          <tr><td>Max Power</td><td><strong>${bike.specs.power}</strong></td></tr>
          <tr><td>Max Torque</td><td><strong>${bike.specs.torque}</strong></td></tr>
          <tr><td>Compression Ratio</td><td>${bike.specs.compressionRatio}</td></tr>
          <tr><td>Clutch / Gearbox</td><td>${bike.specs.transmission}</td></tr>
          <tr><td>Quickshifter</td><td>${bike.specs.quickshifter || 'Standard'}</td></tr>
        </table>
      </div>

      <div class="spec-section">
        <h4>CHASSIS, SUSPENSION & BRAKES</h4>
        <table>
          <tr><td>Frame Type</td><td>${bike.specs.frame}</td></tr>
          <tr><td>Front Suspension</td><td>${bike.specs.frontSuspension}</td></tr>
          <tr><td>Rear Suspension</td><td>${bike.specs.rearSuspension}</td></tr>
          <tr><td>Front Brake</td><td>${bike.specs.frontBrake}</td></tr>
          <tr><td>Rear Brake</td><td>${bike.specs.rearBrake}</td></tr>
          <tr><td>ABS System</td><td>${bike.specs.abs}</td></tr>
        </table>
      </div>

      <div class="spec-section">
        <h4>DIMENSIONS & CAPACITIES</h4>
        <table>
          <tr><td>Seat Height</td><td>${bike.specs.seatHeight}</td></tr>
          <tr><td>Ground Clearance</td><td>${bike.specs.groundClearance}</td></tr>
          <tr><td>Fuel Capacity</td><td>${bike.specs.fuelCapacity}</td></tr>
          <tr><td>Dry Weight</td><td>${bike.specs.dryWeight}</td></tr>
        </table>
      </div>

      <div class="spec-section">
        <h4>ELECTRONICS & FEATURES</h4>
        <table>
          <tr><td>Dashboard Display</td><td>${bike.specs.display}</td></tr>
          <tr><td>Rider Aids & Tech</td><td>${bike.specs.electronics}</td></tr>
          <tr><td>Recommended Route</td><td>${bike.recommendedRoute}</td></tr>
        </table>
      </div>
    </div>

    <div class="modal-footer-cta">
      <button class="btn-ktm" onclick="closeSpecModal(); openBookingModal('${bike.id}', 'Test Ride')">
        Book Test Ride at Butwal Showroom
      </button>
      <button class="btn-ktm-outline" onclick="closeSpecModal(); openEmiWithBike('${bike.id}')">
        Calculate Nepal Bank EMI
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSpecModal() {
  const modal = document.getElementById('bikeSpecsModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Mobile Nav
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggleBtn.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggleBtn.classList.remove('active');
      });
    });
  }
}

window.openSpecModal = openSpecModal;
window.closeSpecModal = closeSpecModal;
window.loadAndRevBike = loadAndRevBike;
window.setComparatorBike = setComparatorBike;
