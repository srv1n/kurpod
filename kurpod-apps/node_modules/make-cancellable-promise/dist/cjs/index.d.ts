export default function makeCancellablePromise<T>(promise: Promise<T>): {
    promise: Promise<T>;
    cancel(): void;
};
