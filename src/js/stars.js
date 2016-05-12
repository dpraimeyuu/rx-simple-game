import Rx from 'rx';
import { flatten } from 'ramda';
import { getRandom } from './utils.js';

const getRandomFromMath = getRandom.bind(null, Math);

export default function getStars$ (canvas, {SPEED = 40, STAR_NUMBER = 250} = {}) {
  const animateStars$ = (stars) => Rx.Observable.interval(SPEED)
    .map(() => flatten(stars.map((star) => {
        if(star.y > canvas.height) {
          star.y = 0;
        }

        star.y += 3;

        return star;
      })))

  return Rx.Observable.range(1, STAR_NUMBER)
    .map(() => ({
      x: parseInt(getRandomFromMath() * canvas.width),
      y: parseInt(getRandomFromMath() * canvas.height),
      size: getRandomFromMath()  * 3 + 1
    }))
    .toArray()
    .flatMap(animateStars$);
}
