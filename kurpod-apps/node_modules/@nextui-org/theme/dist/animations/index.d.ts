declare const animations: {
    animation: {
        "drip-expand": string;
        "spinner-ease-spin": string;
        "spinner-linear-spin": string;
        "appearance-in": string;
        "appearance-out": string;
        "indeterminate-bar": string;
    };
    keyframes: {
        shimmer: {
            "100%": {
                transform: string;
            };
        };
        "spinner-spin": {
            "0%": {
                transform: string;
            };
            "100%": {
                transform: string;
            };
        };
        "drip-expand": {
            "0%": {
                opacity: string;
                transform: string;
            };
            "100%": {
                opacity: string;
                transform: string;
            };
        };
        "appearance-in": {
            "0%": {
                opacity: string;
                transform: string;
            };
            "60%": {
                opacity: string;
                backfaceVisibility: string;
                webkitFontSmoothing: string;
                transform: string;
            };
            "100%": {
                opacity: string;
                transform: string;
            };
        };
        "appearance-out": {
            "0%": {
                opacity: string;
                transform: string;
            };
            "100%": {
                opacity: string;
                transform: string;
            };
        };
        "indeterminate-bar": {
            "0%": {
                transform: string;
            };
            "100%": {
                transform: string;
            };
        };
    };
};

export { animations };
