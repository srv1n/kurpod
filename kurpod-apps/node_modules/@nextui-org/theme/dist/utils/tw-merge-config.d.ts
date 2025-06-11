declare const COMMON_UNITS: string[];
declare const twMergeConfig: {
    theme: {
        opacity: string[];
        spacing: string[];
        borderWidth: string[];
        borderRadius: string[];
    };
    classGroups: {
        shadow: {
            shadow: string[];
        }[];
        "font-size": {
            text: string[];
        }[];
        "bg-image": string[];
    };
};

export { COMMON_UNITS, twMergeConfig };
