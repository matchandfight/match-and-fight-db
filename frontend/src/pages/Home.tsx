import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { trophyOutline, peopleOutline, calendarOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Match and Fight</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="gradient-bg">
        <div className="home-container">
          <div className="hero-section">
            <h1>Match and Fight</h1>
            <p className="subtitle">
              La plataforma definitiva de matchmaking y combates para deportes de contacto
            </p>
          </div>

          <div className="cards-container">
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={trophyOutline} size="large" color="primary" />
                <IonCardTitle>Rankings Elo</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Sistema de puntuación objetivo basado en resultados reales
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonIcon icon={peopleOutline} size="large" color="success" />
                <IonCardTitle>Matchmaking</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Conecta peleadores, managers y promotores de forma profesional
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonIcon icon={calendarOutline} size="large" color="warning" />
                <IonCardTitle>Eventos</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Gestiona tu disponibilidad y recibe ofertas de combate
              </IonCardContent>
            </IonCard>
          </div>

          <div className="buttons-container">
            <IonButton expand="block" routerLink="/login">
              Iniciar Sesión
            </IonButton>
            <IonButton expand="block" fill="outline" routerLink="/register">
              Registrarse
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
