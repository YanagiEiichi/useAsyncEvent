import { useMemo } from 'react';

function createPromiseObject() {
    var object = {};
    object.promise = new Promise(function (resolve) {
        object.resolve = resolve;
    });
    return object;
}

function useAsyncPromise(deps) {
    // Set default deps.
    if (!deps) deps = [];
    if (!(deps instanceof Array)) throw new TypeError('deps must be an array');

    // Store result in memo.
    return useMemo(function () {
        var waiting = createPromiseObject();
        // As event handler, dispatch event and reset waiting object.
        var result = function (event) {
            // Dispatch events.
            waiting.resolve(event);
            // Call the event.persist if event is a react event object.
            if (event.nativeEvent instanceof Event && typeof event.persist === 'function') event.persist();
            // Reset waiting object.
            waiting = createPromiseObject();
        };
        // As PromiseLike, pass onfulfilled to real promise (omit "onrejected", because it's never reject).
        result.then = function (onfulfilled) {
            waiting.promise.then(onfulfilled);
        };
        return result;
    }, deps);
}

export default useAsyncPromise;
