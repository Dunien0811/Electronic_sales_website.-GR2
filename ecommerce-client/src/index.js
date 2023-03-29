import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import appReducers from './redux/reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ToastContainer } from 'react-toastify';
import 'nprogress/nprogress.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const store = createStore(appReducers, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={1700}
      pauseOnHover={false}
      pauseOnVisibilityChange={false}
    />
  </Provider>,
  document.getElementById('root'));
