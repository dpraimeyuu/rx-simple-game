import Rx from 'rx';
import { curry, flatten } from 'ramda';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const appRoot = document.getElementById('root');

appRoot.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SPEED = 40;
const STAR_NUMBER = 250;

const getRandom = (math) => math.random();
const getRandomFromMath = getRandom.bind(null, Math);
const drawStars = (canvas, stars) => {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.map((star) => ctx.fillRect(star.x, star.y, star.size, star.size));
}

const animateStars$ = (stars) => Rx.Observable.interval(SPEED)
  .map(() => flatten(stars.map((star) => {
      if(star.y > canvas.height) {
        star.y = 0;
      }

      star.y += 3;

      return star;
    })))

const stars$ = Rx.Observable.range(1, STAR_NUMBER)
  .map(() => ({
    x: parseInt(getRandomFromMath() * canvas.width),
    y: parseInt(getRandomFromMath() * canvas.height),
    size: getRandomFromMath()  * 3 + 1
  }))
  .toArray()
  .flatMap(animateStars$);
  // .subscribe(drawStars.bind(null, canvas));

const HERO_Y = canvas.height - 30;
const mouseMove$ = Rx.Observable.fromEvent(canvas, 'mousemove');
const spaceShip$ = mouseMove$
  .map((e) => ({
    x: e.clientX,
    y: HERO_Y
  }))
  .startWith({
    x: canvas.width / 2,
    y: HERO_Y
  });

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

const renderScene = (canvas, actors) => {
  drawStars(canvas, actors.stars);
  drawSpaceShip(canvas, actors.spaceShip);
}

const game$ = Rx.Observable.combineLatest(
    stars$,
    spaceShip$,
    (stars, spaceShip) => ({stars, spaceShip})
  )
  .subscribe(renderScene.bind(null, canvas));
