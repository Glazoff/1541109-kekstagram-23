import {photoEditor} from './photo-editor.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const success = document.querySelector('#success').content;
const successPopup = success.querySelector('.success');
const closeSuccessPopup = success.querySelector('.success__button');
const successInner = success.querySelector('.success__inner');
const error = document.querySelector('#error').content;
const errorPopup = error.querySelector('.error');
const errorInner = error.querySelector('.error__inner');
const closeErrorPopup = error.querySelector('.error__button');


// Открытие и закрытие формы редактирования
uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  photoEditor();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    if (
      document.activeElement === hashtagsInput ||
      document.activeElement === textDescription
    ) {
      return;
    }
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = '';
  }
});

uploadCancel.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
});

/** Валидатор максимального количества элемента массива */
const maxCountValidator = function (maxCount, array) {
  if (array.length > maxCount) {
    return false;
  }
  return true;
};

/** Валидатор уникальности элементов массива: каждый элемент массива должен быть уникальный */
const uniqueValidator = function (array) {
  let isUnique = true;
  array.forEach((item, index) => {
    array.forEach((_item, _index) => {
      if (item.toLowerCase() === _item.toLowerCase() && index !== _index) {
        isUnique = false;
      }
    });
  });
  return isUnique;
};

/** Валидатор соотвестсвия элементов массива шаблону */
const patternValidator = function (array, regExp) {
  if (array[0] === '') {
    return true;
  }
  return array.some((item) => regExp.test(item));
};

/** Функция валидации хештегов */
const hashtagsValidator = function (hashtags) {
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,20}$/;

  return (
    maxCountValidator(5, hashtags) &&
    uniqueValidator(hashtags) &&
    patternValidator(hashtags, regExp)
  );
};

hashtagsInput.addEventListener('input', () => {
  const value = hashtagsInput.value.trim();
  const hashtags = value.split(' ');
  if (!hashtagsValidator(hashtags)) {
    hashtagsInput.setCustomValidity('Поле для хештегов не валидное');
  } else {
    hashtagsInput.setCustomValidity('');
  }
  console.log(hashtagsValidator(hashtags));
});

/**Функция валидации комментариев */
const commentsValidator = function (string) {
  return maxCountValidator(140, string);
};

textDescription.addEventListener('input', () => {
  const string = textDescription.value;
  if (!commentsValidator(string)) {
    textDescription.setCustomValidity('Поле для комментариев не валидное');
  } else {
    textDescription.setCustomValidity('');
  }
  console.log(commentsValidator(string));
});

/** Функция открывающая/закрывающая окно успешной отправки фото  */
const openCloseSuccessPopup = function () {
  body.appendChild(successPopup);

  closeSuccessPopup.addEventListener('click', () => {
    successPopup.remove();
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target;
    if (successInner === target) {
      return;
    }
    successPopup.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      successPopup.remove();
    }
  });
};

/** Функция открывающая/закрывающая окно не успешной отправки фото  */
const openCloseErrorPopup = function () {
  body.appendChild(errorPopup);
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';

  closeErrorPopup.addEventListener('click', () => {
    errorPopup.remove();
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target;
    if (errorInner === target) {
      return;
    }
    errorPopup.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      errorPopup.remove();
    }
  });
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: new FormData(imgUploadForm),
  })
    .then(() =>  {
      imgUploadOverlay.classList.add('hidden');
      imgUploadForm.reset();
      openCloseSuccessPopup();
    })
    .catch (() => {
      openCloseErrorPopup();
    });
});

