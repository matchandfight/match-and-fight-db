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
  IonButton,
  IonAvatar,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { authService } from '../../services/api';

const Perfil: React.FC = () => {
  const history = useHistory();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  if (!user) {
    history.push('/login');
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <IonAvatar style={{ width: '120px', height: '120px', margin: '0 auto' }}>
            <img src={user.foto_perfil || 'https://via.placeholder.com/150'} alt="Foto perfil" />
          </IonAvatar>
          <h1>{user.nombre_completo}</h1>
          <p>{user.email}</p>
        </div>

        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel>
                <h3>Tipo de Cuenta</h3>
                <p>{user.rol}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>Email</h3>
                <p>{user.email}</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <div className="ion-padding">
          <IonButton expand="block" color="danger" onClick={handleLogout}>
            Cerrar Sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;

