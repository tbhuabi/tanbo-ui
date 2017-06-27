import { style, state, animate, transition, keyframes, AnimationMetadata } from '@angular/animations';

import { AnimationType } from '../../utils/animation-type';

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
    [AnimationType.FadeOutDown]: 'fadeOutDown',
    [AnimationType.ZoomInLeft]: 'zoomInLeft',
    [AnimationType.ZoomOutLeft]: 'zoomOutLeft',
    [AnimationType.ZoomInRight]: 'zoomInRight',
    [AnimationType.ZoomOutRight]: 'zoomOutRight',
    [AnimationType.ZoomInUp]: 'zoomInUp',
    [AnimationType.ZoomOutUp]: 'zoomOutUp',
    [AnimationType.ZoomInDown]: 'zoomInDown',
    [AnimationType.ZoomOutDown]: 'zoomOutDown'
};

export const pageTransitionAnimate: AnimationMetadata[] = [
    state(AnimationTypeBase[AnimationType.SlideOutLeft], style({
    transform: 'translateX(-30%)'
})), state(AnimationTypeBase[AnimationType.SlideOutRight], style({
    transform: 'translateX(30%)'
})), state(AnimationTypeBase[AnimationType.SlideOutUp], style({
    transform: 'translateY(-100%)'
})), state(AnimationTypeBase[AnimationType.SlideOutDown], style({
    transform: 'translateY(100%)'
})), state(AnimationTypeBase[AnimationType.FadeOutLeft], style({
    transform: 'translateX(-30%)',
    opacity: 0.5
})), state(AnimationTypeBase[AnimationType.FadeOutRight], style({
    transform: 'translateX(30%)',
    opacity: 0.5
})), state(AnimationTypeBase[AnimationType.FadeOutUp], style({
    transform: 'translateY(-100%)',
    opacity: 0.5
})), state(AnimationTypeBase[AnimationType.FadeOutDown], style({
    transform: 'translateY(100%)',
    opacity: 0.5
})), state(AnimationTypeBase[AnimationType.ZoomOutLeft], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.ZoomOutRight], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.ZoomOutUp], style({
    display: 'none'
})), state(AnimationTypeBase[AnimationType.ZoomOutDown], style({
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
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomInLeft], animate('300ms', keyframes([
    style({
        opacity: 0,
        transform: 'translateX(-100%) scale(.1)',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        offset: 0
    }),
    style({
        opacity: .6,
        transform: 'translateX(10%) scale(.475)',
        animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        offset: 0.6
    }),
    style({
        opacity: 1,
        transform: 'translateX(0) scale(1)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomOutLeft], animate('250ms ease-out', keyframes([
    style({
        opacity: 1,
        transform: 'translateX(10%) scale(.475)',
        offset: 0.4
    }),
    style({
        opacity: 0,
        transform: 'translateX(-100%) scale(.1)',
        transformOrigin: 'left center',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomInRight], animate('250ms', keyframes([
    style({
        opacity: 0,
        transform: 'translateX(100%) scale(.1)',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        offset: 0
    }),
    style({
        opacity: .6,
        transform: 'translateX(-10%) scale(.475)',
        animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        offset: 0.6
    }),
    style({
        opacity: 1,
        transform: 'translateX(0) scale(1)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomOutRight], animate('250ms ease-out', keyframes([
    style({
        opacity: 1,
        transform: 'translateX(-10%) scale(.475)',
        offset: 0.4
    }),
    style({
        opacity: 0,
        transform: 'translateX(100%) scale(.1)',
        transformOrigin: 'right center',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomInUp], animate('250ms', keyframes([
    style({
        opacity: 0,
        transform: 'translateY(100%) scale(.1)',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateY(-10%) scale(.475)',
        animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        offset: 0.6
    }),
    style({
        transform: 'translateY(0) scale(1)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomOutUp], animate('250ms', keyframes([
    style({
        opacity: 1,
        transform: 'translateY(-10%) scale(.475)',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        offset: 0.4
    }),
    style({
        opacity: 0,
        transform: 'translateY(100%) scale(.1)',
        animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomInDown], animate('250ms', keyframes([
    style({
        opacity: 0,
        transform: 'translateY(-100%) scale(.1)',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        offset: 0
    }),
    style({
        opacity: 1,
        transform: 'translateY(10%) scale(.475)',
        animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        offset: 0.6
    }),
    style({
        transform: 'translateY(0) scale(1)',
        offset: 1
    })
]))), transition('* => ' + AnimationTypeBase[AnimationType.ZoomOutDown], animate('250ms', keyframes([
    style({
        opacity: 1,
        transform: 'translateY(10%) scale(.475)',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        offset: 0.4
    }),
    style({
        opacity: 0,
        transform: 'translateY(-100%) scale(.1)',
        animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        offset: 1
    })
])))];