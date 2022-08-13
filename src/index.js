import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// style
import "./scss/index.scss";

// store
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);