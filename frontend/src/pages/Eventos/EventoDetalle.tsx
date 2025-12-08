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
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonChip,
  useIonLoading,
} from '@ionic/react';
import { eventoService } from '../../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EventoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [evento, setEvento] = useState<any>(null);
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    loadEvento();
  }, [id]);

  const loadEvento = async () => {
    await presentLoading({ message: 'Cargando...' });
    try {
      const data = await eventoService.getById(id);
      setEvento(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await dismissLoading();
    }
  };

  if (!evento) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/eventos" />
          </IonButtons>
          <IonTitle>{evento.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {evento.imagen_poster && (
          <img src={evento.imagen_poster} alt={evento.nombre} style={{ width: '100%' }} />
        )}

        <div className="ion-padding">
          <h1>{evento.nombre}</h1>
          
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Detalles del Evento</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Fecha</IonLabel>
                <IonLabel slot="end">
                  {format(new Date(evento.fecha), 'PPP', { locale: es })}
                </IonLabel>
              </IonItem>
              {evento.hora && (
                <IonItem>
                  <IonLabel>Hora</IonLabel>
                  <IonLabel slot="end">{evento.hora}</IonLabel>
                </IonItem>
              )}
              <IonItem>
                <IonLabel>Ubicación</IonLabel>
                <IonLabel slot="end">{evento.ciudad}, {evento.pais}</IonLabel>
              </IonItem>
              {evento.venue && (
                <IonItem>
                  <IonLabel>Recinto</IonLabel>
                  <IonLabel slot="end">{evento.venue}</IonLabel>
                </IonItem>
              )}
              <IonItem>
                <IonLabel>Disciplina</IonLabel>
                <IonChip slot="end" color="primary">{evento.disciplina}</IonChip>
              </IonItem>
              <IonItem>
                <IonLabel>Categoría</IonLabel>
                <IonChip slot="end" color="secondary">{evento.categoria}</IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {evento.descripcion && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Descripción</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{evento.descripcion}</p>
              </IonCardContent>
            </IonCard>
          )}

          {evento.combates && evento.combates.length > 0 && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Cartelera ({evento.combates.length} combates)</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {evento.combates.map((combate: any, index: number) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h3>Combate {combate.orden || index + 1}</h3>
                      <p>{combate.peso_pactado}kg · {combate.rondas} rounds</p>
                      {combate.es_titulo && <IonChip color="warning">TÍTULO</IonChip>}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventoDetalle;

