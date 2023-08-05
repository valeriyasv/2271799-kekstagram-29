import { renderImg } from './miniature-drawer.js';
import { openFullSize } from './full-screen-image.js';
import { generateRandomPosts } from './filters.js';
import { debounce } from './util.js';

document.addEventListener('DOMContentLoaded', () => {
  const buttonFilterDefault = document.querySelector('#filter-default');
  const buttonFilterRandom = document.querySelector('#filter-random');
  const buttonFilterDiscussed = document.querySelector('#filter-discussed');
  const picturesContainer = document.querySelector('.pictures');
  const filtersForm = document.querySelector('.img-filters__form');
  const showMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.style.position = 'absolute';
    messageElement.style.left = '0';
    messageElement.style.top = '0';
    messageElement.style.right = '0';
    messageElement.style.padding = '10px 3px';
    messageElement.style.fontSize = '20px';
    messageElement.style.textAlign = 'center';
    messageElement.style.backgroundColor = 'red';
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  };
  const getData = () => {
    fetch('https://29.javascript.pages.academy/kekstagram/data')
      .then((response) => response.json())
      .then((data) => {
        renderImg(data);
        filtersForm.style.display = 'block';

        const clearPicturesContainer = () => {
          const picturesArr = Array.from(picturesContainer.children);
          picturesArr.forEach((picture) => {
            if (!picture.hasAttribute('data-preserved')) {
              picture.remove();
            }
          });
        };

        const debouncedRender = debounce((renderData) => {
          clearPicturesContainer();
          renderImg(renderData);
          openFullSize(data);
        });

        const onFilterButtonClick = (button, renderData) => {
          buttonFilterDefault.classList.remove('img-filters__button--active');
          buttonFilterRandom.classList.remove('img-filters__button--active');
          buttonFilterDiscussed.classList.remove('img-filters__button--active');
          button.classList.add('img-filters__button--active');
          debouncedRender(renderData);
        };

        buttonFilterDefault.addEventListener('click', () => {
          onFilterButtonClick(buttonFilterDefault, data);
        });

        buttonFilterRandom.addEventListener('click', () => {
          const randomPosts = generateRandomPosts(data);
          onFilterButtonClick(buttonFilterRandom, randomPosts);
        });

        buttonFilterDiscussed.addEventListener('click', () => {
          const sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length);
          onFilterButtonClick(buttonFilterDiscussed, sortedData);
        });

        openFullSize(data);
      })
      .catch(() => {
        showMessage('Ошибка загрузки изображений');
      });
  };

  getData();
});
