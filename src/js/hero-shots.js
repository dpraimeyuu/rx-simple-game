import Rx from 'rx';
const SPACE_KEY = 32;

export default function heroShots (canvas, spaceShip$, {SHOOTING_SPEED = 15, SHOOTING_FREQ = 200, HERO_Y = 750} = {}) {
  // side-effects here
  const updateShot = (shot) => {
    shot.y -= SHOOTING_SPEED;

    return shot;
  }

  const keyDown$ = Rx.Observable.fromEvent(canvas, 'keydown')
    .filter((e) => e.keycode == SPACE_KEY);
  const mouseClick$ = Rx.Observable.fromEvent(canvas, 'click');

  const playerFiring$ = Rx.Observable.merge(
    mouseClick$,
    keyDown$
  )
  .sample(SHOOTING_FREQ)
  .timestamp();

  const createShots$ = Rx.Observable.combineLatest(
    playerFiring$,
    spaceShip$,
    (shots, spaceShip) => ({x: spaceShip.x, timestamp: shots.timestamp})
  )
  .startWith([])
  .distinctUntilChanged((shot) => shot.timestamp)
  .scan((shots, shot) => [...shots, {x: shot.x, y: HERO_Y }], []);

  const animateShots$ = Rx.Observable.interval(100);

  return Rx.Observable.combineLatest(createShots$, animateShots$,
    (createdShots, _) => createdShots.map(updateShot)
  );
}
