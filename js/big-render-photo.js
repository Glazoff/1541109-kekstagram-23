const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const bigImg = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const photoComment = document.querySelector('#photo-comment').content;
const socialCaption = document.querySelector('.social__caption');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPhotoCloseEvent = new Event('close');


/** Функция отображения комментариев к фото */
const renderPhotoComments = function (comments) {
  const newComments = document.createDocumentFragment();
  socialComments.innerHTML = '';
  comments.forEach((comment) => {
    const copyComment = photoComment.cloneNode(true);

    copyComment.querySelector('.social__picture').src = comment.avatar;
    copyComment.querySelector('.social__picture').alt = comment.name;
    copyComment.querySelector('.social__text').textContent = comment.message;
    newComments.appendChild(copyComment);
  });
  socialComments.appendChild(newComments);
};

/** Функция загрузки комментариев */
function  commentsLoader (comments) {
  let commentsShowed = 5;
  const commentsLoaderButton = document.querySelector('.comments-loader');
  const showedCommentsCount = document.querySelector('.showed-comments-count');
  const commentsElement = comments.slice(0, commentsShowed);

  commentsLoaderButton.classList.remove('hidden');
  showedCommentsCount.classList.remove('hidden');

  renderPhotoComments(commentsElement);
  showedCommentsCount.textContent = commentsShowed;

  if (commentsShowed >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    showedCommentsCount.textContent = comments.length;
    return;
  }

  const clickHandler = ()=> {
    commentsShowed +=5;
    renderPhotoComments(comments.slice(0, commentsShowed));
    showedCommentsCount.textContent = commentsShowed;
    if (commentsShowed >= comments.length) {
      commentsLoaderButton.classList.add('hidden');
      showedCommentsCount.textContent = comments.length;
    }
  };

  commentsLoaderButton.addEventListener('click', clickHandler);
  bigPicture.addEventListener('close', function closeHandler() {
    commentsLoaderButton.removeEventListener('click', clickHandler);
    bigPicture.removeEventListener('close', closeHandler );
  });
}

/** Функция открытия полноразмерного изображения */
const openBigPhoto = function (photo) {
  bigPicture.classList.remove('hidden');

  bigImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  body.classList.add('modal-open');
  commentsLoader(photo.comments);
};

bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPicture.dispatchEvent(bigPhotoCloseEvent);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    bigPicture.dispatchEvent(bigPhotoCloseEvent);
  }
});

export {openBigPhoto};


