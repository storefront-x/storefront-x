export const randomFrom = (array) => array[Math.floor(Math.random() * array.length)]

export const randomNumber = (min = 0, max = 100) => Math.floor(Math.random() * (max - min) + min)

export const uniqueNumber = () => new Date().getTime()
