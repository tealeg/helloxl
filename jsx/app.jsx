import React from 'react';
import { render } from 'react-dom';
import { XLApp } from './xl';


function run() {
    render(<XLApp />, document.getElementById('app'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

