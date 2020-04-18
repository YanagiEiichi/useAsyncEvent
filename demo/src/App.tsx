import React from 'react';
import DemoButtonClick from './DemoButtonClick';
import DemoQueued from './DemoQueued';
import DemoDebounce from './DemoDebounce';
import './App.css';

export default () => {
    return (
        <div>
            <section>
                <h2>Demo 1. Button click</h2>
                <div>
                    <DemoButtonClick />
                </div>
            </section>
            <section>
                <h2>Demo 2. Queued events</h2>
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
        </div>
    );
};