const getPhotos = () => fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((a) => a.json())
  .then ((b) => b)
  .catch((c) => console.log(c));


export {getPhotos};
