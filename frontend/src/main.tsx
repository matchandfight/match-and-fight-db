import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Error handler global para prevenir crashes
window.addEventListener('error', (event) => {
  console.error('Error global capturado:', event.error);
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejection no manejada:', event.reason);
  event.preventDefault();
});

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables - Orden corregido para Chronelia */
import './theme/mobile.css';
import './theme/global.css'; /* Global debe ir al final para sobreescribir */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
