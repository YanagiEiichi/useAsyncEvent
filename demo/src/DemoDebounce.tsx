import React from 'react';
import useAsyncGenerator from 'use-async-generator';
import useAsyncEvent from 'use-async-event';

export default () => {
    const input = useAsyncEvent({
        debounce: 200,
    });

    const message = useAsyncGenerator(async function* () {
        while (true) {
            let { target } = await input;
            if (target instanceof HTMLInputElement) {
                yield target.value;
            }
        }
    }, [input]);

    return (
        <div>
            <input onInput={input} />
            &nbsp; {message}
        </div>
    );
};