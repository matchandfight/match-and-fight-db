import { useState, useEffect } from 'react';
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
  IonBackButton,
  IonButtons,
  IonChip,
  IonLabel,
  useIonLoading,
} from '@ionic/react';
import { eventoService } from '../../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    await presentLoading({ message: 'Cargando eventos...' });
    try {
      const data = await eventoService.getProximos();
      setEventos(data.data || []);
    } catch (error) {
      console.error('Error cargando eventos:', error);
    } finally {
      await dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>📅 Eventos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {eventos.map((evento) => (
          <IonCard key={evento._id} button routerLink={`/eventos/${evento._id}`}>
            {evento.imagen_poster && (
              <img src={evento.imagen_poster} alt={evento.nombre} />
            )}
            <IonCardHeader>
              <IonCardTitle>{evento.nombre}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                <strong>📍 {evento.ciudad}, {evento.pais}</strong>
              </p>
              <p>
                <strong>📅 {format(new Date(evento.fecha), 'PPP', { locale: es })}</strong>
              </p>
              {evento.hora && <p>🕐 {evento.hora}</p>}
              
              <div style={{ marginTop: '0.5rem' }}>
                <IonChip color="primary">
                  <IonLabel>{evento.disciplina}</IonLabel>
                </IonChip>
                <IonChip color="secondary">
                  <IonLabel>{evento.categoria}</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

        {eventos.length === 0 && (
          <IonCard>
            <IonCardContent className="ion-text-center">
              <p>No hay eventos próximos</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Eventos;

