import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonSearchbar,
  IonBadge,
  IonBackButton,
  IonButtons,
  useIonLoading,
} from '@ionic/react';
import { peleadorService } from '../../services/api';

const Peleadores: React.FC = () => {
  const [peleadores, setPeleadores] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    loadPeleadores();
  }, []);

  const loadPeleadores = async () => {
    await presentLoading({ message: 'Cargando peleadores...' });
    try {
      const data = await peleadorService.getAll({ limite: 50, orden: '-puntuacion_elo' });
      setPeleadores(data.data || []);
    } catch (error) {
      console.error('Error cargando peleadores:', error);
    } finally {
      await dismissLoading();
    }
  };

  const filteredPeleadores = peleadores.filter((p) =>
    p.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    p.alias?.toLowerCase().includes(searchText.toLowerCase()) ||
    p.pais.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Peleadores</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Buscar peleador..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {filteredPeleadores.map((peleador) => (
            <IonItem key={peleador._id} button routerLink={`/peleadores/${peleador._id}`}>
              <IonAvatar slot="start">
                <img src={peleador.foto_url || 'https://via.placeholder.com/150'} alt={peleador.nombre} />
              </IonAvatar>

              <IonLabel>
                <h2>
                  <strong>{peleador.nombre}</strong>
                  {peleador.alias && <span> "{peleador.alias}"</span>}
                </h2>
                <p>
                  {peleador.ciudad}, {peleador.pais}
                </p>
                <p>
                  {peleador.peso}kg · Clase {peleador.clase} · {peleador.record?.ganados || 0}V-{peleador.record?.perdidos || 0}D
                </p>
              </IonLabel>

              <div slot="end" style={{ textAlign: 'right' }}>
                <IonBadge color="warning">
                  ELO: {Math.round(peleador.puntuacion_elo)}
                </IonBadge>
              </div>
            </IonItem>
          ))}

          {filteredPeleadores.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-center">
                <p>No se encontraron peleadores</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Peleadores;

