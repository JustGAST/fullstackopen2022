export const format = (value) => {
  if (value > 999) {
    value = (value / 1000).toFixed(1) + "k"
  }
  return value
}