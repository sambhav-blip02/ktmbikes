/**
 * KTM Butwal EMI & Nepal Financing Calculator
 * Calculates monthly installments in NPR based on Nepal banking standards
 */

function initEmiCalculator() {
  const bikeSelect = document.getElementById('emiBikeSelect');
  const downPaymentSlider = document.getElementById('emiDownPaymentPercent');
  const downPaymentValEl = document.getElementById('emiDownPaymentVal');
  const tenureSelect = document.getElementById('emiTenureSelect');
  const interestSlider = document.getElementById('emiInterestRate');
  const interestValEl = document.getElementById('emiInterestVal');
  const bankPresetsWrap = document.getElementById('emiBankPresets');

  // Outputs
  const outMonthlyEmi = document.getElementById('outMonthlyEmi');
  const outDownPayment = document.getElementById('outDownPayment');
  const outLoanAmount = document.getElementById('outLoanAmount');
  const outTotalInterest = document.getElementById('outTotalInterest');
  const outTotalPayable = document.getElementById('outTotalPayable');

  if (!bikeSelect || !downPaymentSlider || !outMonthlyEmi) return;

  const bikes = window.KTM_BIKES_DATA || [];
  const banks = window.NEPAL_BANKS || [];

  // Populate bike options
  bikeSelect.innerHTML = bikes.map(b => 
    `<option value="${b.id}" data-price="${b.priceNPR}">${b.name} — ${b.priceFormatted}</option>`
  ).join('');

  // Render bank presets
  if (bankPresetsWrap) {
    bankPresetsWrap.innerHTML = banks.map((bank, i) => `
      <button type="button" class="bank-preset-btn ${i === 0 ? 'active' : ''}" data-rate="${bank.rate}" data-min-down="${bank.minDownPercent}">
        <span>${bank.name}</span>
        <strong>${bank.rate}% p.a.</strong>
      </button>
    `).join('');

    bankPresetsWrap.querySelectorAll('.bank-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        bankPresetsWrap.querySelectorAll('.bank-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const rate = parseFloat(btn.getAttribute('data-rate'));
        const minDown = parseInt(btn.getAttribute('data-min-down'), 10);
        interestSlider.value = rate;
        if (parseInt(downPaymentSlider.value, 10) < minDown) {
          downPaymentSlider.value = minDown;
        }
        updateEmi();
      });
    });
  }

  function formatNPR(num) {
    return 'NPR ' + Math.round(num).toLocaleString('en-IN');
  }

  function updateEmi() {
    const selectedOpt = bikeSelect.options[bikeSelect.selectedIndex];
    const price = parseFloat(selectedOpt.getAttribute('data-price')) || 999900;
    const downPercent = parseFloat(downPaymentSlider.value);
    const tenureMonths = parseInt(tenureSelect.value, 10);
    const annualRate = parseFloat(interestSlider.value);

    // Update label values
    if (downPaymentValEl) downPaymentValEl.textContent = `${downPercent}%`;
    if (interestValEl) interestValEl.textContent = `${annualRate.toFixed(1)}%`;

    const downPaymentAmount = price * (downPercent / 100);
    const principal = price - downPaymentAmount;

    // Monthly interest rate
    const monthlyRate = annualRate / (12 * 100);

    let monthlyEmi = 0;
    if (monthlyRate > 0) {
      monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    } else {
      monthlyEmi = principal / tenureMonths;
    }

    const totalRepayment = monthlyEmi * tenureMonths;
    const totalInterest = totalRepayment - principal;
    const totalBikeCost = downPaymentAmount + totalRepayment;

    outMonthlyEmi.textContent = formatNPR(monthlyEmi);
    outDownPayment.textContent = formatNPR(downPaymentAmount);
    outLoanAmount.textContent = formatNPR(principal);
    outTotalInterest.textContent = formatNPR(totalInterest);
    outTotalPayable.textContent = formatNPR(totalBikeCost);
  }

  bikeSelect.addEventListener('change', updateEmi);
  downPaymentSlider.addEventListener('input', updateEmi);
  tenureSelect.addEventListener('change', updateEmi);
  interestSlider.addEventListener('input', updateEmi);

  // Initial calculation
  updateEmi();
}

function openEmiWithBike(bikeId) {
  const emiSection = document.getElementById('emi-calculator');
  const bikeSelect = document.getElementById('emiBikeSelect');
  if (bikeSelect && bikeId) {
    bikeSelect.value = bikeId;
    bikeSelect.dispatchEvent(new Event('change'));
  }
  if (emiSection) {
    emiSection.scrollIntoView({ behavior: 'smooth' });
  }
}

window.initEmiCalculator = initEmiCalculator;
window.openEmiWithBike = openEmiWithBike;
