const effectFieldset = document.querySelector('.img-upload__effects');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectValueInput = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');

noUiSlider.create(effectSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100
  },
  step: 0.1,
  connect: 'lower'
});

effectSlider.noUiSlider.on('update', (values) => {
  const sliderValue = values[0];
  effectValueInput.value = sliderValue;
});

// Устанавливаем начальные значения
let currentEffect = 'none';
let currentIntensity = 1;

// Функция для обновления стилей изображения
const updatePreviewStyles = (effect, intensity) => {
  // Удаляем все стили filter
  previewImage.style.filter = '';

  // Скрываем слайдер если оригинал
  if (effect === 'none') {
    effectSlider.style.display = 'none';
    return;
  }

  effectSlider.style.display = 'block';

  // Изменяем стили на выбранный эффект и интенсивность
  switch (effect) {
    case 'chrome':
      previewImage.style.filter = `grayscale(${intensity})`;
      // effectSlider.noUiSlider.updateOptions ({
      //   start: 1,
      //   range: {
      //     min: 0,
      //     max: 1
      //   },
      //   step: 0.1,
      // });
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${intensity})`;
      // effectSlider.noUiSlider.updateOptions ({
      //   start: 1,
      //   range: {
      //     min: 0,
      //     max: 1
      //   },
      //   step: 0.1,
      // });
      break;
    case 'marvin':
      previewImage.style.filter = `invert(${intensity * 100}%)`;
      // effectSlider.noUiSlider.updateOptions ({
      //   start: 100,
      //   range: {
      //     min: 0,
      //     max: 100
      //   },
      //   step: 1,
      // });
      break;
    case 'phobos':
      previewImage.style.filter = `blur(${intensity * 3}px)`;
      // effectSlider.noUiSlider.updateOptions ({
      //   start: 3,
      //   range: {
      //     min: 0,
      //     max: 3
      //   },
      //   step: 0.1,
      // });
      break;
    case 'heat':
      previewImage.style.filter = `brightness(${intensity})`;
      // effectSlider.noUiSlider.updateOptions ({
      //   start: 3,
      //   range: {
      //     min: 1,
      //     max: 3
      //   },
      //   step: 0.1,
      // });
      break;
    default:
      break;
  }
};

// Обновление значения интенсивности эффекта
const updateIntensityValue = (value) => {
  effectValueInput.value = value;
};

// Сброс значений при выборе эффекта оригинал
const resetValues = () => {
  currentIntensity = 1;
  effectSlider.noUiSlider.set(100);
  effectValueInput.value = 100;
};

// Обработчик события при изменении значения слайдера
effectSlider.noUiSlider.on('slide', (value) => {
  currentIntensity = +value / 100;
  updatePreviewStyles(currentEffect, currentIntensity);
  updateIntensityValue(+value);
});

// Обработчик события при выборе эффекта
effectFieldset.addEventListener('change', (e) => {
  if (e.target) {
    currentEffect = e.target.value;
    resetValues();
    updatePreviewStyles(currentEffect, currentIntensity);
  }
});

document.querySelector('.effects__radio').checked = true;
resetValues();
updatePreviewStyles(currentEffect, currentIntensity);
