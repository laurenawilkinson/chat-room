export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomArrayItem = <T>(array: T[]) => {
  return array[getRandomNumber(0, array.length - 1)]
}
