/**
 * KTM Butwal Bike Comparator Module
 * Allows side-by-side technical specification comparison of any two KTM models
 */

function initComparator() {
  const selectBike1 = document.getElementById('compareSelect1');
  const selectBike2 = document.getElementById('compareSelect2');
  const compareOutput = document.getElementById('comparatorOutput');

  if (!selectBike1 || !selectBike2 || !compareOutput) return;

  // Populate dropdowns with models
  const bikes = window.KTM_BIKES_DATA || [];
  
  selectBike1.innerHTML = bikes.map((b, idx) => 
    `<option value="${b.id}" ${idx === 0 ? 'selected' : ''}>${b.name} (${b.priceFormatted})</option>`
  ).join('');

  selectBike2.innerHTML = bikes.map((b, idx) => 
    `<option value="${b.id}" ${idx === 1 ? 'selected' : ''}>${b.name} (${b.priceFormatted})</option>`
  ).join('');

  const renderComparison = () => {
    const id1 = selectBike1.value;
    const id2 = selectBike2.value;

    const b1 = bikes.find(b => b.id === id1) || bikes[0];
    const b2 = bikes.find(b => b.id === id2) || bikes[1];

    compareOutput.innerHTML = `
      <div class="compare-grid">
        <!-- Bike 1 Card -->
        <div class="compare-card">
          <div class="compare-card-badge">${b1.badge}</div>
          <div class="compare-img-wrap">
            <img src="${b1.image}" alt="${b1.name}" loading="lazy" />
          </div>
          <div class="compare-card-header">
            <h3>${b1.name}</h3>
            <p class="compare-tagline">${b1.tagline}</p>
            <div class="compare-price">${b1.priceFormatted} <span class="compare-tax">(Showroom Butwal)</span></div>
          </div>
          <div class="compare-quick-stats">
            <div class="c-stat"><span>Power</span><strong>${b1.quickSpecs.power}</strong></div>
            <div class="c-stat"><span>Torque</span><strong>${b1.quickSpecs.torque}</strong></div>
            <div class="c-stat"><span>Displacement</span><strong>${b1.quickSpecs.displacement}</strong></div>
            <div class="c-stat"><span>Weight</span><strong>${b1.quickSpecs.weight}</strong></div>
          </div>
          <div class="compare-cta-row">
            <button class="btn-ktm-small" onclick="openBookingModal('${b1.id}')">Book Test Ride</button>
            <button class="btn-ktm-outline-small" onclick="openEmiWithBike('${b1.id}')">Calc EMI</button>
          </div>
        </div>

        <!-- Spec Comparison Table -->
        <div class="compare-table-wrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th style="width: 25%;">SPECIFICATION</th>
                <th style="width: 37.5%; text-align: right; color: var(--ktm-orange);">${b1.name}</th>
                <th style="width: 37.5%; text-align: right; color: var(--ktm-orange);">${b2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Engine Type</td>
                <td>${b1.specs.engine}</td>
                <td>${b2.specs.engine}</td>
              </tr>
              <tr>
                <td>Displacement</td>
                <td><strong>${b1.specs.displacement}</strong></td>
                <td><strong>${b2.specs.displacement}</strong></td>
              </tr>
              <tr>
                <td>Max Power</td>
                <td class="stat-highlight">${b1.specs.power}</td>
                <td class="stat-highlight">${b2.specs.power}</td>
              </tr>
              <tr>
                <td>Max Torque</td>
                <td>${b1.specs.torque}</td>
                <td>${b2.specs.torque}</td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>${b1.specs.transmission}</td>
                <td>${b2.specs.transmission}</td>
              </tr>
              <tr>
                <td>Quickshifter</td>
                <td>${b1.specs.quickshifter || 'Standard'}</td>
                <td>${b2.specs.quickshifter || 'Standard'}</td>
              </tr>
              <tr>
                <td>Front Suspension</td>
                <td>${b1.specs.frontSuspension}</td>
                <td>${b2.specs.frontSuspension}</td>
              </tr>
              <tr>
                <td>Rear Suspension</td>
                <td>${b1.specs.rearSuspension}</td>
                <td>${b2.specs.rearSuspension}</td>
              </tr>
              <tr>
                <td>Brakes & ABS</td>
                <td>${b1.specs.abs}</td>
                <td>${b2.specs.abs}</td>
              </tr>
              <tr>
                <td>Seat Height</td>
                <td>${b1.specs.seatHeight}</td>
                <td>${b2.specs.seatHeight}</td>
              </tr>
              <tr>
                <td>Fuel Capacity</td>
                <td>${b1.specs.fuelCapacity}</td>
                <td>${b2.specs.fuelCapacity}</td>
              </tr>
              <tr>
                <td>Dry Weight</td>
                <td>${b1.specs.dryWeight}</td>
                <td>${b2.specs.dryWeight}</td>
              </tr>
              <tr>
                <td>Electronics & Rider Aids</td>
                <td>${b1.specs.electronics}</td>
                <td>${b2.specs.electronics}</td>
              </tr>
              <tr>
                <td>Price (NPR)</td>
                <td class="table-price">${b1.priceFormatted}</td>
                <td class="table-price">${b2.priceFormatted}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bike 2 Card -->
        <div class="compare-card">
          <div class="compare-card-badge">${b2.badge}</div>
          <div class="compare-img-wrap">
            <img src="${b2.image}" alt="${b2.name}" loading="lazy" />
          </div>
          <div class="compare-card-header">
            <h3>${b2.name}</h3>
            <p class="compare-tagline">${b2.tagline}</p>
            <div class="compare-price">${b2.priceFormatted} <span class="compare-tax">(Showroom Butwal)</span></div>
          </div>
          <div class="compare-quick-stats">
            <div class="c-stat"><span>Power</span><strong>${b2.quickSpecs.power}</strong></div>
            <div class="c-stat"><span>Torque</span><strong>${b2.quickSpecs.torque}</strong></div>
            <div class="c-stat"><span>Displacement</span><strong>${b2.quickSpecs.displacement}</strong></div>
            <div class="c-stat"><span>Weight</span><strong>${b2.quickSpecs.weight}</strong></div>
          </div>
          <div class="compare-cta-row">
            <button class="btn-ktm-small" onclick="openBookingModal('${b2.id}')">Book Test Ride</button>
            <button class="btn-ktm-outline-small" onclick="openEmiWithBike('${b2.id}')">Calc EMI</button>
          </div>
        </div>
      </div>
    `;
  };

  selectBike1.addEventListener('change', renderComparison);
  selectBike2.addEventListener('change', renderComparison);

  // Initial render
  renderComparison();
}

window.initComparator = initComparator;
