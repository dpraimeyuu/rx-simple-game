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

export {
  drawTriangle,
  drawStars,
  drawSpaceShip
};
