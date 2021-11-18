import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { BrowserRouter, Router, } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Fragment>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </Fragment>
  </Router>,
  document.getElementById('root')
);