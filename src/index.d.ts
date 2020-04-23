type EventHandler<E> = (event: E) => void;

export type AsyncEvent<T> = EventHandler<T> & PromiseLike<T>;

export interface Options {
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
 * @param options The options of async event, see Options interface.
 */
export declare function createAsyncEvent<E = any>(options?: Options): AsyncEvent<T>

/**
 * Return an (EventDispatch & PromiseLike) object.
 * @param options The options of async event, see Options interface.
 * @param deps Will only return new object when one of the deps has changed.
 */
export declare function useAsyncEvent<E = any>(
    options: Options,
    deps?: ReadonlyArray<any>
): AsyncEvent<T>

/**
 * Return an (EventDispatch & PromiseLike) object.
 * @param deps Will only return new object when one of the deps has changed.
 */
export declare function useAsyncEvent<E = any>(
    deps?: ReadonlyArray<any>
): AsyncEvent<T>

export default useAsyncEvent;
