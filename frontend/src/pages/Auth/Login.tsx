import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonBackButton,
  IonButtons,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { authService } from '../../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [present] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      present({
        message: 'Por favor completa todos los campos',
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    await presentLoading({ message: 'Iniciando sesión...' });

    try {
      await authService.login(email, password);
      await dismissLoading();
      
      present({
        message: '¡Bienvenido!',
        duration: 2000,
        color: 'success',
      });

      history.push('/home');
    } catch (error: any) {
      await dismissLoading();
      present({
        message: error.response?.data?.message || 'Error al iniciar sesión',
        duration: 3000,
        color: 'danger',
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <IonCard>
            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                  />
                </IonItem>

                <div className="ion-padding-top">
                  <IonButton expand="block" type="submit" color="primary">
                    Iniciar Sesión
                  </IonButton>
                </div>
              </form>

              <div className="ion-text-center ion-padding-top">
                <IonText color="medium">
                  <p>
                    ¿No tienes cuenta?{' '}
                    <a href="/register" style={{ color: 'var(--ion-color-primary)' }}>
                      Regístrate aquí
                    </a>
                  </p>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

