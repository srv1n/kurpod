type UseIntersectionObserverOptions = {
    root?: Element | Document | null;
    isEnabled?: boolean;
    rootMargin?: string;
    threshold?: number | number[];
    freezeOnceVisible?: boolean;
    onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
    initialIsIntersecting?: boolean;
};
type IntersectionReturn = [
    (node?: Element | null) => void,
    boolean,
    IntersectionObserverEntry | undefined
] & {
    ref: (node?: Element | null) => void;
    isIntersecting: boolean;
    entry?: IntersectionObserverEntry;
};
declare function useIntersectionObserver({ threshold, root, rootMargin, isEnabled, freezeOnceVisible, initialIsIntersecting, onChange, }?: UseIntersectionObserverOptions): IntersectionReturn;

export { useIntersectionObserver };
