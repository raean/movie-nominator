import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Typed from 'react-typed';
import {OMDbPortal} from './components/OMDbPortal'

ReactDOM.render(
  <React.StrictMode>
    <OMDbPortal />
  </React.StrictMode>,
  document.getElementById('root')
);

