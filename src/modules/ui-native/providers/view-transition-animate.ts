import { style, state, animate, transition, keyframes, AnimationMetadata } from '@angular/animations';

export enum AnimationType {
    InLeft,
    OutLeft,
    InRight,
    OutRight
}

export interface PageTransition {
    activate: AnimationType;
    reactivate: AnimationType;
    destroy: AnimationType;
    toStack: AnimationType;
}

export const AnimationTypeBase = {
    [AnimationType.InLeft]: 'inLeft',
    [AnimationType.OutLeft]: 'outLeft',
    [AnimationType.InRight]: 'inRight',
    [AnimationType.OutRight]: 'outRight'
};
export const pageTransitionAnimate: AnimationMetadata[] = [state(AnimationTypeBase[AnimationType.OutLeft], style({
    transform: 'translateX(-30%)',
    opacity: 0
})), transition('* => ' + AnimationTypeBase[AnimationType.InRight], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateX(100%)',
        offset: 0
    }),
    style({
        transform: 'translateX(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.InLeft], animate('250ms ease-out', keyframes([
    style({
        opacity: 0.5,
        transform: 'translateX(-30%)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateX(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.OutRight], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateX(0)',
        offset: 0
    }),
    style({
        transform: 'translateX(100%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.OutLeft], animate('250ms ease-out', keyframes([
    style({
        opacity: 1,
        transform: 'translateX(0)',
        offset: 0
    }),
    style({
        opacity: 0.5,
        transform: 'translateX(-30%)',
        offset: 1
    })
])))];