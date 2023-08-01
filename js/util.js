const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// const alert = (text) =>{
//   const alertBlock = document.createElement('div');
//   alertBlock.style.position = 'absolute';
//   alertBlock.style.zIndex = '999';
//   alertBlock.style.left = '0';
//   alertBlock.style.top = '0';
//   alertBlock.style.right = '0';
//   alertBlock.style.padding = '10px 3px';
//   alertBlock.style.fontSize = '20px';
//   alertBlock.style.textAlign = 'center';
//   alertBlock.style.backgroundColor = 'red';
//   alertBlock.textContent = text;
//   document.body.append(alert);

//   setTimeout(() => {
//     alert.remove();
//   },4000);
// };

// const ERROR_TEXT = 'Ошибка загрузки';
// const SUCCSES_TEXT = 'Успешно';

export { isEscapeKey, debounce};
