import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonChip,
} from '@ionic/react';
import { 
  calendarOutline, 
  locationOutline, 
  peopleOutline,
  menuOutline,
  timeOutline,
  sparklesOutline,
} from 'ionicons/icons';
import { mockEventos } from '@/data/mockData';
import './Eventos.css';

const Eventos: React.FC = () => {
  const sortedEventos = [...mockEventos].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  const isEventoPasado = (fecha: string) => {
    return new Date(fecha) < new Date();
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return {
      dia: date.getDate(),
      mes: date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
      completa: date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    };
  };

  const getDaysUntil = (fecha: string) => {
    const diff = new Date(fecha).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Mañana';
    if (days < 0) return 'Finalizado';
    return `En ${days} días`;
  };

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
            <h1 className="header-title">Eventos</h1>
            <p className="header-subtitle">{sortedEventos.length} próximos</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="eventos-content">
        <div className="eventos-container">
          {/* Próximos eventos destacados */}
          <div className="section-label fade-in">
            <IonIcon icon={sparklesOutline} />
            <span>Próximos Eventos</span>
          </div>

          {sortedEventos.map((evento, index) => {
            const pasado = isEventoPasado(evento.fecha);
            const fechaInfo = formatFecha(evento.fecha);
            const daysUntil = getDaysUntil(evento.fecha);

            return (
              <IonCard 
                key={evento.id} 
                className={`evento-card fade-in stagger-${(index % 6) + 1} ${pasado ? 'evento-pasado' : ''}`}
                button
              >
                <div className="evento-layout">
                  {/* Fecha destacada */}
                  <div className="evento-date-badge">
                    <span className="evento-date-day">{fechaInfo.dia}</span>
                    <span className="evento-date-month">{fechaInfo.mes}</span>
                    {!pasado && (
                      <div className="evento-countdown">
                        <IonIcon icon={timeOutline} />
                        <span>{daysUntil}</span>
                      </div>
                    )}
                  </div>

                  <IonCardContent className="evento-content">
                    <div className="evento-header">
                      <h2 className="evento-title">{evento.nombre}</h2>
                      {!pasado ? (
                        <IonBadge className="evento-badge-active">Próximo</IonBadge>
                      ) : (
                        <IonBadge className="evento-badge-past">Pasado</IonBadge>
                      )}
                    </div>

                    <div className="evento-info-grid">
                      <div className="evento-info-item">
                        <IonIcon icon={locationOutline} />
                        <span>{evento.ciudad}, {evento.pais}</span>
                      </div>
                      <div className="evento-info-item">
                        <IonIcon icon={peopleOutline} />
                        <span>{evento.peleadores} participantes</span>
                      </div>
                    </div>

                    <div className="evento-footer">
                      <IonChip className="evento-promotor-chip">
                        {evento.promotorNombre}
                      </IonChip>
                    </div>
                  </IonCardContent>
                </div>
              </IonCard>
            );
          })}

          {sortedEventos.length === 0 && (
            <div className="no-results fade-in">
              <div className="no-results-icon-wrapper">
                <IonIcon icon={calendarOutline} />
              </div>
              <h3>No hay eventos programados</h3>
              <p>Vuelve más tarde para ver nuevos eventos</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Eventos;
