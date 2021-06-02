// Функция возвращающая рандомные числа. Формулу для вычислений смотрел тут https://myrusakov.ru/js-random-numbers.html

let getRandomNumber = function  (min, max) {
  if (min >= max) {
<<<<<<< HEAD
    throw new Error
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  throw new Error
=======
    return"Не правильно задан параметр"
  } else if (min >= 0 && max > 0) {
    return Math.round(Math.random() * (max - min)) + min;
  }
>>>>>>> 823a21cb6d916f62164d4aa27502f4ee38012ce1
}


// Функция проверяющия длину строчки

let checkLength = function (line , maxLength) {
<<<<<<< HEAD
  if (line.length > maxLength) {
=======
  if (line > maxLength) {
>>>>>>> 823a21cb6d916f62164d4aa27502f4ee38012ce1
    return false
  }

  return true
}
