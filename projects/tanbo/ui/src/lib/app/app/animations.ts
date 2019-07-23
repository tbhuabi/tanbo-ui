import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const modalAnimation = trigger('modalAnimation', [
  transition(':enter', animate(160, keyframes([
    style({
      marginTop: -300,
      opacity: 0,
      offset: 0
    }),
    style({
      marginTop: 0,
      opacity: 1,
      offset: 1
    })
  ]))),
  transition(':leave', animate(100, style({
    transform: 'scale(.8) translateX(-50%) translateY(-50%)',
    opacity: .8
  })))
]);
export const dialogAnimation = trigger('dialogAnimation', [
  transition(':enter', animate('.1s', keyframes([
    style({
      transform: 'translateY(-100%)',
      offset: 0
    }),
    style({
      transform: 'translateY(0)',
      offset: 1
    })
  ]))),
  transition(':leave', animate(100, keyframes([
    style({
      transform: 'translateY(0)',
      offset: 0
    }),
    style({
      transform: 'translateY(-100%)',
      offset: 1
    })
  ])))
]);
