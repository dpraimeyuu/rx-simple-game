import Rx from 'rx';
import { drawStars, drawSpaceShip, drawEnemies, drawSpaceshipShots } from './drawing-helpers';
import { isCollision, isAlive, isGameOver } from './utils';
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
const HERO_SHOOTING_SPEED = 15;
const SHOOTING_FREQ = 200;
const ENEMY_CREATION_FREQ = 1500;
const ENEMY_UPDATE_FREQ = 250;
const ENEMY_SPEED = 7;
const ENEMY_SHOOTING_FREQ = 200;
const ENEMY_SHOOTING_LIKELIHOOD = 0.6;
const ENEMY_SHOOTING_SPEED = ENEMY_SPEED * 6;

const renderScene = (canvas, actors) => {
  drawStars(canvas, actors.stars);
  drawSpaceShip(canvas, actors.spaceShip);
  drawEnemies(canvas, actors.enemies);
  drawSpaceshipShots(canvas, actors.heroShots);
}

const spaceShip$ = getHero$(canvas, { HERO_Y });
const stars$ = getStars$(canvas, { SPEED, STAR_NUMBER });
const enemies$ = getEnemies$(canvas, {
  ENEMY_CREATION_FREQ,
  ENEMY_UPDATE_FREQ,
  ENEMY_SPEED,
  ENEMY_SHOOTING_FREQ,
  ENEMY_SHOOTING_LIKELIHOOD,
  SHOOTING_SPEED: ENEMY_SHOOTING_SPEED
 });
const heroShots$ = getHeroShots$(canvas, spaceShip$, {
  HERO_Y,
  SHOOTING_FREQ,
  SHOOTING_SPEED: HERO_SHOOTING_SPEED
});

const game$ = Rx.Observable.combineLatest(
    stars$,
    spaceShip$,
    enemies$,
    heroShots$,
    (stars, spaceShip, enemies, heroShots) => {
      heroShots.map((shot) => {
        enemies.map((enemy) => {
          if(isAlive(enemy) && isCollision(shot, enemy)){
            shot.x = shot.y = -100;
            enemy.isDead = true;
          }
        });
      });

      return {stars, spaceShip, enemies, heroShots};
    }
  )
  .sample(SPEED)
  .takeWhile((actors) => !isGameOver(actors))
  .subscribe(renderScene.bind(null, canvas));
