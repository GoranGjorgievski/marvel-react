import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import {configureStore} from './store/configureStore';
import {
  saveState,
  loadState
} from './utils/localStorage';

const persistedState = loadState();


const store = configureStore(persistedState);

store.subscribe(() => {
  saveState({
    bookmarks: [...store.getState().bookmarks],
    //this, below, would be uncecessary with combineReducers
    heroes: [], 
    isFetching: true,
    currentPage: 0,
    search: '',
    total: 0,
  });
});

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
document.getElementById('root'));
registerServiceWorker();
