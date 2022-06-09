import React from 'react';
import './index.css';
import App from './App';
import { FirebaseContextProvider } from './context/firebaseContext'
import * as ReactDOMClient from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store';
import Profile from './pages/Profile';
const root = document.getElementById('root');

const Сontainer = ReactDOMClient.createRoot(root);

Сontainer.render(
  <ReduxProvider store = {store}>
    <FirebaseContextProvider>
      <App />
    </FirebaseContextProvider>
  </ReduxProvider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
