import { getRandomInt, isAlive } from './utils';
const getRandomIntFromMath = getRandomInt.bind(null, Math);

const drawStars = (canvas, stars) => {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.map((star) => ctx.fillRect(star.x, star.y, star.size, star.size));
}

const drawTriangle = (ctx, { x, y, width, color, direction }) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - width, y);
  ctx.lineTo(x, direction === 'up' ? y - width : y + width);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x - width, y);
  ctx.fill();
}

const drawSpaceShip = (canvas, point) => {
  let ctx = canvas.getContext('2d');
  drawTriangle(ctx, Object.assign(point, {
    width: 20,
    color: '#ff0000',
    direction: 'up'
  }));
}

const drawEnemies = (canvas, enemies) => {
  let ctx = canvas.getContext('2d');
  enemies
  .map((enemy) => {
    if(isAlive(enemy)){
      drawTriangle(ctx, Object.assign({}, enemy, {
        width: 20,
        color: '#00ff00',
        direction: 'down'
      }));
    }

    enemy.shots.map((shot) => {
      drawTriangle(ctx, Object.assign({}, shot, {
        width: 5,
        color: '#00ffff',
        direction: 'down'
      }));

      return shot;
    });

    return enemy;
  });
}

const drawSpaceshipShots = (canvas, shots) => {
  let ctx = canvas.getContext('2d');
  shots.map((shot) => drawTriangle(ctx, Object.assign({}, shot, {
    width: 5,
    color: '#ffff00',
    direction: 'up'
  })));
}

const drawScore = (canvas, score, {x = 40, y = 43} = {}) => {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(`Score: ${score}`, x, y);
}

export {
  drawStars,
  drawSpaceShip,
  drawEnemies,
  drawSpaceshipShots,
  drawScore
};
