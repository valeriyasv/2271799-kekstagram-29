const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.' ,
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.' ,
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.' ,
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!' ,
];

const name = [
  'Альберт' ,
  'Людмила' ,
  'Евгения' ,
  'Лариса' ,
  'Алла' ,
  'Виктор' ,
];

const description = [
  'description2',
  'description3',
  'description4',
  'description5',
  'description6',
  'description7',
]

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const count = getRandomInteger(1, 25);
const countId = getRandomInteger(1, 6);
const countLike = getRandomInteger(15, 200);
const randomAvatar = `img/avatar-${countId}.svg`;

const objComments = {
  id: Math.floor(Math.random() * 1000) + 1,
  avatar: randomAvatar,
  message: getRandomArrayElement(message),
  name: getRandomArrayElement(name),
};

const commentsCount = () => Array.from({length: getRandomInteger(0, 30)}, objComments);

const describePhoto = () => {
  const randomId = count;

  return {
    id: randomId,
    url: `photos/${count}.jpg`,
    description: getRandomArrayElement(description),
    likes: countLike,
    comments: commentsCount,
  };
};

const describesPhoto = Array.from({length: 25}, describePhoto);

console.log(describesPhoto);
