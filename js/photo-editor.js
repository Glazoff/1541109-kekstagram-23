import {removeClassStartsWith} from './util.js';
const photoScaleEditor = function () {
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imgUploadPreview = document.querySelector('.img-upload__preview');

  const SCALE_DEFAULT_VALUE = 100;
  const SCALE_DEFAULT_STEP = 25;
  const MAX_VALUE = 100;
  const MIN_VALUE = 25;

  let scaleValue = SCALE_DEFAULT_VALUE;

  /** Функция обновляет значения маштаба изображения  */
  const setScaleControleValue = () => {
    scaleControlValue.value = `${scaleValue}%`;
  };

  /** Функция отвечающая за установку стиля к изображению */
  const scaleImgUploadPreview = () => {
    imgUploadPreview.style.transform = `scale(${scaleValue/100})`;
  };

  /** Функция маштабирует изображения и сохраняет значнеия */
  const scalePhoto = () => {
    setScaleControleValue();
    scaleImgUploadPreview();
  };

  scalePhoto();

  scaleControlSmaller.addEventListener('click', ()=>{
    if (scaleValue === MIN_VALUE) {
      return;
    }

    scaleValue = scaleValue - SCALE_DEFAULT_STEP;
    scalePhoto();
  });

  scaleControlBigger.addEventListener('click', ()=>{
    if(scaleValue === MAX_VALUE) {
      return;
    }

    scaleValue = scaleValue + SCALE_DEFAULT_STEP;
    scalePhoto();
  });
};

let uiSlider = null;

const photoFilterEditer = function () {
  const effectsRadios = document.querySelectorAll('.effects__radio');
  const imgUploadPreview = document.querySelector('.img-upload__preview');
  const effectLevelSlider = document.querySelector('.effect-level__slider');
  let effectLevelValue = document.querySelector('.effect-level__value');


  if (uiSlider === null) {
    uiSlider = noUiSlider.create(effectLevelSlider, {
      start: [100],
      step: 1,
      range: {
        'min': [0],
        'max': [100],
      },
    });
  }

  /** Функция принимяющие занчения фильтра к изобажению */
  const applyValueFilter = (valueFilter) => {
    effectLevelValue = valueFilter;
    imgUploadPreview.style.filter = effectLevelValue;
  };

  effectLevelSlider.classList.add('hidden');

  /** Функция расчитввающая значения задаваемого фильтра */
  const getScaleValueFilter = (filterName) => {
    effectLevelSlider.noUiSlider.reset();

    effectLevelSlider.noUiSlider.on('update', (value) => {
      const chrome = `grayscale(${(+value[0]/100).toFixed(1)})`;
      const sepia = `sepia(${(+value[0]/100).toFixed(1)})`;
      const marvin = `invert(${+value[0]}%)`;
      const phobos = `blur(${((+value[0])*3/100).toFixed(1)}px)`;
      const heat = `brightness(${((+value[0])*3/100).toFixed(1)})`;

      if (effectLevelSlider.classList.contains('hidden')) {
        effectLevelSlider.classList.remove('hidden');
      }

      if (filterName === 'chrome'){
        applyValueFilter(chrome);
      } else if (filterName === 'sepia'){
        applyValueFilter(sepia);
      } else if (filterName === 'marvin'){
        applyValueFilter(marvin);
      } else if (filterName === 'phobos'){
        applyValueFilter(phobos);
      } else if (filterName === 'heat'){
        applyValueFilter(heat);
      } else {
        applyValueFilter('');
        effectLevelSlider.classList.add('hidden');
      }
    });
  };


  const applyFilter = (filter) => {
    /* удаляет ранее дабавленные классы, решает вопрос по смене фильтров */
    removeClassStartsWith(imgUploadPreview,'effects__preview--');
    imgUploadPreview.classList.add(`effects__preview--${filter}`);
    getScaleValueFilter(filter);
  };

  /* Сбрасывается значения фильтра */
  applyFilter('');

  effectsRadios.forEach((effectsRadio) =>  {
    effectsRadio.addEventListener('change', () => {
      applyFilter(effectsRadio.value);
      console.log(effectsRadio.value);
    });
  });
};

const photoEditor = function() {
  photoFilterEditer();
  photoScaleEditor();
};

export {photoEditor};
