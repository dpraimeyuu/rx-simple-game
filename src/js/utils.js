const getRandom = (math) => math.random();
const getRandomInt = (math, min, max) => math.floor(
  math.random() * (max - min + 1) + min
);
const isVisible = (canvas, element) =>
   element.x > -40 && element.x < canvas.width + 40
&& element.y > -40 && element.y < canvas.height + 40;

export {
  getRandom,
  getRandomInt,
  isVisible,
}
