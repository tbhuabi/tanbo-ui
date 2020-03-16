import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ANIMATE_FUNCTION } from '../../utils';

export const modalAnimation = trigger('modalAnimation', [
  state('void', style({
    transform: 'scale(0.95) translateX(-50%) translateY(-50%)',
    opacity: 0
  })),
  transition(':enter', animate(`160ms 150ms ${ANIMATE_FUNCTION}`, keyframes([
    style({
      transform: 'scale(0.95) translateX(-50%) translateY(-50%)',
      opacity: 1,
      offset: 0
    }),
    style({
      transform: 'scale(1) translateX(-50%) translateY(-50%)',
      offset: 1
    })
  ]))),
  transition(':leave', animate(100, style({
    transform: 'scale(.8) translateX(-50%) translateY(-50%)',
    opacity: .8
  })))
]);
export const dialogAnimation = trigger('dialogAnimation', [
  state('void', style({
    transform: 'translateY(-100%)',
    opacity: 0
  })),
  transition(':enter', animate(`160ms 200ms ${ANIMATE_FUNCTION}`, keyframes([
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
      offset: 0
    }),
    style({
      transform: 'translateY(0)',
      opacity: 1,
      offset: 1
    })
  ]))),
  transition(':leave', animate(`160ms ease-in-out`, keyframes([
    style({
      transform: 'translateY(0)',
      opacity: 1,
      offset: 0
    }),
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
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
