import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonToast,
  IonLoading,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { 
  mailOutline, 
  lockClosedOutline,
  logInOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setToastMessage('Por favor completa todos los campos');
      setShowToast(true);
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      setToastMessage('¡Inicio de sesión exitoso!');
      setShowToast(true);
      setTimeout(() => {
        history.push('/dashboard');
      }, 500);
    } else {
      setToastMessage('Credenciales incorrectas. Usa contraseña: test123');
      setShowToast(true);
    }
  };

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('test123');
    setTimeout(() => {
      handleQuickLogin(userEmail);
    }, 300);
  };

  const handleQuickLogin = async (userEmail: string) => {
    setLoading(true);
    const success = await login(userEmail, 'test123');
    setLoading(false);

    if (success) {
      setToastMessage('¡Inicio de sesión exitoso!');
      setShowToast(true);
      setTimeout(() => {
        history.push('/dashboard');
      }, 500);
    }
  };

  return (
    <IonPage>
      <IonHeader className="login-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="login-content">
        <div className="login-container">
          {/* Logo/Header */}
          <div className="login-hero">
            <div className="login-logo">
              <span className="logo-icon">🥊</span>
            </div>
            <h1>Bienvenido</h1>
            <p className="hero-subtitle">Inicia sesión para continuar</p>
          </div>

          {/* Formulario */}
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="input-group">
              <IonIcon icon={mailOutline} className="input-icon" />
              <IonInput
                type="email"
                value={email}
                placeholder="Correo electrónico"
                onIonInput={(e) => setEmail(e.detail.value!)}
                className="login-input"
              />
            </div>

            <div className="input-group">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <IonInput
                type="password"
                value={password}
                placeholder="Contraseña"
                onIonInput={(e) => setPassword(e.detail.value!)}
                className="login-input"
              />
            </div>

            <IonButton expand="block" type="submit" className="login-button">
              <IonIcon icon={logInOutline} slot="start" />
              Iniciar Sesión
            </IonButton>
          </form>

          {/* Acceso rápido de prueba - Simplificado */}
          <div className="demo-section">
            <p className="demo-label">Acceso rápido de prueba:</p>
            <div className="demo-buttons">
              <button 
                type="button"
                className="demo-btn demo-btn-peleador"
                onClick={() => quickLogin('carlos.atleta@test.com')}
              >
                Peleador
              </button>
              <button 
                type="button"
                className="demo-btn demo-btn-admin"
                onClick={() => quickLogin('admin@test.com')}
              >
                Admin
              </button>
            </div>
            <p className="demo-hint">Contraseña: <strong>test123</strong></p>
          </div>

          {/* Link a registro */}
          <div className="register-link">
            <span>¿No tienes cuenta?</span>
            <a href="/register">Regístrate</a>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Iniciando sesión..." />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
