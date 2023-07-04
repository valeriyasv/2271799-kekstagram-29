import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const miniature = document.querySelectorAll('.picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
// Колличество лайков полного изображения
const bigPictureLikes = document.querySelector('.likes-count');
// Колличество комментариев полного изображения
const bigPictureComments = document.querySelector('.comments-count');
// Описание полного изображения
const bigPictureDesc = document.querySelector('.social__caption');

const buttonCloseFullImg = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const openFullSize = function () {
  miniature.forEach((item) => {
    item.addEventListener('click', (e) => {
      // Колличество лайков миниатюры
      const miniatureLikes = item.querySelector('.picture__likes').textContent;
      // Колличество комментов миниатюры
      const miniatureComments = item.querySelector('.picture__comments').textContent;

      bigPictureDesc.textContent = e.target.alt.textContent;
      bigPicture.classList.remove('hidden');
      bigPictureLikes.textContent = miniatureLikes;
      bigPictureImg.src = e.target.src;

      bigPictureComments.textContent = miniatureComments.textContent;

      // Cчётчик комментариев
      const socialCommentCount = bigPicture.querySelector('.social__comment-count');
      // Cчётчик загрузки новых комментариев
      const commentLoader = bigPicture.querySelector('.comments-loader');
      // Скрываю счетчики
      socialCommentCount.classList.add('hidden');
      commentLoader.classList.add('hidden');

      // Запрет прокручиватья экрану
      body.classList.add('modal-open');
    });
  });
};

openFullSize();

const closeFullSize = function () {
  buttonCloseFullImg.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  });
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

closeFullSize();
