import { resetFilters } from './slider.js';

const buttonSubmit = document.querySelector('.img-upload__submit');
const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelModal = document.querySelector('.img-upload__cancel');
const textarea = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const resetButton = document.querySelector('.img-upload__cancel ');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const COUNT_VALID_TAGS = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const input = form.querySelector('.text__hashtags');
const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTag = (value) => normalizeTags(value).every((tag) => hashtag.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= COUNT_VALID_TAGS;
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
input.removeEventListener('change', pristine.validate);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
  input.removeEventListener('keydown', () => {
    if (e.key === 'Escape') {
      e.stopPropagation();
    }
  });
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
textarea.removeEventListener('input', validateTextareaLength);
// Сообщение при успешной загрузке
const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const closeButton = document.querySelector('.success__button');
  const onSuccessClose = () => {
    successMessage.remove();
    buttonSubmit.removeAttribute('disabled');
  };
  closeButton.addEventListener('click', onSuccessClose);

  // Добавляем обработчик события keydown на объект document
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      successMessage.remove();
    }
  });
  document.removeEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      successMessage.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      successMessage.remove();
    }
  });
  document.removeEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
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
      event.preventDefault();
      errorMessage.remove();
    }
  });
  document.removeEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      errorMessage.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      errorMessage.remove();
    }
  });
  document.removeEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      errorMessage.remove();
    }
  });
};

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const isValidTeg = pristine.validate(input);
  const isValidText = validateTextareaLength();
  if (!isValidText || !isValidTeg) {
    buttonSubmit.setAttribute('disabled', 'true');
    return;
  }
  buttonSubmit.setAttribute('disabled', 'true');
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
    .then(() => {
      showSuccessMessage();
      filtersForm.style.display = 'block';
      // showMessage(data);
      closeModal();
    })
    .catch(() => {
      showErrorMessage();
      buttonSubmit.setAttribute('disabled', 'true');
    });
});

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
});
textarea.removeEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
});

// Обработчик закрытия формы и кнопки сброса
const onResetFormAndCloseModal = () => {
  form.reset();
  closeModal();
};

// Добавляем обработчик события для кнопки сброса
resetButton.addEventListener('click', onResetFormAndCloseModal);
resetButton.removeEventListener('click', onResetFormAndCloseModal);
