import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonAlert,
} from '@ionic/react';
import {
  calendarOutline,
  peopleOutline,
  trophyOutline,
  menuOutline,
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  timeOutline,
  locationOutline,
  eyeOutline,
  statsChartOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useEventosStore } from '@/store/eventosStore';
import './DashboardAdmin.css';

const DashboardAdmin: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    eventos, 
    fetchEventos, 
    getEventosPendientesAprobacion,
    aprobarEvento,
    rechazarEvento,
  } = useEventosStore();
  const history = useHistory();
  
  const [showRejectAlert, setShowRejectAlert] = useState(false);
  const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'SUPER_ADMIN') {
      history.push('/login');
      return;
    }
    fetchEventos();
  }, [isAuthenticated, user, history, fetchEventos]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchEventos();
    event.detail.complete();
  };

  if (!user) return null;

  const eventosPendientes = getEventosPendientesAprobacion();
  const eventosAprobados = eventos.filter(e => 
    ['PUBLICADO', 'INSCRIPCIONES_ABIERTAS', 'INSCRIPCIONES_CERRADAS', 'EN_CURSO'].includes(e.estado)
  );
  const eventosRechazados = eventos.filter(e => e.estado === 'RECHAZADO');
  const totalEventos = eventos.length;
  const totalPeleadores = eventos.reduce((acc, e) => acc + e.peleadores, 0);

  const handleAprobar = async (eventoId: string) => {
    await aprobarEvento(eventoId, user.id);
    setSuccessMessage('Evento aprobado correctamente');
    setShowSuccessAlert(true);
  };

  const handleRechazar = (eventoId: string) => {
    setSelectedEventoId(eventoId);
    setMotivoRechazo('');
    setShowRejectAlert(true);
  };

  const confirmarRechazo = async () => {
    if (selectedEventoId && motivoRechazo.trim()) {
      await rechazarEvento(selectedEventoId, motivoRechazo);
      setShowRejectAlert(false);
      setSelectedEventoId(null);
      setMotivoRechazo('');
      setSuccessMessage('Evento rechazado');
      setShowSuccessAlert(true);
    }
  };

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
            <h1 className="header-title">Super Admin</h1>
            <p className="header-subtitle">Panel de Control</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="admin-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="admin-container">
          {/* Welcome Section */}
          <div className="welcome-section fade-in">
            <div className="welcome-content">
              <h2 className="welcome-title">
                ¡Hola, <span className="gradient-text-admin">{user.nombre}!</span>
              </h2>
              <p className="welcome-subtitle">Gestiona y aprueba eventos</p>
            </div>
            <div className="welcome-decoration admin-decoration">
              <IonIcon icon={shieldCheckmarkOutline} />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid fade-in stagger-1">
            <div className="stat-card stat-card-pending">
              <div className="stat-icon-container stat-icon-warning">
                <IonIcon icon={timeOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{eventosPendientes.length}</span>
                <span className="stat-label">Pendientes</span>
              </div>
              {eventosPendientes.length > 0 && (
                <div className="stat-alert pulse-glow"></div>
              )}
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-success">
                <IonIcon icon={checkmarkCircleOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{eventosAprobados.length}</span>
                <span className="stat-label">Aprobados</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-primary">
                <IonIcon icon={calendarOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{totalEventos}</span>
                <span className="stat-label">Total Eventos</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-secondary">
                <IonIcon icon={peopleOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{totalPeleadores}</span>
                <span className="stat-label">Peleadores</span>
              </div>
            </div>
          </div>

          {/* Eventos Pendientes de Aprobación */}
          <div className="section-header fade-in stagger-2">
            <div className="section-title-wrapper">
              <div className="section-icon-wrapper section-icon-warning">
                <IonIcon icon={alertCircleOutline} />
              </div>
              <div>
                <h2>Pendientes de Aprobación</h2>
                <p className="section-subtitle">{eventosPendientes.length} eventos esperando revisión</p>
              </div>
            </div>
          </div>

          <div className="pending-events-list">
            {eventosPendientes.length === 0 ? (
              <div className="empty-card fade-in">
                <IonIcon icon={checkmarkCircleOutline} />
                <p>No hay eventos pendientes de aprobación</p>
                <span className="empty-subtitle">¡Todo al día!</span>
              </div>
            ) : (
              eventosPendientes.map((evento, index) => (
                <IonCard 
                  key={evento.id} 
                  className={`pending-event-card fade-in stagger-${index + 1}`}
                >
                  <IonCardContent className="pending-event-content">
                    <div className="pending-event-header">
                      <div className="pending-event-info">
                        <h3>{evento.nombre}</h3>
                        <p className="promotor-name">{evento.promotorNombre}</p>
                      </div>
                      <IonBadge className="pending-badge">
                        <IonIcon icon={timeOutline} />
                        Pendiente
                      </IonBadge>
                    </div>

                    <p className="event-description">{evento.descripcion}</p>

                    <div className="pending-event-details">
                      <div className="event-detail">
                        <IonIcon icon={calendarOutline} />
                        <span>{formatFecha(evento.fecha)}</span>
                      </div>
                      <div className="event-detail">
                        <IonIcon icon={locationOutline} />
                        <span>{evento.ciudad}, {evento.pais}</span>
                      </div>
                      <div className="event-detail">
                        <IonIcon icon={statsChartOutline} />
                        <span>{evento.categorias.length} categorías</span>
                      </div>
                    </div>

                    <div className="categorias-preview">
                      {evento.categorias.slice(0, 3).map(cat => (
                        <span key={cat.id} className="categoria-chip">
                          {cat.nombre} ({cat.modalidad})
                        </span>
                      ))}
                      {evento.categorias.length > 3 && (
                        <span className="categoria-chip more">
                          +{evento.categorias.length - 3} más
                        </span>
                      )}
                    </div>

                    <div className="pending-event-actions">
                      <IonButton 
                        expand="block" 
                        className="approve-btn"
                        onClick={() => handleAprobar(evento.id)}
                      >
                        <IonIcon icon={checkmarkCircleOutline} slot="start" />
                        Aprobar
                      </IonButton>
                      <IonButton 
                        expand="block" 
                        fill="outline"
                        className="reject-btn"
                        onClick={() => handleRechazar(evento.id)}
                      >
                        <IonIcon icon={closeCircleOutline} slot="start" />
                        Rechazar
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))
            )}
          </div>

          {/* Eventos Rechazados */}
          {eventosRechazados.length > 0 && (
            <>
              <div className="section-header fade-in stagger-3">
                <div className="section-title-wrapper">
                  <div className="section-icon-wrapper section-icon-danger">
                    <IonIcon icon={closeCircleOutline} />
                  </div>
                  <div>
                    <h2>Rechazados</h2>
                    <p className="section-subtitle">{eventosRechazados.length} eventos rechazados</p>
                  </div>
                </div>
              </div>

              <div className="rejected-events-list">
                {eventosRechazados.map((evento, index) => (
                  <IonCard key={evento.id} className={`rejected-event-card fade-in stagger-${index + 1}`}>
                    <IonCardContent>
                      <div className="rejected-event-info">
                        <div>
                          <h4>{evento.nombre}</h4>
                          <p>{evento.promotorNombre} • {formatFecha(evento.fecha)}</p>
                        </div>
                        <IonBadge color="danger">Rechazado</IonBadge>
                      </div>
                      {evento.motivoRechazo && (
                        <div className="rechazo-motivo">
                          <strong>Motivo:</strong> {evento.motivoRechazo}
                        </div>
                      )}
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </>
          )}

          {/* Acciones rápidas */}
          <div className="quick-actions-section fade-in">
            <IonButton expand="block" className="action-button-primary" onClick={() => history.push('/admin/eventos')}>
              <IonIcon icon={eyeOutline} slot="start" />
              Ver Todos los Eventos
            </IonButton>
            <div className="action-buttons-row">
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/rankings')}>
                <IonIcon icon={trophyOutline} slot="start" />
                Rankings
              </IonButton>
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/peleadores')}>
                <IonIcon icon={peopleOutline} slot="start" />
                Peleadores
              </IonButton>
            </div>
          </div>
        </div>

        {/* Alert de Rechazo */}
        <IonAlert
          isOpen={showRejectAlert}
          onDidDismiss={() => setShowRejectAlert(false)}
          header="Rechazar Evento"
          message="Por favor, indica el motivo del rechazo:"
          inputs={[
            {
              name: 'motivo',
              type: 'textarea',
              placeholder: 'Escribe el motivo del rechazo...',
              value: motivoRechazo,
            },
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Rechazar',
              handler: (data) => {
                setMotivoRechazo(data.motivo);
                if (data.motivo?.trim()) {
                  confirmarRechazo();
                }
              },
            },
          ]}
        />

        {/* Alert de Éxito */}
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => setShowSuccessAlert(false)}
          header="Éxito"
          message={successMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default DashboardAdmin;

