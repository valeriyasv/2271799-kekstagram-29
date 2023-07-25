// import {MESSAGES, NAMES} from './data.js';
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// // const countId = getRandomInteger(1, 6);
// // const randomAvatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;

// const objComments = () => ({
//   id: Math.floor(Math.random() * 1000) + 1,
//   avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
//   message: getRandomArrayElement(MESSAGES),
//   name: getRandomArrayElement(NAMES),
// });

// const commentsCount = () => Array.from({length: getRandomInteger(0, 30)}, objComments);

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey};
