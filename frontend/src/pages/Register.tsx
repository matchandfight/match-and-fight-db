import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonButtons,
  IonToast,
  IonLoading,
  IonIcon,
} from '@ionic/react';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  personAddOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Usuario } from '@/data/mockData';
import './Login.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    rol: 'ATLETA' as Usuario['rol'],
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const register = useAuthStore((state) => state.register);
  const history = useHistory();

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.nombre) {
      setToastMessage('Por favor completa todos los campos');
      setShowToast(true);
      return;
    }

    setLoading(true);
    const success = await register(formData.email, formData.password, formData.nombre, formData.rol);
    setLoading(false);

    if (success) {
      setToastMessage('¡Registro exitoso!');
      setShowToast(true);
      setTimeout(() => {
        history.push('/dashboard');
      }, 500);
    } else {
      setToastMessage('Error al registrarse');
      setShowToast(true);
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
            <h1>Crear Cuenta</h1>
            <p className="hero-subtitle">Únete a la comunidad</p>
          </div>

          {/* Formulario */}
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div className="input-group">
              <IonIcon icon={personOutline} className="input-icon" />
              <IonInput
                type="text"
                value={formData.nombre}
                placeholder="Nombre completo"
                onIonInput={(e) =>
                  setFormData({ ...formData, nombre: e.detail.value! })
                }
                className="login-input"
              />
            </div>

            <div className="input-group">
              <IonIcon icon={mailOutline} className="input-icon" />
              <IonInput
                type="email"
                value={formData.email}
                placeholder="Correo electrónico"
                onIonInput={(e) =>
                  setFormData({ ...formData, email: e.detail.value! })
                }
                className="login-input"
              />
            </div>

            <div className="input-group">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <IonInput
                type="password"
                value={formData.password}
                placeholder="Contraseña"
                onIonInput={(e) =>
                  setFormData({ ...formData, password: e.detail.value! })
                }
                className="login-input"
              />
            </div>

            <div className="input-group">
              <IonIcon icon={shieldCheckmarkOutline} className="input-icon" />
              <IonSelect
                value={formData.rol}
                placeholder="Selecciona tu rol"
                onIonChange={(e) =>
                  setFormData({ ...formData, rol: e.detail.value! })
                }
                className="login-input"
                interface="action-sheet"
              >
                <IonSelectOption value="ATLETA">Peleador</IonSelectOption>
                <IonSelectOption value="MANAGER">Manager</IonSelectOption>
                <IonSelectOption value="PROMOTOR">Promotor</IonSelectOption>
              </IonSelect>
            </div>

            <IonButton expand="block" type="submit" className="login-button">
              <IonIcon icon={personAddOutline} slot="start" />
              Crear Cuenta
            </IonButton>
          </form>

          {/* Link a login */}
          <div className="register-link">
            <span>¿Ya tienes cuenta?</span>
            <a href="/login">Inicia sesión</a>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Creando cuenta..." />
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

export default Register;

