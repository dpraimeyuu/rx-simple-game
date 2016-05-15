import Rx from 'rx';
import { getRandom, getRandomInt, isVisible } from './utils';
const getRandomFromMath = getRandom.bind(null, Math);
const getRandomIntFromMath = getRandomInt.bind(null, Math);

export default function getEnemies$ (canvas, {
    ENEMY_CREATION_FREQ = 1500,
    ENEMY_UPDATE_FREQ = 250,
    ENEMY_SHOOTING_FREQ = 750,
    ENEMY_SPEED = 15,
    SHOOTING_SPEED = 15
  } = {}) {
  const isVisibleOnCanvas = isVisible.bind(null, canvas);
  // side-effects here
  const updateEnemy = (enemy) => {
    enemy.x += getRandomIntFromMath(-15, 15);
    enemy.y += ENEMY_SPEED;

    return enemy;
  };
  const updateShot = (shot) => {
    shot.y += SHOOTING_SPEED;

    return shot;
  };
  const createEnemies$ = Rx.Observable.interval(ENEMY_CREATION_FREQ)
    .scan((enemies) => {
      let enemy = {
        x: parseInt(getRandomFromMath() * canvas.width),
        y: -10,
        shots: []
      };

      Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(() => {
        debugger;
        enemy.shots = enemy.shots
          .filter(isVisibleOnCanvas)
          .map(updateShot);
        enemy.shots.push({x: enemy.x, y: enemy.y});
      });

      return [...enemies, enemy].filter(isVisibleOnCanvas)
    }, []);

  const animateEnemies$ = Rx.Observable.interval(ENEMY_UPDATE_FREQ);

  return Rx.Observable.combineLatest(
    createEnemies$,
    animateEnemies$,
    (createdEnemies, _) => createdEnemies.map(updateEnemy)
  );
}
