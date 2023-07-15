import { isEscapeKey } from './util.js';
import { describesPhoto } from './data.js';
import './slider.js';

const changeCount = document.querySelector('.social__comment-count');
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
  let commentCount = comments.length;
  if (commentCount > 5) {
    commentCount = 5;
  } else {
    commentCount = comments.length;
  }
  changeCount.textContent = `${commentCount} из ${comments.length} комментариев.`;
};

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
      const countCom = comments.length < 5 ? comments.length : 5;
      renderComments(comments, countCom);
      const buttonNewComm = document.querySelector('.social__comments-loader');
      if (comments.length < 5) {
        buttonNewComm.style.display = 'none';
      }
      let result = 0;
      buttonNewComm.addEventListener('click', () => {
        result += 5;
        if (result >= comments.length) {
          buttonNewComm.style.display = 'none';
          result = comments.length;
        }
        if (comments.length < 5){
          renderComments(comments, comments.length);
        } else {
          renderComments(comments, result);
          changeCount.textContent = `${result} из ${comments.length} комментариев.`;
        }
      });

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

