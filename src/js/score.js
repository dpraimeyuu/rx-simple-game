import Rx from 'rx';

export default function getScoreSubject () {
  const scoreSubject = new Rx.Subject();
  const score$ = scoreSubject
    .startWith(0)
    .scan((prev, cur) => prev + cur, 0)

  return {scoreSubject, score$};
}
