import { style, state, animate, transition, keyframes, AnimationMetadata } from '@angular/animations';

export enum AnimationType {
    SlideInLeft,
    SlideOutLeft,
    SlideInRight,
    SlideOutRight,
    SlideInUp,
    SlideOutUp,
    SlideInDown,
    SlideOutDown,
    FadeInLeft,
    FadeOutLeft,
    FadeInRight,
    FadeOutRight,
    FadeInUp,
    FadeOutUp,
    FadeInDown,
    FadeOutDown
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
    [AnimationType.SlideOutRight]: 'slideOutRight',
    [AnimationType.SlideInUp]: 'slideInUp',
    [AnimationType.SlideOutUp]: 'slideOutUp',
    [AnimationType.SlideInDown]: 'slideInDown',
    [AnimationType.SlideOutDown]: 'slideOutDown',
    [AnimationType.FadeInLeft]: 'fadeInLeft',
    [AnimationType.FadeOutLeft]: 'fadeOutLeft',
    [AnimationType.FadeInRight]: 'fadeInRight',
    [AnimationType.FadeOutRight]: 'fadeOutRight',
    [AnimationType.FadeInUp]: 'fadeInUp',
    [AnimationType.FadeOutUp]: 'fadeOutUp',
    [AnimationType.FadeInDown]: 'fadeInDown',
    [AnimationType.FadeOutDown]: 'fadeOutDown'
};

export const pageTransitionAnimate: AnimationMetadata[] = [state(AnimationTypeBase[AnimationType.SlideOutLeft], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.SlideOutRight], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.SlideOutUp], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.SlideOutDown], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.FadeOutLeft], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.FadeOutRight], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.FadeOutUp], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.FadeOutDown], style({
    display: 'none'
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
        transform: 'translateX(-30%)',
        offset: 0
    }),
    style({
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
        transform: 'translateX(0)',
        offset: 0
    }),
    style({
        transform: 'translateX(-30%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideInUp], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateY(100%)',
        offset: 0
    }),
    style({
        transform: 'translateY(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideOutUp], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateY(0)',
        offset: 0
    }),
    style({
        transform: 'translateY(-100%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideInDown], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateY(-100%)',
        offset: 0
    }),
    style({
        transform: 'translateY(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.SlideOutDown], animate('250ms ease-out', keyframes([
    style({
        transform: 'translateY(0)',
        offset: 0
    }),
    style({
        transform: 'translateY(100%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeInLeft], animate('250ms ease-out', keyframes([
    style({
        opacity: 0.5,
        transform: 'translateX(-30%)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateY(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeOutLeft], animate('250ms ease-out', keyframes([
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
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeInRight], animate('250ms ease-out', keyframes([
    style({
        opacity: 0.5,
        transform: 'translateX(100%)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateX(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeOutRight], animate('250ms ease-out', keyframes([
    style({
        opacity: 1,
        transform: 'translateX(0)',
        offset: 0
    }),
    style({
        opacity: 0.5,
        transform: 'translateX(100%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeInUp], animate('250ms ease-out', keyframes([
    style({
        opacity: 0.5,
        transform: 'translateY(100%)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateY(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeOutUp], animate('250ms ease-out', keyframes([
    style({
        opacity: 1,
        transform: 'translateY(0)',
        offset: 0
    }),
    style({
        opacity: 0.5,
        transform: 'translateY(-100%)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeInDown], animate('250ms ease-out', keyframes([
    style({
        opacity: 0.5,
        transform: 'translateY(-100%)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateY(0)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.FadeOutDown], animate('250ms ease-out', keyframes([
    style({
        opacity: 1,
        transform: 'translateY(0)',
        offset: 0
    }),
    style({
        opacity: 0.5,
        transform: 'translateY(100%)',
        offset: 1
    })
])))];