import Rx from 'rx';

export default function getHero$ (canvas, {HERO_Y = 730} = {}) {
  const mouseMove$ = Rx.Observable.fromEvent(canvas, 'mousemove');
  return mouseMove$
    .map((e) => ({
      x: e.clientX,
      y: HERO_Y
    }))
    .startWith({
      x: canvas.width / 2,
      y: HERO_Y
    });
}
