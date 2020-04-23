import React from 'react';
import DemoButtonClick from './DemoButtonClick';
import DemoQueued from './DemoQueued';
import DemoDebounce from './DemoDebounce';
import DemoNotAHook from './DemoNotAHook';
import './App.css';

export default () => {
    return (
        <div>
            <section>
                <h2>Demo 1. Button Click</h2>
                <div>
                    <DemoButtonClick />
                </div>
            </section>
            <section>
                <h2>Demo 2. Queued Events</h2>
                <div>
                    <DemoQueued />
                </div>
            </section>
            <section>
                <h2>Demo 3. Debounce</h2>
                <div>
                    <DemoDebounce />
                </div>
            </section>
            <section>
                <h2>Demo 4. Not a Hook</h2>
                <div>
                    <DemoNotAHook />
                </div>
            </section>
        </div>
    );
};