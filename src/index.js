import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RedirectProvider from './RedirectProvider';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import Router from './Router';

const store = createStore(rootReducer, { atoms: { modal: false } }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RedirectProvider />
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();