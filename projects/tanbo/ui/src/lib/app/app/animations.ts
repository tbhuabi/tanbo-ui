import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

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

export const notifyAnimation = trigger('notifyAnimation', [state('*', style({
  transformOrigin: '100% 0'
})), transition(':leave', animate('.2s', style({
  transform: 'scaleY(0)',
  opacity: 0
}))), transition(':enter', [style({
  transform: 'translateY(40px)',
  opacity: 0
}), animate('.2s', style({
  transform: 'translateY(0)',
  opacity: 1
}))])]);
