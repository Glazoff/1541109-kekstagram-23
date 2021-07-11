import {MESSAGE, NAME} from './data.js';

// Функция возвращающая рандомные числа. Формулу для вычислений смотрел тут https://myrusakov.ru/js-random-numbers.html
const getRandomNumber = function (min, max) {
  if (min >= max) {
    throw new Error();
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  throw new Error();
};

// Функция проверяющия длину строчки
const checkLength = function (line, maxLength) {
  const check = line.length < maxLength;
  return check;
};

let photoId = 1;
let commentId = 1;

// функция возвращает уникальный числовой идентификатор фото
const getPhotoId = function () {
  return photoId++;
};

// функция возвращает уникальный числовой идентификатор комментария
const getCommentId = function () {
  return commentId++;
};

// Функции для создания массива из N сгенерированных объектов
const createDescriptionPhotos = function (count) {
  const photos = [];

  for (let i = 1; i <= count; i++) {
    photos.push(createDescriptionPhoto());
  }

  return photos;
};

const createDescriptionPhoto = function () {
  const id = getPhotoId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'опинчание фото',
    likes: getRandomNumber(15, 200),
    comments: createCommentsPhotos(getRandomNumber(1, 20)),
  };
};

const createCommentsPhotos = function (count) {
  const comments = [];

  for (let i = 1; i <= count; i++) {
    comments.push(createCommentsPhoto());
  }

  return comments;
};

const createCommentsPhoto = function () {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
    name: NAME[getRandomNumber(0, NAME.length - 1)],
  };
};

function removeClassStartsWith (node, className) {
  [...node.classList].forEach((v) => {
    if (v.startsWith(className)) {
      node.classList.remove(v);
    }
  });
}

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}


function debounce(f, ms) {
  let timerId;

  return function() {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      f.apply(this, arguments);
    } , ms);
  };

}


export {getRandomNumber,
  checkLength,
  getPhotoId,
  photoId,
  getCommentId,
  commentId,
  createDescriptionPhotos,
  createDescriptionPhoto,
  createCommentsPhotos,
  createCommentsPhoto,
  removeClassStartsWith,
  shuffle,
  debounce
};

