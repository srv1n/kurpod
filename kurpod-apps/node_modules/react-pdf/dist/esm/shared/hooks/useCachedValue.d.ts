export default function useCachedValue<T>(getter: () => T): () => T;
