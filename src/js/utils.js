const getRandom = (math) => math.random();
const getRandomInt = (math, min, max) => math.floor(
  math.random() * (max - min + 1) + min
);
const isVisible = (canvas, element) =>
   element.x > -40 && element.x < canvas.width + 40
&& element.y > -40 && element.y < canvas.height + 40;

const checkCoordinates = ({ range, coordinate }, target1, target2) =>
target1[coordinate] > target2[coordinate] - range && target1[coordinate] < target2[coordinate] + range;

const isCollision = (target1, target2) =>
checkCoordinates({range: 20, coordinate: 'x'}, target1, target2) &&
checkCoordinates({range: 20, coordinate: 'y'}, target1, target2)

const isAlive = (element) => !element.isDead;

const wasSpaceshipHitBy = (spaceShip, elements) =>
 elements
  .some((element) => isCollision(element, spaceShip))

const isGameOver = ({spaceShip, enemies}) => {
  let gameOver = false;
    enemies.map((enemy) => {
      if(wasSpaceshipHitBy(spaceShip, enemy.shots)){
        gameOver = true;
      }
    });

    if(wasSpaceshipHitBy(spaceShip, enemies.filter(isAlive))){
      gameOver = true;
    }

  return gameOver;
}

export {
  getRandom,
  getRandomInt,
  isVisible,
  isCollision,
  isAlive,
  isGameOver
}
