const FULL_VALUE = '100%';
const DISPLAY_VALUES = {
  BLOCK: 'block',
  NONE: 'none',
};
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const resetFilters = () => {
  effectLevel.style.display = DISPLAY_VALUES.NONE;
  imgPreview.style.filter = '';
};
effectLevel.style.display = DISPLAY_VALUES.NONE;
const STEP = 3;
// Обновления стилей картинки
const updateImageStyle = (effect, value) => {
  let style = '';

  switch (effect) {
    case 'chrome':
      style = `grayscale(${ value })`;
      break;
    case 'sepia':
      style = `sepia(${ value })`;
      break;
    case 'marvin':
      style = `invert(${ value * 100 }%)`;
      break;
    case 'phobos':
      style = `blur(${Math.round((value * STEP) * 10) / 10}px)`;
      break;
    case 'heat':
      style = `brightness(${(value * STEP)})`;
      break;
  }
  imgPreview.style.filter = style;
};
// Инициализация слайдера
noUiSlider.create(effectSlider, {
  start: 1,
  range: {
    min: 0,
    max: 1
  },
  connect: 'lower'
});


// Изменение уровня эффекта
effectSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effect = document.querySelector('.effects__item input:checked').value;
  effectValue.value = `${(value * 100).toFixed(1)}%`;
  updateImageStyle(effect, value);
});

// Изменение выбранного эффекта
document.querySelectorAll('.effects__item input').forEach((input) => {
  input.addEventListener('change', function() {
    const effect = this.value;
    const value = effectSlider.noUiSlider.get();
    // eslint-disable-next-line no-nested-ternary
    const step = effect === 'marvin' ? 1 / 100 : effect === 'phobos' ? 0.1 / 3 : effect === 'heat' ? 0.1 : 0.1;
    switch (effect) {
      case 'none':
        resetFilters();
        break;
      default:
        effectLevel.style.display = DISPLAY_VALUES.BLOCK;
        updateImageStyle(effect, value);
        break;
    }
    effectSlider.noUiSlider.updateOptions({ step: step });
    effectSlider.noUiSlider.set(1); // Сброс уровня эффекта
    effectValue.value = FULL_VALUE;
  });
});

export { resetFilters };
