type EventHandler<E> = (event: E) => void;

/**
 * Return an (EventDispatch & PromiseLike) object.
 * @param deps Will only return new object when one of the deps has changed.
 */
declare function useAsyncEvent<E = any>(
    deps?: ReadonlyArray<any>
): EventHandler<E> & PromiseLike<E>

export default useAsyncEvent;