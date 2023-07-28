const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const previewContainer = document.querySelector('.img-upload__preview-container');
const previewImage = previewContainer.querySelector('img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});
