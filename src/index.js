import { useMemo } from 'react';

function createWaiting() {
    var object = {
        hasConsumer: false,
        then: function (onfulfilled) {
            object.hasConsumer = true;
            return promise.then(onfulfilled);
        }
    };
    var promise = new Promise(function (resolve) {
        object.resolve = resolve;
    });
    return object;
}

// Implements debounce.
function wrapDebounce(func, ms) {
    var timer;
    return function (event) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            func(event);
        }, ms);
    }
};

// Call the event.persist if event is a react event object.
function wrapReactEventPersist(func) {
    return function (event) {
        if (event.nativeEvent instanceof Event && typeof event.persist === 'function') event.persist();
        func(event);
    }
}

export function createAsyncEvent(options) {
    if (options === void 0) options = {};
    // Type assertion.
    if (!(options instanceof Object)) {
        throw new TypeError('`options` must be an object');
    }

    var waiting = createWaiting();
    var queue = [];
    // Fix options value.
    var size = Number(options.queueSize) || 0;
    var overflow = String(options.overflow);
    if (overflow !== 'drop' && overflow !== 'tail-drop') {
        overflow = 'tail-drop';
    }
    var debounce = Number(options.debounce);
    // As event handler, dispatch event and reset waiting object.
    var result = function (event) {
        if (waiting.hasConsumer) {
            // Dispatch event and reset waiting object.
            waiting.resolve(event);
            waiting = createWaiting();
        } else {
            // Add event to queue if queue is not fulled.
            // Note: no limit set if size is negative.
            if (size < 0 || queue.length < size) {
                queue.push(event);
            } else {
                // Queue has fulled, push and shift if policy is "tail-drop",
                // nothing to do if policy is "drop"
                if (overflow === 'tail-drop') {
                    queue.push(event);
                    queue.shift();
                }
            }
        }
    };

    // Wraps
    if (debounce > 0) result = wrapDebounce(result, debounce);
    result = wrapReactEventPersist(result);

    // As PromiseLike, pass onfulfilled to real promise (omit "onrejected", because it's never reject).
    result.then = function (onfulfilled) {
        // Consume from the queue first.
        if (queue.length) {
            // Keep forcedly asynchronous.
            return Promise.resolve(queue.shift()).then(onfulfilled);
        } else {
            waiting.then(onfulfilled);
        }
    };
    return result;
}

export function useAsyncEvent(options, deps) {
    // Overload args
    switch (true) {
        // Case 0: no args
        case options === void 0 && deps === void 0:
            options = {};
            deps = [];
            break;
        // Case 1: only deps
        case options instanceof Array && deps === void 0:
            deps = options;
            options = {};
            break;
        // Case 2: only options
        case (options !== void 0 && deps === void 0):
            deps = [];
            break;
        // Case 3: both set
        case (options !== void 0 && deps !== void 0):
            break;
    }

    // Type assertion.
    if (!(deps instanceof Array)) {
        throw new TypeError('`deps` must be an array');
    }

    // Store result in memo.
    return useMemo(function () {
        return createAsyncEvent(options);
    }, deps);
}

export default useAsyncEvent;
