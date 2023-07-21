import { renderImg } from './miniature-drawer.js';
import { openFullSize } from './full-screen-image.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ваш код здесь
  const getData = () => {
    fetch('https://29.javascript.pages.academy/kekstagram/data')
      .then((response) => response.json())
      .then((data) => {
        renderImg(data);
      })
      .then((dat) => {
        openFullSize(dat);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  getData();
});
// export { getData };
