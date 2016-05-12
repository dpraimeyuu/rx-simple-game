const getRandom = (math) => math.random();
const getRandomInt = (math, min, max) => math.floor(
  math.random() * (max - min + 1) + min
);

export {
  getRandom,
  getRandomInt
}
