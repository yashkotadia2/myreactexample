import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';

import { store, persistor } from './theme/redux/store/store'
import App from './App';

import "./theme/style_sheet/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>     
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </PersistGate> 
    </Provider>
  </React.StrictMode>
);

