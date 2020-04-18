type EventHandler<E> = (event: E) => void;

interface Options {
    /**
     * Queue size, defaults 0, that means any events will be dropped if no consumer.
     */
    queueSize?: number;
    /**
     * The behavior while queue overflowed, defaults 'tail-drop'.
     */
    overflow?: 'tail-drop' | 'drop'
    /**
     * Debounce delay (milliseconds).
     */
    debounce?: number;
}

/**
 * Return an (EventDispatch & PromiseLike) object.
 * @param deps Will only return new object when one of the deps has changed.
 */
declare function useAsyncEvent<E = any>(
    options: Options,
    deps?: ReadonlyArray<any>
): EventHandler<E> & PromiseLike<E>

/**
 * Return an (EventDispatch & PromiseLike) object.
 * @param deps Will only return new object when one of the deps has changed.
 */
declare function useAsyncEvent<E = any>(
    deps?: ReadonlyArray<any>
): EventHandler<E> & PromiseLike<E>

export default useAsyncEvent;