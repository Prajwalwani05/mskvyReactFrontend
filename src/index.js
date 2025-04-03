import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './components/context/DataProvider';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './components/context/SearchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider>
      <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SearchProvider>
    </DataProvider>
  </React.StrictMode>
);

