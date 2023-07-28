import { renderImg } from './miniature-drawer.js';
import { openFullSize } from './full-screen-image.js';
import { generateRandomPosts } from './filters.js';
import { debounce } from './util.js';

const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

const clearPicturesContainer = () => {
  const picturesArr = Array.from(picturesContainer.children);
  picturesArr.forEach((picture) => {
    if (!picture.hasAttribute('data-preserved')) {
      picture.remove();
    }
  });
};

const getData = () => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderImg(data);

      // Случайные картинки
      const debouncedRenderRandom = debounce(() => {
        clearPicturesContainer();
        const randomPosts = generateRandomPosts(data);
        renderImg(randomPosts);
        openFullSize(data);
      });

      // Обсуждаемые картинки
      const debouncedRenderDiscussed = debounce(() => {
        clearPicturesContainer();
        const sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length);
        renderImg(sortedData);
        openFullSize(data);
      });

      // Картинки по умолчанию
      buttonFilterDefault.addEventListener('click', () => {
        buttonFilterDefault.classList.add('img-filters__button--active');
        buttonFilterRandom.classList.remove('img-filters__button--active');
        buttonFilterDiscussed.classList.remove('img-filters__button--active');
        clearPicturesContainer();
        renderImg(data);
        openFullSize(data);
      });

      // Кнопка случайные картинки
      buttonFilterRandom.addEventListener('click', () => {
        buttonFilterRandom.classList.add('img-filters__button--active');
        buttonFilterDefault.classList.remove('img-filters__button--active');
        buttonFilterDiscussed.classList.remove('img-filters__button--active');
        debouncedRenderRandom();
      });

      // Кнопка обсуждаемые картинки
      buttonFilterDiscussed.addEventListener('click', () => {
        buttonFilterDiscussed.classList.add('img-filters__button--active');
        buttonFilterRandom.classList.remove('img-filters__button--active');
        buttonFilterDefault.classList.remove('img-filters__button--active');
        debouncedRenderDiscussed();
      });

      openFullSize(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};
getData();
