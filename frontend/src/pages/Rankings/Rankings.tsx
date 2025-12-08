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
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonButtons,
  useIonLoading,
} from '@ionic/react';
import { rankingService } from '../../services/api';

const Rankings: React.FC = () => {
  const [rankings, setRankings] = useState<any[]>([]);
  const [tipoRanking, setTipoRanking] = useState('global');
  const [clase, setClase] = useState('');
  const [genero, setGenero] = useState('');
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    loadRankings();
  }, [tipoRanking, clase, genero]);

  const loadRankings = async () => {
    await presentLoading({ message: 'Cargando rankings...' });
    try {
      let data;
      const filtros = { clase, genero, limite: 50 };

      switch (tipoRanking) {
        case 'global':
          data = await rankingService.getGlobal(filtros);
          break;
        case 'espana':
          data = await rankingService.getByPais('España', filtros);
          break;
        case 'europa':
          data = await rankingService.getByRegion('europa');
          break;
        default:
          data = await rankingService.getGlobal(filtros);
      }

      setRankings(data.data || []);
    } catch (error) {
      console.error('Error cargando rankings:', error);
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
          <IonTitle>🏆 Rankings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Selector de tipo de ranking */}
        <IonSegment value={tipoRanking} onIonChange={(e) => setTipoRanking(String(e.detail.value))}>
          <IonSegmentButton value="global">
            <IonLabel>Global</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="europa">
            <IonLabel>Europa</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="espana">
            <IonLabel>España</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Filtros */}
        <div className="ion-padding">
          <IonItem>
            <IonLabel>Clase</IonLabel>
            <IonSelect value={clase} onIonChange={(e) => setClase(e.detail.value!)}>
              <IonSelectOption value="">Todas</IonSelectOption>
              <IonSelectOption value="N">N - Novato</IonSelectOption>
              <IonSelectOption value="C">C - Clase C</IonSelectOption>
              <IonSelectOption value="B">B - Clase B</IonSelectOption>
              <IonSelectOption value="A">A - Clase A</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Género</IonLabel>
            <IonSelect value={genero} onIonChange={(e) => setGenero(e.detail.value!)}>
              <IonSelectOption value="">Todos</IonSelectOption>
              <IonSelectOption value="Masculino">Masculino</IonSelectOption>
              <IonSelectOption value="Femenino">Femenino</IonSelectOption>
            </IonSelect>
          </IonItem>
        </div>

        {/* Lista de ranking */}
        <IonList>
          {rankings.map((peleador, index) => (
            <IonItem
              key={peleador._id}
              button
              routerLink={`/peleadores/${peleador._id}`}
            >
              <IonLabel slot="start" style={{ maxWidth: '50px', textAlign: 'center' }}>
                <h2><strong>#{index + 1}</strong></h2>
              </IonLabel>
              
              <IonAvatar slot="start">
                <img src={peleador.foto_url || 'https://via.placeholder.com/150'} alt={peleador.nombre} />
              </IonAvatar>

              <IonLabel>
                <h2>
                  <strong>{peleador.nombre}</strong>
                  {peleador.alias && <span> "{peleador.alias}"</span>}
                </h2>
                <p>
                  {peleador.ciudad}, {peleador.pais} · {peleador.peso}kg · Clase {peleador.clase}
                </p>
                <p>
                  Récord: {peleador.record?.ganados || 0}V - {peleador.record?.perdidos || 0}D
                </p>
              </IonLabel>

              <IonBadge slot="end" color="warning">
                <strong style={{ fontSize: '1.1rem' }}>{Math.round(peleador.puntuacion_elo)}</strong>
              </IonBadge>
            </IonItem>
          ))}

          {rankings.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-center">
                <p>No hay peleadores en este ranking</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Rankings;

