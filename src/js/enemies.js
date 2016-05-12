import Rx from 'rx';
import { getRandom, getRandomInt } from './utils';
const getRandomFromMath = getRandom.bind(null, Math);
const getRandomIntFromMath = getRandomInt.bind(null, Math);

export default function getEnemies$ (canvas, { ENEMY_FREQ = 1500, ENEMY_SPEED = 250} = {}) {
  // side-effects here
  const updateEnemy = (enemy) => {
    enemy.x += getRandomIntFromMath(-15, 15);
    enemy.y += 5;

    return enemy;
  }
  const createEnemies$ = Rx.Observable.interval(ENEMY_FREQ)
    .scan((enemies) => [...enemies, {
      x: parseInt(getRandomFromMath() * canvas.width),
      y: -10
    }], []);

  const animateEnemies$ = Rx.Observable.interval(250);

  return Rx.Observable.combineLatest(createEnemies$, animateEnemies$,
    (createdElements, _) => createdElements.map(updateEnemy)
  );
}
