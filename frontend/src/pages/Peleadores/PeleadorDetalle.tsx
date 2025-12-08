import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonBackButton,
  IonButtons,
  IonAvatar,
  useIonLoading,
} from '@ionic/react';
import { peleadorService, rankingService } from '../../services/api';

const PeleadorDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [peleador, setPeleador] = useState<any>(null);
  const [historial, setHistorial] = useState<any[]>([]);
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    loadPeleador();
    loadHistorial();
  }, [id]);

  const loadPeleador = async () => {
    await presentLoading({ message: 'Cargando...' });
    try {
      const data = await peleadorService.getById(id);
      setPeleador(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await dismissLoading();
    }
  };

  const loadHistorial = async () => {
    try {
      const data = await rankingService.getHistorial(id);
      setHistorial(data.data || []);
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  };

  if (!peleador) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/peleadores" />
          </IonButtons>
          <IonTitle>{peleador.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Foto y datos básicos */}
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <IonAvatar style={{ width: '150px', height: '150px', margin: '0 auto' }}>
            <img src={peleador.foto_url || 'https://via.placeholder.com/150'} alt={peleador.nombre} />
          </IonAvatar>
          <h1>{peleador.nombre}</h1>
          {peleador.alias && <h3>"{peleador.alias}"</h3>}
          <IonBadge color="warning" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
            ELO: {Math.round(peleador.puntuacion_elo)}
          </IonBadge>
        </div>

        {/* Información general */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Información General</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Clase</IonLabel>
              <IonBadge slot="end">{peleador.clase}</IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel>Peso</IonLabel>
              <IonLabel slot="end">{peleador.peso} kg</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Altura</IonLabel>
              <IonLabel slot="end">{peleador.altura} cm</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Género</IonLabel>
              <IonLabel slot="end">{peleador.genero}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Ubicación</IonLabel>
              <IonLabel slot="end">{peleador.ciudad}, {peleador.pais}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Club</IonLabel>
              <IonLabel slot="end">{peleador.club}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Récord */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Récord Profesional</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Combates Totales</IonLabel>
              <IonLabel slot="end"><strong>{peleador.record?.combates_totales || 0}</strong></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Victorias</IonLabel>
              <IonLabel slot="end" color="success"><strong>{peleador.record?.ganados || 0}</strong></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Derrotas</IonLabel>
              <IonLabel slot="end" color="danger"><strong>{peleador.record?.perdidos || 0}</strong></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>KOs Realizados</IonLabel>
              <IonLabel slot="end"><strong>{peleador.record?.ko_realizados || 0}</strong></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>KOs Recibidos</IonLabel>
              <IonLabel slot="end"><strong>{peleador.record?.ko_recibidos || 0}</strong></IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Historial reciente */}
        {historial.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Historial Reciente</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {historial.slice(0, 5).map((resultado) => (
                <IonItem key={resultado._id}>
                  <IonLabel>
                    <h3>
                      {resultado.peleador_ganador_id._id === id ? (
                        <IonBadge color="success">VICTORIA</IonBadge>
                      ) : (
                        <IonBadge color="danger">DERROTA</IonBadge>
                      )}
                    </h3>
                    <p>vs {resultado.peleador_ganador_id._id === id ? 
                      resultado.peleador_perdedor_id.nombre : 
                      resultado.peleador_ganador_id.nombre}
                    </p>
                    <p>{resultado.metodo} · {new Date(resultado.fecha_combate).toLocaleDateString()}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PeleadorDetalle;

