import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { 
  trophyOutline, 
  arrowUpOutline, 
  arrowDownOutline, 
  removeOutline, 
  flameOutline, 
  medalOutline,
  menuOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { mockRankings } from '@/data/mockData';
import './Rankings.css';

const Rankings: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('global');
  const [claseFilter, setClaseFilter] = useState<string>('');
  const [generoFilter, setGeneroFilter] = useState<string>('');
  const history = useHistory();

  // Filtrar rankings
  const filteredRankings = mockRankings.filter((r) => {
    if (claseFilter && r.peleador.clase !== claseFilter) return false;
    if (generoFilter && r.peleador.genero !== generoFilter) return false;
    return true;
  });

  const getTendenciaIcon = (tendencia: 'up' | 'down' | 'same') => {
    switch (tendencia) {
      case 'up':
        return arrowUpOutline;
      case 'down':
        return arrowDownOutline;
      default:
        return removeOutline;
    }
  };

  const top3 = filteredRankings.slice(0, 3);
  const rest = filteredRankings.slice(3);

  return (
    <IonPage>
      {/* Header moderno */}
      <IonHeader className="modern-header">
        <div className="header-blur-bg"></div>
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="menu-toggle-btn">
              <IonIcon icon={menuOutline} />
            </IonMenuButton>
          </IonButtons>
          
          <div className="header-title-section">
            <h1 className="header-title">Rankings</h1>
            <p className="header-subtitle">Clasificación ELO mundial</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="rankings-content">
        <div className="rankings-container">
          {/* Filtros */}
          <div className="filters-section fade-in">
            <IonSegment
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
              className="segment-custom"
            >
              <IonSegmentButton value="global">
                <IonLabel>Global</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="nacional">
                <IonLabel>Nacional</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="regional">
                <IonLabel>Regional</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="filters-row">
              <IonSelect
                value={claseFilter}
                placeholder="Clase"
                onIonChange={(e) => setClaseFilter(e.detail.value)}
                className="filter-select-compact"
              >
                <IonSelectOption value="">Todas</IonSelectOption>
                <IonSelectOption value="A">A (-60kg)</IonSelectOption>
                <IonSelectOption value="B">B (60-70kg)</IonSelectOption>
                <IonSelectOption value="C">C (70-80kg)</IonSelectOption>
                <IonSelectOption value="D">D (+80kg)</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={generoFilter}
                placeholder="Género"
                onIonChange={(e) => setGeneroFilter(e.detail.value)}
                className="filter-select-compact"
              >
                <IonSelectOption value="">Todos</IonSelectOption>
                <IonSelectOption value="MASCULINO">Hombres</IonSelectOption>
                <IonSelectOption value="FEMENINO">Mujeres</IonSelectOption>
              </IonSelect>
            </div>
          </div>

          {/* Podio Top 3 */}
          {top3.length >= 3 && (
            <div className="podium-section fade-in stagger-1">
              <div className="podium-container">
                {/* Segundo lugar */}
                <div className="podium-item podium-second" onClick={() => history.push(`/peleadores/${top3[1].peleador.id}`)}>
                  <div className="podium-rank-badge podium-rank-silver">
                    <span className="podium-rank-number">2</span>
                  </div>
                  <IonAvatar className="podium-avatar podium-avatar-second">
                    <img src={top3[1].peleador.fotoUrl} alt={top3[1].peleador.nombre} />
                  </IonAvatar>
                  <h3 className="podium-name">{top3[1].peleador.nombre}</h3>
                  <div className="podium-elo">
                    <IonIcon icon={flameOutline} />
                    <span>{top3[1].peleador.puntuacionElo}</span>
                  </div>
                  <div className="podium-platform podium-platform-second">
                    <IonIcon icon={medalOutline} className="podium-platform-icon" />
                  </div>
                </div>

                {/* Primer lugar */}
                <div className="podium-item podium-first" onClick={() => history.push(`/peleadores/${top3[0].peleador.id}`)}>
                  <div className="podium-crown">👑</div>
                  <div className="podium-rank-badge podium-rank-gold">
                    <span className="podium-rank-number">1</span>
                  </div>
                  <IonAvatar className="podium-avatar podium-avatar-first">
                    <img src={top3[0].peleador.fotoUrl} alt={top3[0].peleador.nombre} />
                  </IonAvatar>
                  <h3 className="podium-name">{top3[0].peleador.nombre}</h3>
                  <div className="podium-elo">
                    <IonIcon icon={flameOutline} />
                    <span>{top3[0].peleador.puntuacionElo}</span>
                  </div>
                  <div className="podium-platform podium-platform-first">
                    <IonIcon icon={trophyOutline} className="podium-platform-icon" />
                  </div>
                </div>

                {/* Tercer lugar */}
                <div className="podium-item podium-third" onClick={() => history.push(`/peleadores/${top3[2].peleador.id}`)}>
                  <div className="podium-rank-badge podium-rank-bronze">
                    <span className="podium-rank-number">3</span>
                  </div>
                  <IonAvatar className="podium-avatar podium-avatar-third">
                    <img src={top3[2].peleador.fotoUrl} alt={top3[2].peleador.nombre} />
                  </IonAvatar>
                  <h3 className="podium-name">{top3[2].peleador.nombre}</h3>
                  <div className="podium-elo">
                    <IonIcon icon={flameOutline} />
                    <span>{top3[2].peleador.puntuacionElo}</span>
                  </div>
                  <div className="podium-platform podium-platform-third">
                    <IonIcon icon={medalOutline} className="podium-platform-icon" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resto del ranking */}
          <div className="ranking-list">
            {rest.map((ranking, index) => (
              <IonCard
                key={ranking.peleador.id}
                className={`ranking-card fade-in stagger-${(index % 6) + 1}`}
                button
                onClick={() => history.push(`/peleadores/${ranking.peleador.id}`)}
              >
                <IonCardContent className="ranking-card-content">
                  <div className="ranking-position">
                    <span className="position-number">#{ranking.posicion}</span>
                    <IonChip className={`ranking-trend ranking-trend-${ranking.tendencia}`}>
                      <IonIcon icon={getTendenciaIcon(ranking.tendencia)} />
                      <IonLabel>{ranking.cambio}</IonLabel>
                    </IonChip>
                  </div>

                  <IonAvatar className="ranking-avatar">
                    <img src={ranking.peleador.fotoUrl} alt={ranking.peleador.nombre} />
                  </IonAvatar>

                  <div className="ranking-info">
                    <h3>{ranking.peleador.nombre}</h3>
                    <p className="ranking-meta">
                      {ranking.peleador.ciudad} • {ranking.peleador.peso}kg
                    </p>
                    <div className="ranking-tags">
                      <IonChip className="ranking-tag">
                        {ranking.peleador.modalidad}
                      </IonChip>
                      <IonChip className="ranking-tag ranking-tag-outline">
                        Clase {ranking.peleador.clase}
                      </IonChip>
                    </div>
                  </div>

                  <div className="ranking-stats">
                    <div className="ranking-elo">
                      <IonIcon icon={trophyOutline} />
                      <span className="elo-value">{ranking.peleador.puntuacionElo}</span>
                    </div>
                    <div className="ranking-record">
                      <span className="record-wins">{ranking.peleador.record.ganados}</span>-
                      <span className="record-losses">{ranking.peleador.record.perdidos}</span>-
                      <span className="record-draws">{ranking.peleador.record.empates}</span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Sin resultados */}
          {filteredRankings.length === 0 && (
            <div className="no-results fade-in">
              <div className="no-results-icon-wrapper">
                <IonIcon icon={trophyOutline} />
              </div>
              <h3>No se encontraron resultados</h3>
              <p>Intenta ajustar tus filtros</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rankings;
