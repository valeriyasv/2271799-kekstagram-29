import { isEscapeKey } from './util.js';
import { describesPhoto } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const miniature = document.querySelectorAll('.picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
// Колличество лайков полного изображения
const bigPictureLikes = document.querySelector('.likes-count');
// Колличество комментариев полного изображения
const commentsCount = document.querySelector('.comments-count');
// Описание полного изображения
const bigPictureDesc = document.querySelector('.social__caption');

const buttonCloseFullImg = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

// const matchedCommentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
// const matchedCommentFragment = document.createDocumentFragment();

const renderComments = function (comments, sizeComments = 5) {
  const socialComm = document.querySelector('.social__comments');
  socialComm.innerHTML = '';
  for (let i = 0; i < sizeComments; i++) {
    if (comments[i]) {

      const newElementLi = document.createElement('li');
      newElementLi.classList.add('social__comment');
      const newElementImg = document.createElement('img');
      newElementImg.classList.add('social__picture');
      newElementImg.setAttribute('src', comments[i].avatar);
      newElementImg.setAttribute('alt', comments[i].name);
      newElementImg.setAttribute('width', '35');
      newElementImg.setAttribute('height', '35');
      newElementLi.appendChild(newElementImg);
      const newElementP = document.createElement('p');
      newElementP.classList.add('social__text');
      newElementP.textContent = comments[i].message;
      newElementLi.appendChild(newElementP);
      socialComm.appendChild(newElementLi);
    }
  }
};

const changeCount = document.querySelector('.social__comment-count');
const openFullSize = function () {
  miniature.forEach((item) => {
    item.addEventListener('click', () => {
      const currentId = Number(item.dataset.id);
      const { url, description, likes, comments } = describesPhoto.find(({id}) => id === currentId);

      bigPictureDesc.textContent = description;
      bigPictureLikes.textContent = likes;
      bigPictureImg.src = url;
      bigPicture.classList.remove('hidden');
      commentsCount.textContent = comments.length;
      renderComments(comments);
      const buttonNewComm = document.querySelector('.social__comments-loader');
      buttonNewComm.addEventListener('click', () => {
        let result = 5;
        result += 5;
        renderComments(comments, result += 5);
      });
      const countCom = Array.from(bigPicture.querySelectorAll('.social__comment'));
      changeCount.textContent = `${countCom.length} из ${comments.length} комментариев.`;

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

