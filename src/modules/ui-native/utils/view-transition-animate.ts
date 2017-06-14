import { style, state, animate, transition, keyframes, AnimationMetadata } from '@angular/animations';

export enum AnimationType {
    SlideInLeft,
    SlideOutLeft,
    SlideInRight,
    SlideOutRight
}

export interface PageTransition {
    activate: AnimationType;
    reactivate: AnimationType;
    destroy: AnimationType;
    toStack: AnimationType;
}

export const AnimationTypeBase = {
    [AnimationType.SlideInLeft]: 'slideInLeft',
    [AnimationType.SlideOutLeft]: 'slideOutLeft',
    [AnimationType.SlideInRight]: 'slideInRight',
    [AnimationType.SlideOutRight]: 'slideOutRight'
};

export const pageTransitionAnimate: AnimationMetadata[] = [state(AnimationTypeBase[AnimationType.SlideOutLeft], style({
    transform: 'translateX(-30%)',
    opacity: 0
})), transition('* => ' + AnimationTypeBase[AnimationType.SlideInRight], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateX(100%)',
        offset: 0
    }),
    style({
        transform: 'translateX(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideInLeft], animate('250ms ease-out', keyframes([
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
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideOutRight], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateX(0)',
        offset: 0
    }),
    style({
        transform: 'translateX(100%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideOutLeft], animate('250ms ease-out', keyframes([
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