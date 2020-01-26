module.exports = function parseStringAsArray(arrayString) {
  return arrayString.split(',').map(tech => tech.trim());
}