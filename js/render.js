import {openBigPhoto} from './big-render-photo.js';
import {getPhotos} from './photo-service.js';
import {openImgFilters} from './img-filters.js';

const picture = document.querySelector('#picture').content;
const templatePicture = picture.querySelector('.picture');
const pictures = document.querySelector('.pictures');


/** Функция отображения фотографий пользователей */
const rendersPictures = function (photos) {
  const pictureElements = document.querySelectorAll('.picture');

  pictureElements.forEach((element) => {
    pictures.removeChild(element);
  });

  const newPictures = document.createDocumentFragment();
  photos.forEach((photo) => {
    const copyTemplatePicture = templatePicture.cloneNode(true);

    copyTemplatePicture.querySelector('.picture__img').src = photo.url;
    copyTemplatePicture.querySelector('.picture__likes').textContent = photo.likes;
    copyTemplatePicture.querySelector('.picture__comments').textContent = photo.comments.length;
    copyTemplatePicture.dataset.id = photo.id;
    newPictures.appendChild(copyTemplatePicture);
  });

  pictures.appendChild(newPictures);
};

const openBigPhotoHandler = function (photos) {

  /** Функция возвраюащает объект данных фотографии по элементу фотографии */
  const getPhoto = function (pictureElement) {
    const idPhoto = +pictureElement.dataset.id;
    const curentPhoto = photos.find((photo) => photo.id === idPhoto);
    return curentPhoto;
  };

  pictures.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement === null) {
      return;
    }
    evt.preventDefault();
    const photo = getPhoto(pictureElement);
    openBigPhoto(photo);
  });
};

getPhotos().then((photos) =>  {
  rendersPictures(photos);
  openBigPhotoHandler(photos);
  openImgFilters(photos);
})
  .catch(() => alert('ошибка'));

export {rendersPictures};
