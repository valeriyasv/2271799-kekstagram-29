import { isEscapeKey } from './util.js';
import './slider.js';

const COUNT_FIRST_COMMENTS = 5;
const changeCount = document.querySelector('.social__comment-count');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
// Колличество лайков полного изображения
const bigPictureLikes = document.querySelector('.likes-count');
// Колличество комментариев полного изображения
const commentsCount = document.querySelector('.comments-count');
// Описание полного изображения
const bigPictureDesc = document.querySelector('.social__caption');
const buttonCloseFullImg = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const socialComment = document.querySelector('.social__comments');

const renderComments = function (comments, sizeComments = COUNT_FIRST_COMMENTS) {
  socialComment.innerHTML = '';

  comments.slice(0, sizeComments).forEach((comment) => {
    const newElementLi = document.createElement('li');
    newElementLi.classList.add('social__comment');

    const newElementImg = document.createElement('img');
    newElementImg.classList.add('social__picture');
    newElementImg.setAttribute('src', comment.avatar);
    newElementImg.setAttribute('alt', comment.name);
    newElementImg.setAttribute('width', '35');
    newElementImg.setAttribute('height', '35');
    newElementLi.appendChild(newElementImg);

    const newElementP = document.createElement('p');
    newElementP.classList.add('social__text');
    newElementP.textContent = comment.message;
    newElementLi.appendChild(newElementP);

    socialComment.appendChild(newElementLi);
  });

  const commentCount = comments.length > COUNT_FIRST_COMMENTS ? COUNT_FIRST_COMMENTS : String(comments.length);
  changeCount.textContent = `${commentCount} из ${comments.length} комментариев`;
};

const buttonNewComm = document.querySelector('.social__comments-loader');
const openFullSize = function (data) {
  const miniature = document.querySelectorAll('.picture');

  const renderFullSizeImage = ({ url, description, likes, comments }) => {
    buttonNewComm.style.display = 'block';
    bigPictureDesc.textContent = description;
    bigPictureLikes.textContent = likes;
    bigPictureImg.src = url;
    commentsCount.textContent = comments.length;
    bigPicture.classList.remove('hidden');
    const countCom = comments.length < COUNT_FIRST_COMMENTS ? comments.length : COUNT_FIRST_COMMENTS;
    renderComments(comments, countCom);
    if (comments.length < COUNT_FIRST_COMMENTS) {
      buttonNewComm.style.display = 'none';
    }
    let result = COUNT_FIRST_COMMENTS;
    buttonNewComm.addEventListener('click', () => {
      buttonNewComm.style.display = 'block';
      result += COUNT_FIRST_COMMENTS;
      if (result >= comments.length) {
        buttonNewComm.style.display = 'none';
        result = comments.length;
      }
      if (comments.length < COUNT_FIRST_COMMENTS){
        renderComments(comments, commentsCount);
      } else {
        renderComments(comments, result);
        changeCount.textContent = `${result} из ${comments.length} комментариев`;
      }
    });
    // Запрет прокручиватья экрану
    body.classList.add('modal-open');
  };

  const handleMiniatureClick = (item) => {
    const currentId = Number(item.dataset.id);
    const imageData = data.find(({ id }) => id === currentId);
    renderFullSizeImage(imageData);
  };

  miniature.forEach((item) => {
    item.addEventListener('click', () => handleMiniatureClick(item));
  });
};


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

export { openFullSize };
