import {commentsCount, getRandomArrayElement, getRandomInteger} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.' ,
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.' ,
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.' ,
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!' ,
];

const NAMES = [
  'Альберт' ,
  'Людмила' ,
  'Евгения' ,
  'Лариса' ,
  'Алла' ,
  'Виктор' ,
];

const DESCRIPTIONS = [
  'description2',
  'description3',
  'description4',
  'description5',
  'description6',
  'description7',
];

const count = getRandomInteger(1, 25);
const countId = getRandomInteger(1, 6);
const countLike = getRandomInteger(15, 200);
const randomAvatar = `img/avatar-${countId}.svg`;

const describePhoto = () => {
  const randomId = count;

  return {
    id: randomId,
    url: `photos/${count}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: countLike,
    comments: commentsCount(),
  };
};
const describesPhoto = Array.from({length: 25}, describePhoto);


export {MESSAGES, NAMES, DESCRIPTIONS, randomAvatar, describesPhoto};
