import { isEscapeKey } from './util.js';
import { resetFilters } from './slider.js';
const buttonSubmit = document.querySelector('.img-upload__submit');
const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelModal = document.querySelector('.img-upload__cancel');
const textarea = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
// const body = document.querySelector('body');
// const succesModal = document.querySelector('.success__inner');
// Сообщение при успешной загрузке
const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const closeButton = document.querySelector('.success__button');
  closeButton.addEventListener('click', () => {
    successMessage.remove();
    buttonSubmit.removeAttribute('disabled');
  });

  // Добавляем обработчик события keydown на объект document
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      successMessage.remove();
    }
  });
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  const closeButtonError = document.querySelector('.error__button');
  closeButtonError.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      errorMessage.remove();
    }
  });
};

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

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
const hasValidTextCount = (value) => {
  const maxTextareaLength = textarea.getAttribute('data-pristine-maxlength');
  const textareaValue = value.trim();
  return textareaValue.length <= maxTextareaLength;
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

pristine.addValidator(
  textarea,
  hasValidCount,
  'Превышено максимальное колличество хэштегов'
);

pristine.addValidator(
  textarea,
  hasValidTextCount,
  'Превышено максимальное количество символов'
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

const clearErrorMessages = () => {
  const errorMessages = document.querySelectorAll('.pristine-error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });
};
// Закрытие модалки и сброс формы
const closeModal = () => {
  document.body.classList.remove('modal-open');
  form.reset();
  resetFilters();
  clearErrorMessages();
  pristine.reset();
  buttonSubmit.removeAttribute('disabled');
  overlay.classList.add('hidden');
};
cancelModal.addEventListener('click', closeModal);
const filtersForm = document.querySelector('.img-filters__form');
filtersForm.style.display = 'none';
const openFile = () => {
  fileInput.addEventListener('change', () => {
    filtersForm.style.display = 'block';
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
};
openFile();
const validateHashtags = () => {
  const isValid = pristine.validate(input);
  buttonSubmit.disabled = !isValid;
};

input.addEventListener('input', () => {
  validateHashtags();
});


const validateTextareaLength = () => {
  const isValidText = hasValidTextCount(textarea.value);
  if (!isValidText) {
    buttonSubmit.setAttribute('disabled', 'true');
  } else {
    buttonSubmit.removeAttribute('disabled');
  }
  return isValidText;
};
textarea.addEventListener('input', () => {
  validateTextareaLength();
});

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const isValidTeg = pristine.validate(input);
  const isValidText = validateTextareaLength();
  if (!isValidText || !isValidTeg) {
    buttonSubmit.setAttribute('disabled', 'true');
    return;
  }
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
      filtersForm.style.display = 'block';
      closeModal();
    })
    .catch((error) => {
      showErrorMessage();
      buttonSubmit.setAttribute('disabled', 'true');
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
