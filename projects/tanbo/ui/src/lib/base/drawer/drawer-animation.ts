import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ANIMATE_FUNCTION } from '../../utils';

export const drawerAnimation = trigger('drawerAnimation', [
  state('void', style({
    width: 0,
    height: 0,
    overflow: 'hidden'
  })),
  state('left', style({
    left: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(0)'
  })),
  state('right', style({
    top: 0,
    bottom: 0,
    right: 0,
    transform: 'translateX(0)'
  })),
  state('top', style({
    top: 0,
    left: 0,
    right: 0,
    transform: 'translateY(0)'
  })),
  state('bottom', style({
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'translateY(0)'
  })),
  transition('void => bottom', animate(`200ms 200ms ${ANIMATE_FUNCTION}`, keyframes([style({
    offset: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    transform: 'translateY(100%)'
  }), style({
    offset: 1,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'translateY(0)'
  })]))),
  transition('bottom => void', animate(100, keyframes([style({
    offset: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'translateY(0)'
  }), style({
    offset: 1,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'translateY(100%)'
  })]))),

  transition('void => left', animate(`200ms 200ms ${ANIMATE_FUNCTION}`, keyframes([style({
    offset: 0,
    left: 0,
    top: 0,
    bottom: 0,
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    transform: 'translateX(-100%)'
  }), style({
    offset: 1,
    left: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(0)'
  })]))),
  transition('left => void', animate(100, keyframes([style({
    offset: 0,
    left: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(0)'
  }), style({
    offset: 1,
    left: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(-100%)'
  })]))),

  transition('void => right', animate(`200ms 200ms ${ANIMATE_FUNCTION}`, keyframes([style({
    offset: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    transform: 'translateX(100%)'
  }), style({
    offset: 1,
    right: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(0)'
  })]))),
  transition('right => void', animate(100, keyframes([style({
    offset: 0,
    right: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(0)'
  }), style({
    offset: 1,
    right: 0,
    top: 0,
    bottom: 0,
    transform: 'translateX(100%)'
  })]))),

  transition('void => top', animate(`200ms 200ms ${ANIMATE_FUNCTION}`, keyframes([style({
    offset: 0,
    right: 0,
    top: 0,
    left: 0,
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    transform: 'translateY(-100%)'
  }), style({
    offset: 1,
    right: 0,
    top: 0,
    left: 0,
    transform: 'translateY(0)'
  })]))),
  transition('top => void', animate(100, keyframes([style({
    offset: 0,
    right: 0,
    top: 0,
    left: 0,
    transform: 'translateY(0)'
  }), style({
    offset: 1,
    right: 0,
    top: 0,
    left: 0,
    transform: 'translateY(-100%)'
  })])))
]);
