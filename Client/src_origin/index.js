import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClient from './network/http';
import TokenStorage from './db/token';
import socket from 'socket.io-client';

 // .env에서 읽어옴:  REACT_APP_BASE_URL=http://localhost:8080
const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage()
const httpClient = new HttpClient(baseURL);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenStorage);
const tweetService = new TweetService(httpClient, tokenStorage);

const socketIO = socket(baseURL)
// 연결 실패시 에러 찍어줌
socketIO.on('connect_error', (error) => {
  console.log('소켓 에러!', error)
})
socketIO.on('dwitter', (msg) => console.log(msg));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
