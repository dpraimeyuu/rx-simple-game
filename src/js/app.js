import Rx from 'rx';
import { drawStars, drawSpaceShip, drawEnemies } from './drawing-helpers';
import getHero$ from './hero';
import getStars$ from './stars';
import getEnemies$ from './enemies';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const appRoot = document.getElementById('root');

appRoot.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SPEED = 40;
const STAR_NUMBER = 250;
const HERO_Y = canvas.height - 30;
const ENEMY_FREQ = 1500;
const ENEMY_SPEED = 250;

const renderScene = (canvas, actors) => {
  drawStars(canvas, actors.stars);
  drawSpaceShip(canvas, actors.spaceShip);
  drawEnemies(canvas, actors.enemies);
}

const spaceShip$ = getHero$(canvas, { HERO_Y });
const stars$ = getStars$(canvas, { SPEED, STAR_NUMBER });
const enemies$ = getEnemies$(canvas, { ENEMY_FREQ, ENEMY_SPEED });
const game$ = Rx.Observable.combineLatest(
    stars$,
    spaceShip$,
    enemies$,
    (stars, spaceShip, enemies) => ({stars, spaceShip, enemies})
  )
  .sample(SPEED)
  .subscribe(renderScene.bind(null, canvas));
