const getPhotos = () => fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json());

export {getPhotos};
