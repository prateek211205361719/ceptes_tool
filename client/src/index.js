
import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { loadingBarMiddleware } from 'react-redux-loading-bar'
const store = createStore(reducers,applyMiddleware(loadingBarMiddleware(), reduxThunk));
ReactDom.render(
 <Provider store={store}>
   <App /> 
</Provider>,
 document.getElementById("root"));