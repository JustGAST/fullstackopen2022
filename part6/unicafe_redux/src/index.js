import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';

import App from './App';
import statisticsReducer from './reducers/statisticsReducer';

const store = createStore(statisticsReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App store={store} />);
}

renderApp()
store.subscribe(renderApp)
