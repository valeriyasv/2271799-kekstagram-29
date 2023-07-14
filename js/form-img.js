import { isEscapeKey } from './util.js';

const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelModal = document.querySelector('.img-upload__cancel');
const textarea = document.querySelector('.text__description');


// Изменение значения контрола загрузки файла
const openFile = () => {
  fileInput.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
};
openFile();

// Закрытие модалки
const clouseModal = () => {
  cancelModal.addEventListener('click', () => {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

};
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
clouseModal();

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
});
