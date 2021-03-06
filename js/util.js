// Функция возвращающая рандомные числа. Формулу для вычислений смотрел тут https://myrusakov.ru/js-random-numbers.html
function getRandomNumber  (min, max) {
  if (min >= max) {
    throw new Error();
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  throw new Error();
}

function removeClassStartsWith (node, className) {
  [...node.classList].forEach((val) => {
    if (val.startsWith(className)) {
      node.classList.remove(val);
    }
  });
}

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}


function debounce(fn, ms) {
  let timerId;

  return function() {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, arguments);
    } , ms);
  };

}


export {getRandomNumber,
  removeClassStartsWith,
  shuffle,
  debounce
};

