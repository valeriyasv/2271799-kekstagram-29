const controlValueImg = document.querySelector('.scale__control--value');
const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller ');
const image = document.querySelector('.img-upload__preview img');
const MIN_SCALE = 0.25;

let currentScale = 1;

const zoomOut = () => {
  if (currentScale > MIN_SCALE) { // Проверка на минимальный масштаб 25%
    currentScale -= MIN_SCALE;
    image.style.transform = `scale(${currentScale})`;
    controlValueImg.value = `${currentScale * 100}%`;
  }
};
const zoomIn = () => {
  if (currentScale < 1) { // Проверка на максимальный масштаб 100%
    currentScale += MIN_SCALE;
    image.style.transform = `scale(${currentScale})`;
    controlValueImg.value = `${currentScale * 100}%`;
  }
};

buttonBigger.addEventListener('click', () => {
  zoomIn();
});

buttonSmaller.addEventListener('click', () => {
  zoomOut();
});
