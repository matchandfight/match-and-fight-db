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
  IonSelect,
  IonSelectOption,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { authService } from '../../services/api';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    nombre_completo: '',
    telefono: '',
    rol: 'atleta',
  });

  const history = useHistory();
  const [present] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.password_confirm) {
      present({
        message: 'Las contraseñas no coinciden',
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    if (formData.password.length < 6) {
      present({
        message: 'La contraseña debe tener al menos 6 caracteres',
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    await presentLoading({ message: 'Creando cuenta...' });

    try {
      const { password_confirm, ...userData } = formData;
      await authService.register(userData);
      await dismissLoading();

      present({
        message: '¡Cuenta creada exitosamente!',
        duration: 2000,
        color: 'success',
      });

      history.push('/home');
    } catch (error: any) {
      await dismissLoading();
      present({
        message: error.response?.data?.message || 'Error al crear cuenta',
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
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <IonCard>
            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="stacked">Nombre Completo *</IonLabel>
                  <IonInput
                    value={formData.nombre_completo}
                    onIonChange={(e) =>
                      setFormData({ ...formData, nombre_completo: e.detail.value! })
                    }
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Email *</IonLabel>
                  <IonInput
                    type="email"
                    value={formData.email}
                    onIonChange={(e) => setFormData({ ...formData, email: e.detail.value! })}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Teléfono</IonLabel>
                  <IonInput
                    type="tel"
                    value={formData.telefono}
                    onIonChange={(e) => setFormData({ ...formData, telefono: e.detail.value! })}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Tipo de Cuenta *</IonLabel>
                  <IonSelect
                    value={formData.rol}
                    onIonChange={(e) => setFormData({ ...formData, rol: e.detail.value! })}
                  >
                    <IonSelectOption value="atleta">Atleta/Peleador</IonSelectOption>
                    <IonSelectOption value="manager">Manager</IonSelectOption>
                    <IonSelectOption value="promotor">Promotor</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Contraseña *</IonLabel>
                  <IonInput
                    type="password"
                    value={formData.password}
                    onIonChange={(e) => setFormData({ ...formData, password: e.detail.value! })}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Confirmar Contraseña *</IonLabel>
                  <IonInput
                    type="password"
                    value={formData.password_confirm}
                    onIonChange={(e) =>
                      setFormData({ ...formData, password_confirm: e.detail.value! })
                    }
                    required
                  />
                </IonItem>

                <div className="ion-padding-top">
                  <IonButton expand="block" type="submit" color="primary">
                    Crear Cuenta
                  </IonButton>
                </div>
              </form>

              <div className="ion-text-center ion-padding-top">
                <IonText color="medium">
                  <p>
                    ¿Ya tienes cuenta?{' '}
                    <a href="/login" style={{ color: 'var(--ion-color-primary)' }}>
                      Inicia sesión
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

export default Register;

