import {shuffle, debounce} from './util.js';
import {rendersPictures} from './render.js';

const imgFilters = document.querySelector('.img-filters');

const filterByRandom = (photos) => shuffle(photos).slice(0, 10);

const filterByDiscussed = (photos) => photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const filterByDefault = (photos) => photos;

const filters = {
  default: filterByDefault,
  random: filterByRandom,
  discussed: filterByDiscussed,
};


const openImgFilters = (photos) =>{
  const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  const debunceRendersPictures = debounce(rendersPictures, 500);

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
};

export {openImgFilters};
//
