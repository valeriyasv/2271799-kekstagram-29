const effectLevel = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
// const formFilters = document.querySelector('.img-filters__form');
// formFilters.style.display = 'none';
effectLevel.style.display = 'none';
// Инициализация слайдера
noUiSlider.create(effectSlider, {
  start: 1,
  range: {
    min: 0,
    max: 1
  },
  connect: 'lower'
});

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
      style = `blur(${Math.round((value * 3) * 10) / 10}px)`;
      break;
    case 'heat':
      style = `brightness(${(value * 3) - 0.2})`;
      break;
  }

  imgPreview.style.filter = style;
};

// Изменение уровня эффекта
effectSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effect = document.querySelector('.effects__item input:checked').value;
  effectValue.value = `${(value * 100).toFixed(1)}%`;
  updateImageStyle(effect, value);
});

const resetFilters = () => {
  effectLevel.style.display = 'none';
  imgPreview.style.filter = '';
};

// Изменение выбранного эффекта
document.querySelectorAll('.effects__item input').forEach((input) => {
  input.addEventListener('change', function() {
    const effect = this.value;
    const value = effectSlider.noUiSlider.get();
    // eslint-disable-next-line no-nested-ternary
    const step = effect === 'marvin' ? 1 / 100 : effect === 'phobos' ? 0.1 / 3 : effect === 'heat' ? 0.1 : 0.1;

    if (effect === 'none') {
      resetFilters();
      return;
    } else {
      effectLevel.style.display = 'block';
      updateImageStyle(effect, value);
    }

    effectSlider.noUiSlider.updateOptions({ step: step });
    effectSlider.noUiSlider.set(1); // Сброс уровня эффекта
    effectValue.value = '100%';
  });
});

export { resetFilters };
