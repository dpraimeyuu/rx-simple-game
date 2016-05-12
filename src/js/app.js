import Rx from 'rx';
import { drawStars, drawSpaceShip, drawEnemies, drawSpaceshipShots } from './drawing-helpers';
import getHero$ from './hero';
import getStars$ from './stars';
import getEnemies$ from './enemies';
import getHeroShots$ from './hero-shots';

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
const SHOOTING_FREQ = 200;
const SHOOTING_SPEED = 15;

const renderScene = (canvas, actors) => {
  drawStars(canvas, actors.stars);
  drawSpaceShip(canvas, actors.spaceShip);
  drawEnemies(canvas, actors.enemies);
  drawSpaceshipShots(canvas, actors.heroShots);
}

const spaceShip$ = getHero$(canvas, { HERO_Y });
const stars$ = getStars$(canvas, { SPEED, STAR_NUMBER });
const enemies$ = getEnemies$(canvas, { ENEMY_FREQ, ENEMY_SPEED });
const heroShots$ = getHeroShots$(canvas, spaceShip$, { HERO_Y, SHOOTING_FREQ})
const game$ = Rx.Observable.combineLatest(
    stars$,
    spaceShip$,
    enemies$,
    heroShots$,
    (stars, spaceShip, enemies, heroShots) => ({stars, spaceShip, enemies, heroShots})
  )
  .sample(SPEED)
  .subscribe(renderScene.bind(null, canvas));
