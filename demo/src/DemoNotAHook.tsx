import React from 'react';
import useAsyncGenerator from 'use-async-generator';
import { createAsyncEvent } from 'use-async-event';

export default () => {
    const content = useAsyncGenerator(async function* () {
        let click = createAsyncEvent();
        let button = <button onClick={click}>emit</button>;
        yield button;
        let message = '';
        while (true) {
            await click;
            message += ' biu~';
            yield <>{button} {message}</>
        }
    }, []);

    return (
        <div>
            {content}
        </div>
    );
};