// import {describesPhoto} from './data.js';

const pictures = document.querySelector('.pictures');
pictures.querySelector('.pictures__title').classList.remove('visually-hidden');

const matchedFotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const matchedPhotos = describesPhoto;

const renderImg = (matchedPhotos) => {
  const matchedFotoFragment = document.createDocumentFragment();

  matchedPhotos.forEach(({url, likes, description, comments, id}) => {
    const templateClone = matchedFotoTemplate.cloneNode(true);
    templateClone.dataset.id = id;
    templateClone.querySelector('.picture__img').src = url;
    templateClone.querySelector('.picture__img').alt = description;
    templateClone.querySelector('.picture__likes').textContent = likes;
    templateClone.querySelector('.picture__comments').textContent = comments.length;
    matchedFotoFragment.appendChild(templateClone);
  });

  pictures.appendChild(matchedFotoFragment);
};

export { renderImg };
