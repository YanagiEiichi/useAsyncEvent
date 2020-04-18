import React from 'react';
import useAsyncGenerator from 'use-async-generator';
import useAsyncEvent from 'use-async-event';

const sleep = (ms: number) => new Promise(f => setTimeout(f, ms));

export default () => {
    const input = useAsyncEvent({
        queueSize: 1000,
        overflow: 'tail-drop'
    });

    const message = useAsyncGenerator(async function* () {
        while (true) {
            yield await input;
            await sleep(300);
        }
    }, [input]);

    return (
        <div>
            <input onInput={(e: any) => input(e.target.value)} />
            &nbsp; {message}
        </div>
    );
};