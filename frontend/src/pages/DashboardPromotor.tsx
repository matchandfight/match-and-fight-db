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
  IonFab,
  IonFabButton,
} from '@ionic/react';
import {
  calendarOutline,
  peopleOutline,
  trophyOutline,
  addOutline,
  menuOutline,
  sparklesOutline,
  statsChartOutline,
  checkmarkCircleOutline,
  timeOutline,
  arrowForwardOutline,
  megaphoneOutline,
} from 'ionicons/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useEventosStore } from '@/store/eventosStore';
import './DashboardPromotor.css';

const DashboardPromotor: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { fetchEventos, getEventosByPromotor } = useEventosStore();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'PROMOTOR') {
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

  const misEventos = getEventosByPromotor(user.id);
  const eventosActivos = misEventos.filter(e => 
    ['PUBLICADO', 'INSCRIPCIONES_ABIERTAS', 'INSCRIPCIONES_CERRADAS', 'EN_CURSO'].includes(e.estado)
  );
  const eventosBorrador = misEventos.filter(e => e.estado === 'BORRADOR');
  const eventosFinalizados = misEventos.filter(e => e.estado === 'FINALIZADO');
  const totalInscritos = misEventos.reduce((acc, e) => acc + e.peleadores, 0);

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'BORRADOR':
        return { color: 'medium', text: 'Borrador' };
      case 'PENDIENTE_APROBACION':
        return { color: 'warning', text: 'Pendiente Aprobación' };
      case 'RECHAZADO':
        return { color: 'danger', text: 'Rechazado' };
      case 'PUBLICADO':
        return { color: 'primary', text: 'Publicado' };
      case 'INSCRIPCIONES_ABIERTAS':
        return { color: 'success', text: 'Inscripciones Abiertas' };
      case 'INSCRIPCIONES_CERRADAS':
        return { color: 'warning', text: 'Inscripciones Cerradas' };
      case 'EN_CURSO':
        return { color: 'tertiary', text: 'En Curso' };
      case 'FINALIZADO':
        return { color: 'dark', text: 'Finalizado' };
      default:
        return { color: 'medium', text: estado };
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
            <h1 className="header-title">Panel Promotor</h1>
            <p className="header-subtitle">{user.promotoraNombre || 'Mi Promotora'}</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="promotor-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="promotor-container">
          {/* Welcome Section */}
          <div className="welcome-section fade-in">
            <div className="welcome-content">
              <h2 className="welcome-title">
                ¡Hola, <span className="gradient-text">{user.nombre}!</span>
              </h2>
              <p className="welcome-subtitle">Gestiona tus eventos y resultados</p>
            </div>
            <div className="welcome-decoration promotor-decoration">
              <IonIcon icon={megaphoneOutline} />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid fade-in stagger-1">
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-primary">
                <IonIcon icon={calendarOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{misEventos.length}</span>
                <span className="stat-label">Eventos Totales</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-success">
                <IonIcon icon={checkmarkCircleOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{eventosActivos.length}</span>
                <span className="stat-label">Activos</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-secondary">
                <IonIcon icon={peopleOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{totalInscritos}</span>
                <span className="stat-label">Inscritos</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-container stat-icon-warning">
                <IonIcon icon={trophyOutline} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{eventosFinalizados.length}</span>
                <span className="stat-label">Finalizados</span>
              </div>
            </div>
          </div>

          {/* Eventos Activos */}
          <div className="section-header fade-in stagger-2">
            <div className="section-title-wrapper">
              <div className="section-icon-wrapper">
                <IonIcon icon={sparklesOutline} />
              </div>
              <div>
                <h2>Eventos Activos</h2>
                <p className="section-subtitle">Gestiona tus eventos en curso</p>
              </div>
            </div>
            <IonButton fill="clear" size="small" className="section-action" onClick={() => history.push('/promotor/eventos')}>
              Ver todos
              <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div className="eventos-list">
            {eventosActivos.length === 0 ? (
              <div className="empty-card fade-in">
                <IonIcon icon={calendarOutline} />
                <p>No tienes eventos activos</p>
                <IonButton size="small" onClick={() => history.push('/promotor/eventos/nuevo')}>
                  Crear Evento
                </IonButton>
              </div>
            ) : (
              eventosActivos.slice(0, 3).map((evento, index) => {
                const badge = getEstadoBadge(evento.estado);
                return (
                  <IonCard 
                    key={evento.id} 
                    className={`evento-card-promotor fade-in stagger-${index + 1}`}
                    button
                    onClick={() => history.push(`/promotor/eventos/${evento.id}`)}
                  >
                    <IonCardContent className="evento-card-content">
                      <div className="evento-card-header">
                        <div className="evento-card-info">
                          <h3>{evento.nombre}</h3>
                          <p className="evento-card-location">
                            {evento.ciudad}, {evento.pais}
                          </p>
                        </div>
                        <IonBadge className={`evento-estado-badge estado-${evento.estado.toLowerCase()}`}>
                          {badge.text}
                        </IonBadge>
                      </div>

                      <div className="evento-card-details">
                        <div className="evento-detail">
                          <IonIcon icon={calendarOutline} />
                          <span>{formatFecha(evento.fecha)}</span>
                        </div>
                        <div className="evento-detail">
                          <IonIcon icon={peopleOutline} />
                          <span>{evento.peleadores} inscritos</span>
                        </div>
                        <div className="evento-detail">
                          <IonIcon icon={statsChartOutline} />
                          <span>{evento.categorias.length} categorías</span>
                        </div>
                      </div>

                      {evento.estado === 'INSCRIPCIONES_ABIERTAS' && evento.fechaLimiteInscripcion && (
                        <div className="evento-deadline">
                          <IonIcon icon={timeOutline} />
                          <span>Cierra: {formatFecha(evento.fechaLimiteInscripcion)}</span>
                        </div>
                      )}
                    </IonCardContent>
                  </IonCard>
                );
              })
            )}
          </div>

          {/* Borradores */}
          {eventosBorrador.length > 0 && (
            <>
              <div className="section-header fade-in stagger-3">
                <div className="section-title-wrapper">
                  <div className="section-icon-wrapper section-icon-warning">
                    <IonIcon icon={timeOutline} />
                  </div>
                  <div>
                    <h2>Borradores</h2>
                    <p className="section-subtitle">Eventos pendientes de publicar</p>
                  </div>
                </div>
              </div>

              <div className="borradores-list">
                {eventosBorrador.map((evento, index) => (
                  <IonCard 
                    key={evento.id} 
                    className={`borrador-card fade-in stagger-${index + 1}`}
                    button
                    onClick={() => history.push(`/promotor/eventos/${evento.id}`)}
                  >
                    <IonCardContent>
                      <div className="borrador-info">
                        <h4>{evento.nombre}</h4>
                        <p>{evento.ciudad} - {formatFecha(evento.fecha)}</p>
                      </div>
                      <IonButton fill="outline" size="small">
                        Editar
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </>
          )}

          {/* Acciones rápidas */}
          <div className="quick-actions-section fade-in">
            <IonButton expand="block" className="action-button-primary" onClick={() => history.push('/promotor/eventos/nuevo')}>
              <IonIcon icon={addOutline} slot="start" />
              Crear Nuevo Evento
            </IonButton>
            <div className="action-buttons-row">
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/promotor/eventos')}>
                <IonIcon icon={calendarOutline} slot="start" />
                Mis Eventos
              </IonButton>
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/promotor/resultados')}>
                <IonIcon icon={trophyOutline} slot="start" />
                Resultados
              </IonButton>
            </div>
          </div>
        </div>

        {/* FAB para crear evento */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/promotor/eventos/nuevo')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPromotor;

