const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
 'Иван',
 'Леша', 
 'Женя', 
 'Максим'
];

let photoId = 1;
let commentId = 1;

// функция возвращает уникалтный числовой инлдификатор фото
let getPhotoId = function() {
  return photoId++;
}

// функция возвращает уникалтный числовой инлдификатор комментария 
let getCommentId = function() {
  return commentId++;
}


// Функция возвращающая рандомные числа. Формулу для вычислений смотрел тут https://myrusakov.ru/js-random-numbers.html
let getRandomNumber = function  (min, max) {
  if (min >= max) {
    throw new Error
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  throw new Error
}


// Функция проверяющия длину строчки

let checkLength = function (line , maxLength) {
  if (line.length > maxLength) {
    return false
  }

  return true
}

// функции для создания массива из N сгенерированных объектов
let createDescriptionPhotos = function (count) {
  let photos = [];
  for (let i = 1; i <= count; i++) {
    photos.push(createDescriptionPhoto());
  };
  return photos
};

let createDescriptionPhoto = function () {
  let id = getPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'опинчание фото',
    likes: getRandomNumber(15, 200), 
    comments: createCommentsPhotos(15)
  }
};

let createCommentsPhotos = function (count) {
  let comments = [];
  for (let i = 1; i <= count; i++) {
    comments.push(createCommentsPhoto());
  };
  return comments
};

let createCommentsPhoto = function () {
 return {
   id: getCommentId(),
   avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
   message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
   name: NAME[getRandomNumber(0, NAME.length - 1)]
 }
};

console.log(createDescriptionPhotos(25))

