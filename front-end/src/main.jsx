import { initializeApp } from 'firebase/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDA5K4mkZ5KmmupqapnnTPfYAebWuHTcJ8',
  authDomain: 'linkedin-full-stack-react.firebaseapp.com',
  projectId: 'linkedin-full-stack-react',
  storageBucket: 'linkedin-full-stack-react.firebasestorage.app',
  messagingSenderId: '37441609158',
  appId: '1:37441609158:web:7f8ed3d7df09104bf326c7',
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
