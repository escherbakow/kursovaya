import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import reportWebVitals from './reportWebVitals';
import ProductStore from './store/ProductStore';
import 'bootstrap/dist/css/bootstrap.min.css';

// Создаём контекст
export const Context = createContext(null);


// Создаём корень через React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        products: new ProductStore()
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);

// Если нужно измерять производительность
reportWebVitals();