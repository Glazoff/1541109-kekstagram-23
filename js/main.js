// Функция возвращающая рандомные числа. Формулу для вычислений смотрел тут https://myrusakov.ru/js-random-numbers.html

let getRandomNumber = function  (min, max) {
  if (min >= max) {
    return"Не правильно задан параметр"
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }
}


// Функция проверяющия длину строчки

let checkLength = function (line , maxLength) {
  if (line > maxLength) {
    return false
  }

  return true
}
