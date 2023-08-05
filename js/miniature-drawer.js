const pictures = document.querySelector('.pictures');
pictures.querySelector('.pictures__title').classList.remove('visually-hidden');

const fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderImg = (matchedPhotos) => {
  const fotoFragment = document.createDocumentFragment();

  matchedPhotos.forEach(({url, likes, description, comments, id}) => {
    const templateClone = fotoTemplate.cloneNode(true);
    templateClone.dataset.id = id;
    templateClone.querySelector('.picture__img').src = url;
    templateClone.querySelector('.picture__img').alt = description;
    templateClone.querySelector('.picture__likes').textContent = likes;
    templateClone.querySelector('.picture__comments').textContent = comments.length;
    fotoFragment.appendChild(templateClone);
  });

  pictures.appendChild(fotoFragment);
};

export { renderImg };
