import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton,
} from '@ionic/react';
import {
  trophyOutline,
  locationOutline,
  personOutline,
  scaleOutline,
  resizeOutline,
  medalOutline,
  calendarOutline,
  logoInstagram,
  logoFacebook,
  checkmarkCircle,
  closeCircle,
} from 'ionicons/icons';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePeleadoresStore } from '@/store/peleadoresStore';
import './PeleadorDetalle.css';

const PeleadorDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPeleadorById, fetchPeleadores } = usePeleadoresStore();

  useEffect(() => {
    fetchPeleadores();
  }, [fetchPeleadores]);

  const peleador = getPeleadorById(id);

  if (!peleador) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/peleadores" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="empty-state">
            <p>Peleador no encontrado</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const winRate = ((peleador.record.ganados / peleador.record.combates) * 100).toFixed(1);
  const koRate = ((peleador.record.kos / peleador.record.combates) * 100).toFixed(1);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/peleadores" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Header con foto */}
        <div className="peleador-header">
          <div className="peleador-photo">
            <img src={peleador.fotoUrl} alt={peleador.nombre} />
          </div>
          <div className="peleador-info">
            <h1>{peleador.nombre}</h1>
            {peleador.alias && <h2>"{peleador.alias}"</h2>}
            <div className="badges-row">
              <IonBadge color="danger">Clase {peleador.clase}</IonBadge>
              <IonBadge color={peleador.disponible ? 'success' : 'medium'}>
                <IonIcon icon={peleador.disponible ? checkmarkCircle : closeCircle} />
                {' '}{peleador.disponible ? 'Disponible' : 'No disponible'}
              </IonBadge>
            </div>
          </div>
        </div>

        {/* Puntuación Elo destacada */}
        <IonCard className="elo-card">
          <IonCardContent>
            <div className="elo-display">
              <IonIcon icon={trophyOutline} color="warning" />
              <div>
                <h3>{peleador.puntuacionElo}</h3>
                <p>Puntuación Elo</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Información básica */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Información</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <div className="info-item">
                    <IonIcon icon={personOutline} />
                    <div>
                      <p className="label">Edad</p>
                      <p className="value">{peleador.edad} años</p>
                    </div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="info-item">
                    <IonIcon icon={scaleOutline} />
                    <div>
                      <p className="label">Peso</p>
                      <p className="value">{peleador.peso} kg</p>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div className="info-item">
                    <IonIcon icon={resizeOutline} />
                    <div>
                      <p className="label">Altura</p>
                      <p className="value">{peleador.altura} cm</p>
                    </div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="info-item">
                    <IonIcon icon={locationOutline} />
                    <div>
                      <p className="label">Ciudad</p>
                      <p className="value">{peleador.ciudad}</p>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>

            <div className="club-info">
              <IonIcon icon={medalOutline} />
              <div>
                <p className="label">Club</p>
                <p className="value">{peleador.club}</p>
              </div>
            </div>

            {peleador.ultimoCombate && (
              <div className="club-info">
                <IonIcon icon={calendarOutline} />
                <div>
                  <p className="label">Último combate</p>
                  <p className="value">
                    {new Date(peleador.ultimoCombate).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            )}
          </IonCardContent>
        </IonCard>

        {/* Récord */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Récord Profesional</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="record-display">
              <div className="record-stat">
                <h2>{peleador.record.combates}</h2>
                <p>Combates</p>
              </div>
              <div className="record-stat success">
                <h2>{peleador.record.ganados}</h2>
                <p>Victorias</p>
              </div>
              <div className="record-stat danger">
                <h2>{peleador.record.perdidos}</h2>
                <p>Derrotas</p>
              </div>
              <div className="record-stat warning">
                <h2>{peleador.record.kos}</h2>
                <p>KO's</p>
              </div>
            </div>

            <div className="percentages">
              <IonChip color="success">
                <IonLabel>{winRate}% victorias</IonLabel>
              </IonChip>
              <IonChip color="warning">
                <IonLabel>{koRate}% KO's</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Redes sociales */}
        {peleador.redesSociales.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Redes Sociales</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="social-links">
                {peleador.redesSociales.map((red, index) => (
                  <IonButton key={index} fill="outline" size="small">
                    <IonIcon
                      slot="start"
                      icon={red.includes('instagram') ? logoInstagram : logoFacebook}
                    />
                    {red}
                  </IonButton>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PeleadorDetalle;












