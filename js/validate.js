// import { buttonSubmit } from './form-img.js';

const valid = () => {

  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

  const form = document.querySelector('.img-upload__form');


  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });


  const input = form.querySelector('.text__hashtags');
  const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
  const hasValidTag = (value) => normalizeTags(value).every((tag) => hashtag.test(tag));
  const hasValidCount = (value) => normalizeTags(value).length <= 5;
  const hasUniqueTags = (value) => {
    const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
    return lowerCaseTags.length === new Set(lowerCaseTags).size;
  };

  pristine.addValidator(
    input,
    hasUniqueTags,
    'Такой хэштег уже существует'
  );

  pristine.addValidator(
    input,
    hasValidTag,
    'Не корректный хэштег'
  );

  pristine.addValidator(
    input,
    hasValidCount,
    'Превышено максимальное колличество хэштегов'
  );


  input.addEventListener('change', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
    }
  });
};

valid();
