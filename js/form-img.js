import { isEscapeKey } from './util.js';

const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelModal = document.querySelector('.img-upload__cancel');
const textarea = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Сообщение при успешной загрузке
const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const closeButton = document.querySelector('.success__button');
  closeButton.addEventListener('click', () => {
    successMessage.remove();
  });
};

// Сообщение при ошибке
const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  const closeButtonError = document.querySelector('.error__button');
  closeButtonError.addEventListener('click', () => {
    errorMessage.remove();
  });
};

const openFile = () => {
  fileInput.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
};
openFile();

// Закрытие модалки и сброс формы
const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
};
cancelModal.addEventListener('click', closeModal);

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('https://29.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: new FormData(form),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка');
      }
      return response.json();
    })
    .then((data) => {
      showSuccessMessage();
      console.log('Данные успешно отправлены:', data);
      closeModal();
    })
    .catch((error) => {
      showErrorMessage();
      console.error('Произошла ошибка при отправке данных:', error.message);
    });
});

// Обработчик закрытия формы и кнопки сброса
const resetFormAndCloseModal = () => {
  form.reset();
  closeModal();
};

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    resetFormAndCloseModal();
  }
});

// Обработчик нажатия на кнопку сброса
const resetButton = document.querySelector('.img-upload__cancel ');
resetButton.addEventListener('click', resetFormAndCloseModal);
