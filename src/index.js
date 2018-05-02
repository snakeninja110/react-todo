import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
// import App from './App'; // 事件总线
import App from './redux/containers/App'; // redux
import reducer from './redux/reducers/index';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, compose(window.devToolsExtension ? window.devToolsExtension() : () => {}));
// const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
