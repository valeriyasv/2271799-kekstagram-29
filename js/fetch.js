import { renderImg } from './miniature-drawer.js';
import { openFullSize } from './full-screen-image.js';
import { generateRandomPosts } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  const buttonRandom = document.querySelector('#filter-random');
  const pictures = document.querySelectorAll('.picture');
  const getData = () => {
    fetch('https://29.javascript.pages.academy/kekstagram/data')
      .then((response) => response.json())
      .then((data) => {
        renderImg(data);
        buttonRandom.addEventListener('click', () => {
          pictures.textContent = '';
          renderImg(generateRandomPosts(data));
          console.log('dddd')
        });
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

