import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonRefresher,
  IonRefresherContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import {
  personOutline,
  trophyOutline,
  calendarOutline,
  statsChartOutline,
  flameOutline,
  notificationsOutline,
  eyeOutline,
  heartOutline,
  newspaperOutline,
  playCircleOutline,
  checkmarkCircleOutline,
  sparklesOutline,
  arrowForwardOutline,
  menuOutline,
} from 'ionicons/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useOfertasStore } from '@/store/ofertasStore';
import { usePeleadoresStore } from '@/store/peleadoresStore';
import { mockHighlights, mockNoticias } from '@/data/mockData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { ofertas, fetchOfertas } = useOfertasStore();
  const { getPeleadorById } = usePeleadoresStore();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }

    if (user?.rol === 'ATLETA' && user.peleadorId) {
      fetchOfertas(user.peleadorId);
    }
  }, [isAuthenticated, user, history, fetchOfertas]);

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      if (user?.rol === 'ATLETA' && user.peleadorId) {
        fetchOfertas(user.peleadorId);
      }
      event.detail.complete();
    }, 1000);
  };

  if (!user) return null;

  const peleador = user.peleadorId ? getPeleadorById(user.peleadorId) : null;
  const ofertasPendientes = ofertas.filter((o) => o.estado === 'PENDIENTE');

  const getHighlightIcon = (tipo: string) => {
    switch (tipo) {
      case 'KO':
        return flameOutline;
      case 'CAMPEONATO':
        return trophyOutline;
      case 'RACHA':
        return statsChartOutline;
      default:
        return playCircleOutline;
    }
  };

  const getHighlightColor = (tipo: string) => {
    switch (tipo) {
      case 'KO':
        return 'danger';
      case 'CAMPEONATO':
        return 'warning';
      case 'RACHA':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'EVENTO':
        return 'primary';
      case 'RESULTADO':
        return 'success';
      case 'RANKING':
        return 'warning';
      case 'ENTREVISTA':
        return 'tertiary';
      default:
        return 'medium';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    const ahora = new Date();
    const diff = ahora.getTime() - date.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <IonPage>
      {/* Header moderno con menú hamburguesa */}
      <IonHeader className="modern-header">
        <div className="header-blur-bg"></div>
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="menu-toggle-btn">
              <IonIcon icon={menuOutline} />
            </IonMenuButton>
          </IonButtons>
          
          <div className="header-title-section">
            <h1 className="header-title">Dashboard</h1>
            <p className="header-subtitle">Bienvenido de vuelta</p>
          </div>

          <IonButtons slot="end">
            <IonButton className="header-action-btn" onClick={() => history.push('/ofertas')}>
              <IonIcon icon={notificationsOutline} />
              {ofertasPendientes.length > 0 && (
                <IonBadge className="header-notification-badge">{ofertasPendientes.length}</IonBadge>
              )}
            </IonButton>
            {peleador && (
              <IonAvatar className="header-avatar">
                <img src={peleador.fotoUrl} alt={user.nombre} />
              </IonAvatar>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="dashboard-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="dashboard-container">
          {/* Saludo con gradiente */}
          <div className="welcome-section fade-in">
            <div className="welcome-content">
              <h2 className="welcome-title">
                ¡Hola, <span className="gradient-text">{user.nombre}!</span>
              </h2>
              <p className="welcome-subtitle">Estas son tus estadísticas de hoy</p>
            </div>
            <div className="welcome-decoration">
              <IonIcon icon={sparklesOutline} />
            </div>
          </div>

          {/* Estadísticas rápidas mejoradas */}
          {user.rol === 'ATLETA' && peleador && (
            <div className="stats-grid fade-in stagger-1">
              <div className="stat-card stat-card-elo">
                <div className="stat-icon-container stat-icon-primary">
                  <IonIcon icon={flameOutline} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{peleador.puntuacionElo}</span>
                  <span className="stat-label">Puntos ELO</span>
                </div>
                <div className="stat-trend stat-trend-up">+12</div>
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
              
              <div className="stat-card stat-card-fights">
                <div className="stat-icon-container stat-icon-secondary">
                  <IonIcon icon={statsChartOutline} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{peleador.record.combates}</span>
                  <span className="stat-label">Combates</span>
                </div>
              </div>
              
              <div className="stat-card stat-card-offers">
                <div className="stat-icon-container stat-icon-warning">
                  <IonIcon icon={calendarOutline} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{ofertasPendientes.length}</span>
                  <span className="stat-label">Ofertas</span>
                </div>
                {ofertasPendientes.length > 0 && (
                  <div className="stat-badge-new pulse-glow">New</div>
                )}
              </div>
            </div>
          )}

          {/* Highlights - Momentos destacados */}
          <div className="section-header fade-in stagger-2">
            <div className="section-title-wrapper">
              <div className="section-icon-wrapper">
                <IonIcon icon={playCircleOutline} />
              </div>
              <div>
                <h2>Highlights</h2>
                <p className="section-subtitle">Momentos destacados</p>
              </div>
            </div>
            <IonButton fill="clear" size="small" className="section-action" onClick={() => history.push('/rankings')}>
              Ver todos
              <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div className="highlights-scroll fade-in stagger-3">
            {mockHighlights.slice(0, 3).map((highlight, index) => (
              <IonCard key={highlight.id} className={`highlight-card stagger-${index + 1}`} button>
                <div className="highlight-image-wrapper">
                  <img src={highlight.imagenUrl} alt={highlight.titulo} className="highlight-image" />
                  <div className="highlight-overlay"></div>
                  
                  <IonBadge className={`highlight-badge highlight-badge-${highlight.tipo.toLowerCase()}`} color={getHighlightColor(highlight.tipo)}>
                    <IonIcon icon={getHighlightIcon(highlight.tipo)} />
                    <span>{highlight.tipo}</span>
                  </IonBadge>

                  <div className="highlight-stats">
                    <div className="highlight-stat">
                      <IonIcon icon={eyeOutline} />
                      <span>{formatViews(highlight.views)}</span>
                    </div>
                    <div className="highlight-stat">
                      <IonIcon icon={heartOutline} />
                      <span>{formatViews(highlight.likes)}</span>
                    </div>
                  </div>
                </div>

                <IonCardContent className="highlight-content">
                  <div className="highlight-peleador">
                    <IonAvatar className="highlight-avatar">
                      <img src={highlight.peleadorFoto} alt={highlight.peleador} />
                    </IonAvatar>
                    <div>
                      <h3>{highlight.titulo}</h3>
                      <p className="highlight-peleador-nombre">{highlight.peleador}</p>
                    </div>
                  </div>
                  <p className="highlight-descripcion">{highlight.descripcion}</p>
                  <div className="highlight-footer">
                    <span className="highlight-fecha">{formatFecha(highlight.fecha)}</span>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Noticias - Feed de eventos */}
          <div className="section-header fade-in stagger-4">
            <div className="section-title-wrapper">
              <div className="section-icon-wrapper section-icon-news">
                <IonIcon icon={newspaperOutline} />
              </div>
              <div>
                <h2>Últimas Noticias</h2>
                <p className="section-subtitle">Mantente al día</p>
              </div>
            </div>
            <IonButton fill="clear" size="small" className="section-action" onClick={() => history.push('/eventos')}>
              Ver todas
              <IonIcon icon={arrowForwardOutline} slot="end" />
            </IonButton>
          </div>

          <div className="noticias-list">
            {mockNoticias.slice(0, 5).map((noticia, index) => (
              <IonCard key={noticia.id} className={`noticia-card fade-in stagger-${index + 1}`} button>
                <div className="noticia-layout">
                  <div className="noticia-image-container">
                    <img src={noticia.imagenUrl} alt={noticia.titulo} className="noticia-image" />
                    <IonBadge className="noticia-categoria-badge" color={getCategoriaColor(noticia.categoria)}>
                      {noticia.categoria}
                    </IonBadge>
                  </div>

                  <IonCardContent className="noticia-content">
                    <div className="noticia-header">
                      <h3>{noticia.titulo}</h3>
                      {!noticia.leido && (
                        <div className="noticia-unread-dot"></div>
                      )}
                    </div>
                    <p className="noticia-descripcion">{noticia.descripcion}</p>
                    <div className="noticia-meta">
                      <span className="noticia-autor">{noticia.autor}</span>
                      <span className="noticia-separator">•</span>
                      <span className="noticia-fecha">{formatFecha(noticia.fecha)}</span>
                      {noticia.leido && (
                        <>
                          <span className="noticia-separator">•</span>
                          <IonIcon icon={checkmarkCircleOutline} className="noticia-leido-icon" />
                        </>
                      )}
                    </div>
                  </IonCardContent>
                </div>
              </IonCard>
            ))}
          </div>

          {/* Acciones rápidas */}
          <div className="quick-actions-section fade-in">
            <IonButton expand="block" className="action-button-primary" onClick={() => history.push('/rankings')}>
              <IonIcon icon={trophyOutline} slot="start" />
              Ver Rankings Completos
            </IonButton>
            <div className="action-buttons-row">
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/peleadores')}>
                <IonIcon icon={personOutline} slot="start" />
                Peleadores
              </IonButton>
              <IonButton expand="block" fill="outline" className="action-button-secondary" onClick={() => history.push('/eventos')}>
                <IonIcon icon={calendarOutline} slot="start" />
                Eventos
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
