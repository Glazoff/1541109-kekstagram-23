import {getRandomNumber} from './util.js';
import {MESSAGE, NAME} from './data';

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

function createCommentsPhoto  () {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
    name: NAME[getRandomNumber(0, NAME.length - 1)],
  };
}

function createCommentsPhotos  (count) {
  const comments = [];

  for (let index = 1; index <= count; index++) {
    comments.push(createCommentsPhoto());
  }

  return comments;
}

function createDescriptionPhoto () {
  const id = getPhotoId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'опинчание фото',
    likes: getRandomNumber(15, 200),
    comments: createCommentsPhotos(getRandomNumber(1, 20)),
  };
}


function createDescriptionPhotos (count) {
  const photos = [];

  for (let index = 1; index <= count; index++) {
    photos.push(createDescriptionPhoto());
  }

  return photos;
}

export {createDescriptionPhotos};
