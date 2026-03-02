// range-slider.js (module ES)

// ========== 1. DEBOUNCE UTILITAIRE ==========
// Utilitaire pour limiter la fréquence d’exécution d'une fonction
export function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// ========== 2. CALLBACK PAR DÉFAUT ==========
// Appelé à chaque mise à jour du slider (valeur modifiée)
export function rangeSliderOnChange(container, values) {
  // Mise à jour d’un seul champ (data-input)
  const inputId = container.dataset.input;
  if (inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      if ('value' in input) input.value = values.valueLeft ?? values.valueRight ?? '';
      else input.textContent = values.valueLeft ?? values.valueRight ?? '';
    }
  }

  // Mise à jour des champs liés à la plage min/max
  const minId = container.dataset.inputmin;
  const maxId = container.dataset.inputmax;

  if (minId) {
    const minInput = document.getElementById(minId);
    if (minInput) {
      if ('value' in minInput) minInput.value = values.valueLeft ?? '';
      else minInput.textContent = values.valueLeft ?? '';
    }
  }

  if (maxId) {
    const maxInput = document.getElementById(maxId);
    if (maxInput) {
      if ('value' in maxInput) maxInput.value = values.valueRight ?? '';
      else maxInput.textContent = values.valueRight ?? '';
    }
  }
}

// ========== 3. INITIALISATION INDIVIDUELLE ==========
export function initRangeSlider(container, onChange = rangeSliderOnChange) {
  // Sélection des entrées
  const inputLeft = container.querySelector('.range-slider-input-left');
  const inputRight = container.querySelector('.range-slider-input-right');
  const isDouble = inputLeft && inputRight;
  const isSimpleLeft = inputLeft && !inputRight;
  const isSimpleRight = inputRight && !inputLeft;

  // Valeurs de base
  const input = inputLeft || inputRight;
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const step = parseFloat(input.step);
  const initialValue = parseFloat(input.value) || min;

  // Éléments visuels
  const barLeft = container.querySelector('.range-slider-val-left') || null;
  const barRight = container.querySelector('.range-slider-val-right') || null;
  const barRange = container.querySelector('.range-slider-val-range');

  const handleLeft = container.querySelector('.range-slider-handle-left') || null;
  const tooltipLeft = container.querySelector('.range-slider-tooltip-left') || null;
  const tooltipTextLeft = tooltipLeft?.querySelector('.range-slider-tooltip-text') || null;

  const handleRight = container.querySelector('.range-slider-handle-right') || null;
  const tooltipRight = container.querySelector('.range-slider-tooltip-right') || null;
  const tooltipTextRight = tooltipRight?.querySelector('.range-slider-tooltip-text') || null;

  const graduation = container.querySelector('.range-slider-graduation') || null;

  // Convertit une valeur en pourcentage (position relative)
  function percent(value) {
    return ((value - min) / (max - min)) * 100;
  }

  // Met à jour l'UI graphique et appelle le callback
  function updateUI() {
    if (isDouble) {
      const valLeft = parseFloat(inputLeft.value);
      const valRight = parseFloat(inputRight.value);
      const pLeft = percent(valLeft);
      const pRight = percent(valRight);

      barLeft && (barLeft.style.width = `${pLeft}%`);
      barRight && (barRight.style.width = `${100 - pRight}%`);
      barRange && (barRange.style.left = `${pLeft}%`);
      barRange && (barRange.style.right = `${100 - pRight}%`);

      handleLeft && (handleLeft.style.left = `${pLeft}%`);
      tooltipLeft && (tooltipLeft.style.left = `${pLeft}%`);
      tooltipTextLeft && (tooltipTextLeft.textContent = inputLeft.value);

      handleRight && (handleRight.style.left = `${pRight}%`);
      tooltipRight && (tooltipRight.style.left = `${pRight}%`);
      tooltipTextRight && (tooltipTextRight.textContent = inputRight.value);
    }

    if (isSimpleLeft) {
      const value = parseFloat(inputLeft.value);
      const p = percent(value);

      barLeft && (barLeft.style.width = `${p}%`);
      barRange && (barRange.style.left = `${p}%`);
      barRange && (barRange.style.right = `0`);

      handleLeft && (handleLeft.style.left = `${p}%`);
      tooltipLeft && (tooltipLeft.style.left = `${p}%`);
      tooltipTextLeft && (tooltipTextLeft.textContent = inputLeft.value);
    }

    if (isSimpleRight) {
      const value = parseFloat(inputRight.value);
      const p = percent(value);

      barRight && (barRight.style.width = `${100 - p}%`);
      barRange && (barRange.style.left = `0`);
      barRange && (barRange.style.right = `${100 - p}%`);

      handleRight && (handleRight.style.left = `${p}%`);
      tooltipRight && (tooltipRight.style.left = `${p}%`);
      tooltipTextRight && (tooltipTextRight.textContent = inputRight.value);
    }

    // Callback (par défaut ou personnalisé)
    onChange(container, {
      type: isDouble ? 'double' : (isSimpleLeft ? 'left' : 'right'),
      valueLeft: isDouble || isSimpleLeft ? parseFloat(inputLeft?.value) : null,
      valueRight: isDouble || isSimpleRight ? parseFloat(inputRight?.value) : null
    });
  }

  // Événements selon le type de slider
  if (isDouble) {
    inputLeft.addEventListener('input', () => {
      const safeVal = Math.min(parseFloat(inputLeft.value), parseFloat(inputRight.value) - step);
      inputLeft.value = safeVal;
      updateUI();
    });

    inputRight.addEventListener('input', () => {
      const safeVal = Math.max(parseFloat(inputRight.value), parseFloat(inputLeft.value) + step);
      inputRight.value = safeVal;
      updateUI();
    });
  } else {
    input.addEventListener('input', () => {
      updateUI();
    });
  }


  // Ajoute le nombre de steps au DOM pour usage CSS (graduations)
  const stepsCount = Math.floor((max - min) / step);
  container.style.setProperty('--steps', stepsCount);


  // Init visuelle
  input.value = initialValue;
  updateUI();

  // affiche des graduations
injectGraduations(container);

// Graduations intercatives
if (graduation) {
  graduation.addEventListener('click', (e) => {
    const tick = e.target.closest('.range-slider-graduation-tick');
    if (!tick) return;

    const value = parseFloat(tick.dataset.value);
    if (isNaN(value)) return;

    if (isDouble) {
      const valLeft = parseFloat(inputLeft.value);
      const valRight = parseFloat(inputRight.value);
      const distToLeft = Math.abs(value - valLeft);
      const distToRight = Math.abs(value - valRight);

      if (distToLeft < distToRight) {
        inputLeft.value = Math.min(value, valRight - step);
      } else {
        inputRight.value = Math.max(value, valLeft + step);
      }
    } else if (isSimpleLeft) {
      inputLeft.value = value;
    } else if (isSimpleRight) {
      inputRight.value = value;
    }

    updateUI();
  });
}


}

/* --------------- */
function injectGraduations(container) {
  const input = container.querySelector('input[type="range"]');
  if (!input) return;

  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const step = parseFloat(input.step);
  const graduationContainer = container.querySelector('.range-slider-graduation');

  if (!graduationContainer) return;

  // Nettoyage si déjà injecté
  graduationContainer.innerHTML = '';

  const totalSteps = Math.floor((max - min) / step);
  const totalWidth = 100;
  const stepWidth = totalWidth / totalSteps;

  for (let i = 0; i <= totalSteps; i++) {
    const value = min + i * step;

    // Définir les bornes gauche et droite de la zone cliquable
    const leftPercent = Math.max(0, (i - 0.5) * stepWidth);
    const rightPercent = Math.min(100, (i + 0.5) * stepWidth);
    const widthPercent = rightPercent - leftPercent;

    const span = document.createElement('span');
    span.className = 'range-slider-graduation-tick';
    span.dataset.value = value;
    span.style.position = 'absolute';
    span.style.left = `${leftPercent}%`;
    span.style.width = `${widthPercent}%`;
    span.style.top = '0';
    span.style.bottom = '0';
    span.style.cursor = 'pointer';

    graduationContainer.appendChild(span);
  }
}

// ========== 4. INITIALISATION DE TOUS LES SLIDERS ==========
export function initAllRangeSliders() {
  document.querySelectorAll('.range-slider').forEach(container =>
    initRangeSlider(container)
  );
}

// ========== 5. SYNCHRONISATION DES CHAMPS VERS SLIDERS ==========
export function bindFieldsToRangeSliders() {
  document.querySelectorAll('[data-range]').forEach(field => {
    const rangeId = field.dataset.range;
    const side = field.dataset.side || 'simple'; // Par défaut : slider simple

    const slider = document.getElementById(rangeId);
    if (!slider) return;

    const isDouble = !!field.dataset.side;
    let input, other;

    if (isDouble) {
      const inputLeft = slider.querySelector('.range-slider-input-left');
      const inputRight = slider.querySelector('.range-slider-input-right');
      input = side === 'left' ? inputLeft : inputRight;
      other = side === 'left' ? inputRight : inputLeft;

      if (!input || !other) return;
    } else {
      input = slider.querySelector('input[type="range"]');
      if (!input) return;
    }

    const step = parseFloat(input.step);

    // Écoute les changements dans le champ et pilote le slider
    field.addEventListener('input', debounce(() => {
      let val = parseFloat(field.value);
      if (isNaN(val)) return;

      const min = parseFloat(input.min);
      const max = parseFloat(input.max);

      // Empêche le croisement des valeurs dans le double
      if (side === 'left' && other) {
        val = Math.min(val, parseFloat(other.value) - step);
      } else if (side === 'right' && other) {
        val = Math.max(val, parseFloat(other.value) + step);
      }

      // Clamp dans les bornes
      val = Math.max(min, Math.min(max, val));

      field.value = val;
      input.value = val;
      input.dispatchEvent(new Event('input'));
    }, 300));
  });
}
