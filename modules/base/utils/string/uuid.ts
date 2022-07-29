/**
 * Returns new random UUID v4. For example: de305d54-75b4-431b-adb2-eb6b9e546014
 *
 * @see https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
 */
export default (): string => {
  let dt = new Date().getTime()

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

  return uuid
}
