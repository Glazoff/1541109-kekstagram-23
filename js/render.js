import {MESSAGE, NAME} from './data.js';
import {getRandomNumber,
  checkLength,
  getPhotoId,
  photoId,
  getCommentId,
  createDescriptionPhotos,
  createDescriptionPhoto,
  createCommentsPhotos,
  createCommentsPhoto
} from './util.js';

const picture = document.querySelector('#picture').content;
const templatePicture = picture.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const returnFunction = createDescriptionPhotos();

const newPictures = document.createDocumentFragment();

for (let i = 0; i < returnFunction.length; i++){
  const copyTemplatePicture = templatePicture.cloneNode(true);

  copyTemplatePicture.querySelector('.picture__img').src = returnFunction[i].url;
  copyTemplatePicture.querySelector('.picture__likes').textContent = returnFunction[i].likes;
  copyTemplatePicture.querySelector('.picture__comments').textContent = returnFunction[i].comments.length;

  newPictures.appendChild(copyTemplatePicture);
}

pictures.appendChild(newPictures);
