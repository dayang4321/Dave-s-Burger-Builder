import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import burgerBuilderReducer from './store/reducers/BurgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth'

import {watchAuth, watchOrder,watchBurgerBuilder} from './store/sagas/index' 


const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,  
});

const SagaMiddleWare = createSagaMiddleWare();

// const logger = store => {
//   return next => {
//     return action => {
//       console.log('[Middleware Dispatching]', action);
//       const result = next(action);
//       console.log('[Middleware Next State', store.getState());
//       return result
//     }
//   }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(rootReducer, composeEnhancers(applyMiddleware( thunk, SagaMiddleWare)));

SagaMiddleWare.run(watchAuth);
SagaMiddleWare.run(watchOrder);
SagaMiddleWare.run(watchBurgerBuilder);

const app = (
  <Provider store={myStore}> <BrowserRouter>
  <App/>
</BrowserRouter></Provider>
 
)

ReactDOM.render(
      app ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
