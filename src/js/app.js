import Rx from 'rx';
import { drawStars, drawTriangle, drawSpaceShip } from './drawing-helpers';
import getHero$ from './hero';
import getStars$ from './stars';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const appRoot = document.getElementById('root');

appRoot.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SPEED = 40;
const STAR_NUMBER = 250;
const HERO_Y = canvas.height - 30;

const renderScene = (canvas, actors) => {
  drawStars(canvas, actors.stars);
  drawSpaceShip(canvas, actors.spaceShip);
}

const spaceShip$ = getHero$(canvas, {HERO_Y});
const stars$ = getStars$(canvas, {SPEED, STAR_NUMBER});
const game$ = Rx.Observable.combineLatest(
    stars$,
    spaceShip$,
    (stars, spaceShip) => ({stars, spaceShip})
  )
  .subscribe(renderScene.bind(null, canvas));
