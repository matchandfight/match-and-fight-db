import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonBadge,
  IonChip,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
} from '@ionic/react';
import { 
  trophyOutline, 
  locationOutline, 
  checkmarkCircle, 
  filterOutline,
  menuOutline,
  searchOutline,
  closeOutline,
  peopleOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { usePeleadoresStore } from '@/store/peleadoresStore';
import './Peleadores.css';

const Peleadores: React.FC = () => {
  const { filteredPeleadores, fetchPeleadores, setFilters, filters } = usePeleadoresStore();
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchPeleadores();
  }, [fetchPeleadores]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchPeleadores();
    event.detail.complete();
  };

  const filteredBySearch = filteredPeleadores.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      p.alias?.toLowerCase().includes(searchText.toLowerCase()) ||
      p.ciudad.toLowerCase().includes(searchText.toLowerCase())
  );

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
            <h1 className="header-title">Peleadores</h1>
            <p className="header-subtitle">{filteredBySearch.length} atletas</p>
          </div>

          <IonButtons slot="end">
            <IonButton 
              className="header-action-btn" 
              onClick={() => setShowSearch(!showSearch)}
            >
              <IonIcon icon={showSearch ? closeOutline : searchOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        
        {/* Barra de búsqueda expandible */}
        {showSearch && (
          <IonToolbar className="search-toolbar">
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value!)}
              placeholder="Buscar por nombre, alias o ciudad"
              className="custom-searchbar"
              animated
              showCancelButton="never"
            />
          </IonToolbar>
        )}
      </IonHeader>

      <IonContent fullscreen className="peleadores-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="peleadores-container">
          {/* Filtros */}
          {showFilters && (
            <IonCard className="filters-card fade-in">
              <IonCardContent>
                <div className="filters-header">
                  <h3>Filtros</h3>
                  <IonButton fill="clear" size="small" onClick={() => setShowFilters(false)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </div>
                <div className="filters-grid">
                  <div className="filter-item">
                    <label>Modalidad</label>
                    <IonSelect
                      value={filters.modalidad}
                      placeholder="Todas"
                      onIonChange={(e) => setFilters({ modalidad: e.detail.value })}
                      className="filter-select"
                    >
                      <IonSelectOption value="">Todas</IonSelectOption>
                      <IonSelectOption value="MUAY_THAI">Muay Thai</IonSelectOption>
                      <IonSelectOption value="K1">K1</IonSelectOption>
                    </IonSelect>
                  </div>

                  <div className="filter-item">
                    <label>Clase de peso</label>
                    <IonSelect
                      value={filters.clase}
                      placeholder="Todas"
                      onIonChange={(e) => setFilters({ clase: e.detail.value })}
                      className="filter-select"
                    >
                      <IonSelectOption value="">Todas</IonSelectOption>
                      <IonSelectOption value="A">A (-60kg)</IonSelectOption>
                      <IonSelectOption value="B">B (60-70kg)</IonSelectOption>
                      <IonSelectOption value="C">C (70-80kg)</IonSelectOption>
                      <IonSelectOption value="D">D (+80kg)</IonSelectOption>
                    </IonSelect>
                  </div>

                  <div className="filter-item">
                    <label>País</label>
                    <IonSelect
                      value={filters.pais}
                      placeholder="Todos"
                      onIonChange={(e) => setFilters({ pais: e.detail.value })}
                      className="filter-select"
                    >
                      <IonSelectOption value="">Todos</IonSelectOption>
                      <IonSelectOption value="España">España</IonSelectOption>
                      <IonSelectOption value="Francia">Francia</IonSelectOption>
                      <IonSelectOption value="Portugal">Portugal</IonSelectOption>
                    </IonSelect>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* Lista de peleadores */}
          <div className="fighters-grid">
            {filteredBySearch.map((peleador, index) => (
              <IonCard
                key={peleador.id}
                className={`fighter-card fade-in stagger-${(index % 6) + 1}`}
                button
                onClick={() => history.push(`/peleadores/${peleador.id}`)}
              >
                {/* Imagen de fondo con overlay */}
                <div className="fighter-image-wrapper">
                  <img src={peleador.fotoUrl} alt={peleador.nombre} className="fighter-image" />
                  <div className="fighter-image-overlay"></div>
                  
                  {/* Badge de verificación */}
                  {peleador.verificado && (
                    <div className="verified-badge">
                      <IonIcon icon={checkmarkCircle} />
                    </div>
                  )}
                  
                  {/* Puntuación Elo destacada */}
                  <div className="elo-badge">
                    <IonIcon icon={trophyOutline} />
                    <span>{peleador.puntuacionElo}</span>
                  </div>
                </div>

                <IonCardContent className="fighter-content">
                  {/* Nombre y alias */}
                  <div className="fighter-header">
                    <h2>{peleador.nombre}</h2>
                    {peleador.alias && <p className="fighter-alias">"{peleador.alias}"</p>}
                  </div>

                  {/* Stats rápidos */}
                  <div className="fighter-stats">
                    <div className="stat">
                      <span className="stat-label">Récord</span>
                      <span className="stat-value">
                        <span className="stat-wins">{peleador.record.ganados}</span>-
                        <span className="stat-losses">{peleador.record.perdidos}</span>-
                        <span className="stat-draws">{peleador.record.empates}</span>
                      </span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                      <span className="stat-label">Peso</span>
                      <span className="stat-value">{peleador.peso}kg</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="fighter-tags">
                    <IonChip className="fighter-chip" color="primary">
                      {peleador.modalidad}
                    </IonChip>
                    <IonChip className="fighter-chip fighter-chip-outline">
                      <IonIcon icon={locationOutline} />
                      {peleador.ciudad}
                    </IonChip>
                  </div>

                  {/* Badge de disponibilidad */}
                  {peleador.disponible && (
                    <IonBadge className="availability-badge" color="success">
                      Disponible
                    </IonBadge>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Sin resultados */}
          {filteredBySearch.length === 0 && (
            <div className="no-results fade-in">
              <div className="no-results-icon-wrapper">
                <IonIcon icon={peopleOutline} />
              </div>
              <h3>No se encontraron peleadores</h3>
              <p>Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>

        {/* Botón flotante de filtros */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="filter-fab">
          <IonFabButton onClick={() => setShowFilters(!showFilters)} className="filter-fab-button">
            <IonIcon icon={filterOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Peleadores;
