declare const scaleInOut: {
    enter: {
        scale: string;
        y: string;
        opacity: number;
        willChange: string;
        transition: {
            scale: {
                duration: number;
                ease: readonly [0.36, 0.66, 0.4, 1];
            };
            opacity: {
                duration: number;
                ease: readonly [0.36, 0.66, 0.4, 1];
            };
            y: {
                type: string;
                bounce: number;
                duration: number;
            };
        };
    };
    exit: {
        scale: string;
        y: string;
        opacity: number;
        willChange: string;
        transition: {
            duration: number;
            ease: readonly [0.36, 0.66, 0.4, 1];
        };
    };
};

export { scaleInOut };
