import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonLabel,
  IonBadge,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent,
  IonToast,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  calendarOutline,
  locationOutline,
  menuOutline,
  statsChartOutline,
  scaleOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useOfertasStore } from '@/store/ofertasStore';
import { useHistory } from 'react-router-dom';
import './Ofertas.css';

const Ofertas: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { ofertas, fetchOfertas, acceptOferta, rejectOferta } = useOfertasStore();
  const [selectedSegment, setSelectedSegment] = useState<string>('pendientes');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }

    if (user?.peleadorId) {
      fetchOfertas(user.peleadorId);
    }
  }, [user, isAuthenticated, history, fetchOfertas]);

  const handleRefresh = async (event: CustomEvent) => {
    if (user?.peleadorId) {
      await fetchOfertas(user.peleadorId);
    }
    event.detail.complete();
  };

  const handleAccept = async (ofertaId: string) => {
    await acceptOferta(ofertaId);
    setToastMessage('¡Oferta aceptada!');
    setShowToast(true);
  };

  const handleReject = async (ofertaId: string) => {
    await rejectOferta(ofertaId);
    setToastMessage('Oferta rechazada');
    setShowToast(true);
  };

  const pendientes = ofertas.filter((o) => o.estado === 'PENDIENTE');
  const aceptadas = ofertas.filter((o) => o.estado === 'ACEPTADA');
  const rechazadas = ofertas.filter((o) => o.estado === 'RECHAZADA');

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const renderOfertas = () => {
    let ofertasFiltradas = [];
    if (selectedSegment === 'pendientes') ofertasFiltradas = pendientes;
    else if (selectedSegment === 'aceptadas') ofertasFiltradas = aceptadas;
    else ofertasFiltradas = rechazadas;

    if (ofertasFiltradas.length === 0) {
      return (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">
            <IonIcon icon={statsChartOutline} />
          </div>
          <h3>No hay ofertas {selectedSegment}</h3>
          <p>Las nuevas ofertas aparecerán aquí</p>
        </div>
      );
    }

    return ofertasFiltradas.map((oferta, index) => (
      <IonCard key={oferta.id} className={`oferta-card fade-in stagger-${(index % 6) + 1}`}>
        <IonCardContent className="oferta-content">
          <div className="oferta-header">
            <div className="oferta-promotor">
              <h3>{oferta.promotor}</h3>
              <IonBadge className={`oferta-estado oferta-estado-${oferta.estado.toLowerCase()}`}>
                {oferta.estado}
              </IonBadge>
            </div>
            {oferta.bolsa && (
              <div className="oferta-bolsa">
                <span className="bolsa-amount">{oferta.bolsa}€</span>
                <span className="bolsa-label">Bolsa</span>
              </div>
            )}
          </div>

          <div className="oferta-details">
            <div className="oferta-detail-item">
              <div className="detail-icon">
                <IonIcon icon={calendarOutline} />
              </div>
              <div className="detail-info">
                <span className="detail-label">Fecha</span>
                <span className="detail-value">{formatFecha(oferta.fecha)}</span>
              </div>
            </div>

            <div className="oferta-detail-item">
              <div className="detail-icon">
                <IonIcon icon={locationOutline} />
              </div>
              <div className="detail-info">
                <span className="detail-label">Ubicación</span>
                <span className="detail-value">{oferta.ciudad}</span>
              </div>
            </div>

            <div className="oferta-detail-item">
              <div className="detail-icon">
                <IonIcon icon={scaleOutline} />
              </div>
              <div className="detail-info">
                <span className="detail-label">Peso</span>
                <span className="detail-value">{oferta.peso}</span>
              </div>
            </div>
          </div>

          {oferta.estado === 'PENDIENTE' && (
            <div className="oferta-actions">
              <IonButton
                expand="block"
                className="accept-btn"
                onClick={() => handleAccept(oferta.id)}
              >
                <IonIcon icon={checkmarkCircleOutline} slot="start" />
                Aceptar
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                className="reject-btn"
                onClick={() => handleReject(oferta.id)}
              >
                <IonIcon icon={closeCircleOutline} slot="start" />
                Rechazar
              </IonButton>
            </div>
          )}
        </IonCardContent>
      </IonCard>
    ));
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
            <h1 className="header-title">Mis Ofertas</h1>
            <p className="header-subtitle">{ofertas.length} total</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ofertas-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <div className="ofertas-container">
          {/* Segment moderno */}
          <div className="segment-wrapper fade-in">
            <IonSegment
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(String(e.detail.value))}
              className="segment-custom"
            >
              <IonSegmentButton value="pendientes">
                <IonLabel>
                  Pendientes
                  {pendientes.length > 0 && (
                    <IonBadge className="segment-badge">{pendientes.length}</IonBadge>
                  )}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="aceptadas">
                <IonLabel>Aceptadas</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="rechazadas">
                <IonLabel>Rechazadas</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          <div className="ofertas-list">
            {renderOfertas()}
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
          cssClass="custom-toast"
        />
      </IonContent>
    </IonPage>
  );
};

export default Ofertas;
