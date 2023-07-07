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

const describePhoto = () => {

  const arr = [];
  for (let i = 1; i <= 25; i++) {
    arr.push({
      id: i,
      url: `photos/${(i)}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: commentsCount(),
    });
  }
  return arr;
};
const describesPhoto = describePhoto();


export {MESSAGES, NAMES, DESCRIPTIONS, describesPhoto};
