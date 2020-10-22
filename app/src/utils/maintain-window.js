export const maintainWindow = (arr, length) => {
  if (arr.length > length) {
    arr.shift()
  }
  return arr
}