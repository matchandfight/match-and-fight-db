import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonChip,
} from '@ionic/react';
import {
  calendarOutline,
  trophyOutline,
  menuOutline,
  statsChartOutline,
  flameOutline,
  medalOutline,
  locationOutline,
  timerOutline,
  createOutline,
  eyeOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { usePeleadoresStore } from '@/store/peleadoresStore';
import { useEventosStore } from '@/store/eventosStore';
import './DashboardPeleador.css';

const DashboardPeleador: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { getPeleadorById, fetchPeleadores } = usePeleadoresStore();
  const { inscripciones, fetchInscripciones } = useEventosStore();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'ATLETA') {
      history.push('/login');
      return;
    }
    fetchPeleadores();
    if (user?.peleadorId) {
      fetchInscripciones();
    }
  }, [isAuthenticated, user, history, fetchPeleadores, fetchInscripciones]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchPeleadores();
    event.detail.complete();
  };

  if (!user || !user.peleadorId) return null;

  const peleador = getPeleadorById(user.peleadorId);
  if (!peleador) return null;

  const misInscripciones = inscripciones.filter(i => i.peleadorId === user.peleadorId);
  const proximosCombates = misInscripciones.filter(i => i.estado === 'ACEPTADA' || i.estado === 'EMPAREJADO');

  const winRate = peleador.record.combates > 0 
    ? Math.round((peleador.record.ganados / peleador.record.combates) * 100) 
    : 0;

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <IonPage>
      <IonHeader className="modern-header">
        <div className="header-blur-bg"></div>
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="menu-toggle-btn">
              <IonIcon icon={menuOutline} />
            </IonMenuButton>
          </IonButtons>
          
          <div className="header-title-section">
            <h1 className="header-title">Mi Perfil</h1>
            <p className="header-subtitle">Panel de Atleta</p>
          </div>

          <IonButtons slot="end">
            <IonButton className="header-action-btn" onClick={() => history.push('/peleador/editar-perfil')}>
              <IonIcon icon={createOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="peleador-dashboard-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="peleador-dashboard-container">
          {/* Profile Card */}
          <div className="profile-card fade-in">
            <div className="profile-header-bg"></div>
            <div className="profile-content">
              <div className="profile-avatar-section">
                <IonAvatar className="profile-avatar-large">
                  <img src={peleador.fotoUrl} alt={peleador.nombre} />
                </IonAvatar>
                {peleador.verificado && (
                  <div className="verified-badge-profile">
                    <IonIcon icon={shieldCheckmarkOutline} />
                  </div>
                )}
              </div>
              
              <div className="profile-info-section">
                <h1 className="profile-name">{peleador.nombre}</h1>
                {peleador.alias && (
                  <p className="profile-alias">"{peleador.alias}"</p>
                )}
                
                <div className="profile-tags">
                  <IonChip className="profile-chip">
                    <IonIcon icon={trophyOutline} />
                    <span>{peleador.modalidad}</span>
                  </IonChip>
                  <IonChip className="profile-chip">
                    <IonIcon icon={locationOutline} />
                    <span>{peleador.ciudad}</span>
                  </IonChip>
                  <IonChip className="profile-chip chip-clase">
                    Clase {peleador.clase}
                  </IonChip>
                </div>

                <div className="profile-elo-display">
                  <div className="elo-value-large">
                    <IonIcon icon={flameOutline} />
                    <span>{peleador.puntuacionElo}</span>
                  </div>
                  <span className="elo-label">Puntos ELO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid fade-in stagger-1">
            <div className="stat-card stat-card-record">
              <div className="stat-icon-container stat-icon-primary">
                <IonIcon icon={statsChartOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{peleador.record.combates}</span>
                <span className="stat-label">Combates</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-wins">
              <div className="stat-icon-container stat-icon-success">
                <IonIcon icon={trophyOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{peleador.record.ganados}</span>
                <span className="stat-label">Victorias</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-kos">
              <div className="stat-icon-container stat-icon-warning">
                <IonIcon icon={flameOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{peleador.record.kos}</span>
                <span className="stat-label">KOs</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-rate">
              <div className="stat-icon-container stat-icon-secondary">
                <IonIcon icon={medalOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{winRate}%</span>
                <span className="stat-label">Win Rate</span>
              </div>
            </div>
          </div>

          {/* Record Detallado */}
          <div className="record-card fade-in stagger-2">
            <h3>Récord Profesional</h3>
            <div className="record-display">
              <div className="record-item wins">
                <span className="record-number">{peleador.record.ganados}</span>
                <span className="record-label">Victorias</span>
              </div>
              <div className="record-separator">-</div>
              <div className="record-item losses">
                <span className="record-number">{peleador.record.perdidos}</span>
                <span className="record-label">Derrotas</span>
              </div>
              <div className="record-separator">-</div>
              <div className="record-item draws">
                <span className="record-number">{peleador.record.empates}</span>
                <span className="record-label">Empates</span>
              </div>
            </div>
            <div className="record-note">
              <IonIcon icon={eyeOutline} />
              <span>El récord es actualizado por los promotores después de cada combate</span>
            </div>
          </div>

          {/* Próximos Combates */}
          {proximosCombates.length > 0 && (
            <div className="section-card fade-in stagger-3">
              <div className="section-card-header">
                <IonIcon icon={calendarOutline} />
                <h3>Próximos Combates</h3>
              </div>
              <div className="proximos-combates-list">
                {proximosCombates.map(inscripcion => (
                  <div key={inscripcion.id} className="combate-item">
                    <div className="combate-fecha">
                      <IonIcon icon={timerOutline} />
                      <span>{formatFecha(inscripcion.fechaInscripcion)}</span>
                    </div>
                    <IonBadge color="primary">{inscripcion.peso}</IonBadge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="info-card fade-in stagger-3">
            <h3>Información del Atleta</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Peso</span>
                <span className="info-value">{peleador.peso} kg</span>
              </div>
              <div className="info-item">
                <span className="info-label">Altura</span>
                <span className="info-value">{peleador.altura} cm</span>
              </div>
              <div className="info-item">
                <span className="info-label">Edad</span>
                <span className="info-value">{peleador.edad} años</span>
              </div>
              <div className="info-item">
                <span className="info-label">Club</span>
                <span className="info-value">{peleador.club}</span>
              </div>
            </div>
            {peleador.ultimoCombate && (
              <div className="ultimo-combate">
                <IonIcon icon={calendarOutline} />
                <span>Último combate: {formatFecha(peleador.ultimoCombate)}</span>
              </div>
            )}
          </div>

          {/* Disponibilidad */}
          <div className={`disponibilidad-card fade-in stagger-4 ${peleador.disponible ? 'disponible' : 'no-disponible'}`}>
            <div className="disponibilidad-content">
              <div className="disponibilidad-icon">
                <IonIcon icon={peleador.disponible ? calendarOutline : timerOutline} />
              </div>
              <div className="disponibilidad-info">
                <h4>{peleador.disponible ? 'Disponible para combatir' : 'No disponible'}</h4>
                <p>{peleador.disponible 
                  ? 'Tu manager puede inscribirte en eventos' 
                  : 'Actualmente no estás disponible para nuevos combates'}</p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="quick-actions-section fade-in">
            <IonButton expand="block" className="action-button-primary" onClick={() => history.push('/peleador/editar-perfil')}>
              <IonIcon icon={createOutline} slot="start" />
              Editar Mi Perfil
            </IonButton>
            <div className="action-buttons-row">
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/rankings')}>
                <IonIcon icon={trophyOutline} slot="start" />
                Rankings
              </IonButton>
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/eventos')}>
                <IonIcon icon={calendarOutline} slot="start" />
                Eventos
              </IonButton>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="note-card fade-in">
            <p>
              <strong>Nota:</strong> Como atleta, puedes editar tu información personal. 
              Los resultados de combates y el récord son actualizados exclusivamente por los promotores 
              después de cada evento oficial.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPeleador;

