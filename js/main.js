// Функция возвращающая рандомные числа. Формулу для вычислений смотрел тут https://myrusakov.ru/js-random-numbers.html

let getRandomNumber = function  (min, max) {
  if (min >= max) {
    throw new Error
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  throw new Error
}


// Функция проверяющия длину строчки

let checkLength = function (line , maxLength) {
  if (line.length > maxLength) {
    return false
  }

  return true
}
