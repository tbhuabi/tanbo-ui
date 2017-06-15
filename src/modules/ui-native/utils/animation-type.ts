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
    FadeOutDown,
    ZoomInLeft,
    ZoomOutLeft,
    ZoomInRight,
    ZoomOutRight,
    ZoomInUp,
    ZoomOutUp,
    ZoomInDown,
    ZoomOutDown
}

export interface PageTransition {
    activate: AnimationType;
    reactivate: AnimationType;
    destroy: AnimationType;
    toStack: AnimationType;
}
