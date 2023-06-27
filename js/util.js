import {randomAvatar, MESSAGES, NAMES} from './data.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const objComments = () => ({
  id: Math.floor(Math.random() * 1000) + 1,
  avatar: randomAvatar,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const commentsCount = () => Array.from({length: getRandomInteger(0, 30)}, objComments);

export {commentsCount, getRandomArrayElement, getRandomInteger};
