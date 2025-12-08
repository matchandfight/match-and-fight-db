import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
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
} from '@ionic/react';
import {
  calendarOutline,
  peopleOutline,
  trophyOutline,
  menuOutline,
  sparklesOutline,
  arrowForwardOutline,
  briefcaseOutline,
  checkmarkCircleOutline,
  timeOutline,
  locationOutline,
} from 'ionicons/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useEventosStore } from '@/store/eventosStore';
import { usePeleadoresStore } from '@/store/peleadoresStore';
import { getPeleadoresByManager } from '@/data/mockData';
import './DashboardManager.css';

const DashboardManager: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { eventos, inscripciones, fetchEventos, fetchInscripciones, getEventosDisponibles } = useEventosStore();
  const { fetchPeleadores } = usePeleadoresStore();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'MANAGER') {
      history.push('/login');
      return;
    }
    fetchEventos();
    fetchInscripciones(user.id);
    fetchPeleadores();
  }, [isAuthenticated, user, history, fetchEventos, fetchInscripciones, fetchPeleadores]);

  const handleRefresh = async (event: CustomEvent) => {
    await Promise.all([
      fetchEventos(),
      fetchInscripciones(user?.id),
    ]);
    event.detail.complete();
  };

  if (!user) return null;

  const misPeleadores = getPeleadoresByManager(user.id);
  const eventosDisponibles = getEventosDisponibles();
  const misInscripciones = inscripciones.filter(i => i.managerId === user.id);
  const inscripcionesPendientes = misInscripciones.filter(i => i.estado === 'PENDIENTE');
  const inscripcionesAceptadas = misInscripciones.filter(i => i.estado === 'ACEPTADA');
  
  // Calcular stats totales de peleadores
  const totalVictorias = misPeleadores.reduce((acc, p) => acc + p.record.ganados, 0);

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getEstadoInscripcion = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return { color: 'warning', text: 'Pendiente' };
      case 'ACEPTADA':
        return { color: 'success', text: 'Aceptada' };
      case 'RECHAZADA':
        return { color: 'danger', text: 'Rechazada' };
      case 'EMPAREJADO':
        return { color: 'primary', text: 'Emparejado' };
      default:
        return { color: 'medium', text: estado };
    }
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
            <h1 className="header-title">Panel Manager</h1>
            <p className="header-subtitle">{misPeleadores.length} peleadores</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="manager-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="manager-container">
          {/* Welcome Section */}
          <div className="welcome-section fade-in">
            <div className="welcome-content">
              <h2 className="welcome-title">
                ¡Hola, <span className="gradient-text">{user.nombre}!</span>
              </h2>
              <p className="welcome-subtitle">Gestiona a tus peleadores</p>
            </div>
            <div className="welcome-decoration manager-decoration">
              <IonIcon icon={briefcaseOutline} />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid fade-in stagger-1">
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-primary">
                <IonIcon icon={peopleOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{misPeleadores.length}</span>
                <span className="stat-label">Peleadores</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-success">
                <IonIcon icon={trophyOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{totalVictorias}</span>
                <span className="stat-label">Victorias</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-secondary">
                <IonIcon icon={calendarOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{inscripcionesAceptadas.length}</span>
                <span className="stat-label">Inscritos</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-warning">
                <IonIcon icon={timeOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{inscripcionesPendientes.length}</span>
                <span className="stat-label">Pendientes</span>
              </div>
            </div>
          </div>

          {/* Mis Peleadores */}
          <div className="section-header fade-in stagger-2">
            <div className="section-title-wrapper">
              <div className="section-icon-wrapper">
                <IonIcon icon={peopleOutline} />
              </div>
              <div>
                <h2>Mis Peleadores</h2>
                <p className="section-subtitle">Tu roster actual</p>
              </div>
            </div>
            <IonButton fill="clear" size="small" className="section-action" onClick={() => history.push('/manager/peleadores')}>
              Ver todos
              <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div className="peleadores-horizontal-scroll">
            {misPeleadores.map((peleador, index) => (
              <IonCard 
                key={peleador.id} 
                className={`peleador-card-mini fade-in stagger-${index + 1}`}
                button
                onClick={() => history.push(`/peleadores/${peleador.id}`)}
              >
                <IonCardContent>
                  <IonAvatar className="peleador-avatar-mini">
                    <img src={peleador.fotoUrl} alt={peleador.nombre} />
                  </IonAvatar>
                  <h4>{peleador.nombre}</h4>
                  {peleador.alias && <p className="peleador-alias">"{peleador.alias}"</p>}
                  <div className="peleador-stats-mini">
                    <span className="wins">{peleador.record.ganados}W</span>
                    <span className="separator">-</span>
                    <span className="losses">{peleador.record.perdidos}L</span>
                  </div>
                  <div className="peleador-elo-mini">
                    <IonIcon icon={trophyOutline} />
                    <span>{peleador.puntuacionElo}</span>
                  </div>
                  {peleador.disponible && (
                    <IonBadge className="disponible-badge">Disponible</IonBadge>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Eventos Disponibles */}
          <div className="section-header fade-in stagger-3">
            <div className="section-title-wrapper">
              <div className="section-icon-wrapper section-icon-success">
                <IonIcon icon={sparklesOutline} />
              </div>
              <div>
                <h2>Eventos Disponibles</h2>
                <p className="section-subtitle">Inscribe a tus peleadores</p>
              </div>
            </div>
            <IonButton fill="clear" size="small" className="section-action" onClick={() => history.push('/manager/eventos')}>
              Ver todos
              <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div className="eventos-disponibles-list">
            {eventosDisponibles.length === 0 ? (
              <div className="empty-card fade-in">
                <IonIcon icon={calendarOutline} />
                <p>No hay eventos disponibles ahora</p>
              </div>
            ) : (
              eventosDisponibles.slice(0, 3).map((evento, index) => (
                <IonCard 
                  key={evento.id} 
                  className={`evento-disponible-card fade-in stagger-${index + 1}`}
                  button
                  onClick={() => history.push(`/manager/eventos/${evento.id}`)}
                >
                  <IonCardContent>
                    <div className="evento-disponible-header">
                      <div>
                        <h3>{evento.nombre}</h3>
                        <p className="evento-promotor">{evento.promotorNombre}</p>
                      </div>
                      <IonBadge className="inscripciones-badge">
                        {evento.categorias.length} categorías
                      </IonBadge>
                    </div>
                    <div className="evento-disponible-details">
                      <div className="evento-detail">
                        <IonIcon icon={calendarOutline} />
                        <span>{formatFecha(evento.fecha)}</span>
                      </div>
                      <div className="evento-detail">
                        <IonIcon icon={locationOutline} />
                        <span>{evento.ciudad}</span>
                      </div>
                      <div className="evento-detail">
                        <IonIcon icon={peopleOutline} />
                        <span>{evento.peleadores} inscritos</span>
                      </div>
                    </div>
                    <IonButton expand="block" size="small" className="inscribir-btn">
                      Inscribir Peleador
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))
            )}
          </div>

          {/* Inscripciones Pendientes */}
          {inscripcionesPendientes.length > 0 && (
            <>
              <div className="section-header fade-in stagger-4">
                <div className="section-title-wrapper">
                  <div className="section-icon-wrapper section-icon-warning">
                    <IonIcon icon={timeOutline} />
                  </div>
                  <div>
                    <h2>Inscripciones Pendientes</h2>
                    <p className="section-subtitle">Esperando confirmación</p>
                  </div>
                </div>
              </div>

              <div className="inscripciones-list">
                {inscripcionesPendientes.map((inscripcion, index) => {
                  const evento = eventos.find(e => e.id === inscripcion.eventoId);
                  const peleador = misPeleadores.find(p => p.id === inscripcion.peleadorId);
                  const badge = getEstadoInscripcion(inscripcion.estado);
                  
                  return (
                    <IonCard key={inscripcion.id} className={`inscripcion-card fade-in stagger-${index + 1}`}>
                      <IonCardContent>
                        <div className="inscripcion-info">
                          <div className="inscripcion-peleador">
                            <IonAvatar>
                              <img src={peleador?.fotoUrl} alt={peleador?.nombre} />
                            </IonAvatar>
                            <div>
                              <h4>{peleador?.nombre}</h4>
                              <p>{evento?.nombre}</p>
                            </div>
                          </div>
                          <IonBadge color={badge.color}>{badge.text}</IonBadge>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </div>
            </>
          )}

          {/* Acciones rápidas */}
          <div className="quick-actions-section fade-in">
            <IonButton expand="block" className="action-button-primary" onClick={() => history.push('/manager/eventos')}>
              <IonIcon icon={calendarOutline} slot="start" />
              Ver Eventos Disponibles
            </IonButton>
            <div className="action-buttons-row">
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/manager/peleadores')}>
                <IonIcon icon={peopleOutline} slot="start" />
                Mis Peleadores
              </IonButton>
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/manager/inscripciones')}>
                <IonIcon icon={checkmarkCircleOutline} slot="start" />
                Inscripciones
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardManager;

