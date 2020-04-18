import React, { MouseEvent } from 'react';
import useAsyncGenerator from 'use-async-generator';
import useAsyncEvent from 'use-async-event';

export default () => {
    const buttonClick = useAsyncEvent<MouseEvent<HTMLButtonElement>>();

    const message = useAsyncGenerator(async function* () {
        yield 'Come on, click the button please.';
        await buttonClick;
        yield 'OK, try to click the button again?';
        await buttonClick;
        for (let i = 3; i > 0; i--) {
            yield `:joy:, click ${i} time${i > 1 ? 's' : ''} the button...`;
            await buttonClick;
        }
        yield 'You win.';
        while (true) {
            let event = await buttonClick;
            yield `Coords is {${event.clientX}, ${event.clientY}}`;
        }
    }, [buttonClick]);

    return (
        <div>
            <button onClick={buttonClick}>I'm a button</button>
            &nbsp; {message}
        </div>
    );
};