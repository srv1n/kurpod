import { Transition, Target, TargetAndTransition } from 'framer-motion';

type WithMotionState<P> = Partial<Record<"enter" | "exit", P>>;
type TransitionConfig = WithMotionState<Transition>;
type TransitionEndConfig = WithMotionState<Target>;
type TransitionProperties = {
    /**
     * Custom `transition` definition for `enter` and `exit`
     */
    transition?: TransitionConfig;
    /**
     * Custom `transitionEnd` definition for `enter` and `exit`
     */
    transitionEnd?: TransitionEndConfig;
};
type TargetResolver<P = {}> = (props: P & TransitionProperties) => TargetAndTransition;
type Variant<P = {}> = TargetAndTransition | TargetResolver<P>;
type Variants<P = {}> = Record<string, {
    enter: Variant<P>;
    exit: Variant<P>;
    initial?: Variant<P>;
}>;
declare const TRANSITION_EASINGS: {
    readonly ease: readonly [0.36, 0.66, 0.4, 1];
    readonly easeIn: readonly [0.4, 0, 1, 1];
    readonly easeOut: readonly [0, 0, 0.2, 1];
    readonly easeInOut: readonly [0.4, 0, 0.2, 1];
    readonly spring: readonly [0.155, 1.105, 0.295, 1.12];
    readonly springOut: readonly [0.57, -0.15, 0.62, 0.07];
    readonly softSpring: readonly [0.16, 1.11, 0.3, 1.02];
};
declare const TRANSITION_DEFAULTS: {
    readonly enter: {
        readonly duration: 0.2;
        readonly ease: readonly [0, 0, 0.2, 1];
    };
    readonly exit: {
        readonly duration: 0.1;
        readonly ease: readonly [0.4, 0, 1, 1];
    };
};
declare const TRANSITION_VARIANTS: Variants;

export { TRANSITION_DEFAULTS, TRANSITION_EASINGS, TRANSITION_VARIANTS, TransitionConfig, TransitionEndConfig, TransitionProperties, Variants };
