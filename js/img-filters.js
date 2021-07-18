import {shuffle, debounce} from './util.js';
import {rendersPictures} from './render.js';

const TIME_LOADING_PHOTO = 500;
const MAX_COUNT_LOADING_PHOTO = 10;

const imgFilters = document.querySelector('.img-filters');

const filterByRandom = (photos) => shuffle(photos).slice(0, MAX_COUNT_LOADING_PHOTO);

const filterByDiscussed = (photos) => photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const filterByDefault = (photos) => photos;

const filters = {
  default: filterByDefault,
  random: filterByRandom,
  discussed: filterByDiscussed,
};


function openImgFilters  (photos) {
  const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  const debunceRendersPictures = debounce(rendersPictures, TIME_LOADING_PHOTO);

  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
      const activeButton = document.querySelector('.img-filters__button--active');
      const filter = button.id.split('-')[1];
      const filterByFn =filters[filter];
      const filteredPhotos = filterByFn(photos);
      activeButton.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

      debunceRendersPictures(filteredPhotos);
    });
  });
}

export {openImgFilters};
//
