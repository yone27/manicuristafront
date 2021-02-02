import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { DataLayer } from "./data/DataLayer";
import reducer, { initialState } from "./data/reducer";
import { SoundLayer } from "./data/SoundLayer";
import soundReducer, { soundInitialState } from "./data/soundReducer";

ReactDOM.render(
    <React.StrictMode>
        <DataLayer initialState={initialState} reducer={reducer}>
            <SoundLayer initialState={soundInitialState} reducer={soundReducer}>
                <App />
            </SoundLayer>
        </DataLayer>
    </React.StrictMode>,
    document.getElementById('root')
);
