import { 
  IonApp, 
  IonRouterOutlet, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonMenuToggle,
  IonAvatar,
  IonBadge,
  setupIonicReact 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { 
  trophyOutline, 
  peopleOutline, 
  calendarOutline, 
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  statsChartOutline,
  notificationsOutline,
  gridOutline,
  megaphoneOutline,
  briefcaseOutline,
  addCircleOutline,
  listOutline,
  personOutline,
  createOutline,
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

// Páginas comunes
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Peleadores from './pages/Peleadores';
import PeleadorDetalle from './pages/PeleadorDetalle';
import Rankings from './pages/Rankings';
import Eventos from './pages/Eventos';

// Dashboards por rol
import DashboardPromotor from './pages/DashboardPromotor';
import DashboardManager from './pages/DashboardManager';
import DashboardPeleador from './pages/DashboardPeleador';
import DashboardAdmin from './pages/DashboardAdmin';

// Store
import { useAuthStore } from './store/authStore';
import { usePeleadoresStore } from './store/peleadoresStore';

// Styles
import './theme/modern-menu.css';

setupIonicReact({
  mode: 'ios'
});

// Tipos de menú por rol
interface MenuItemProps {
  title: string;
  path: string;
  icon: string;
  badge?: number;
}

// Menú para PROMOTOR
const menuItemsPromotor: MenuItemProps[] = [
  { title: 'Dashboard', path: '/dashboard', icon: gridOutline },
  { title: 'Mis Eventos', path: '/promotor/eventos', icon: calendarOutline },
  { title: 'Crear Evento', path: '/promotor/eventos/nuevo', icon: addCircleOutline },
  { title: 'Resultados', path: '/promotor/resultados', icon: trophyOutline },
  { title: 'Rankings', path: '/rankings', icon: statsChartOutline },
  { title: 'Peleadores', path: '/peleadores', icon: peopleOutline },
];

// Menú para MANAGER
const menuItemsManager: MenuItemProps[] = [
  { title: 'Dashboard', path: '/dashboard', icon: gridOutline },
  { title: 'Mis Peleadores', path: '/manager/peleadores', icon: peopleOutline },
  { title: 'Eventos', path: '/manager/eventos', icon: calendarOutline },
  { title: 'Inscripciones', path: '/manager/inscripciones', icon: listOutline },
  { title: 'Rankings', path: '/rankings', icon: trophyOutline },
];

// Menú para ATLETA
const menuItemsAtleta: MenuItemProps[] = [
  { title: 'Mi Perfil', path: '/dashboard', icon: personOutline },
  { title: 'Editar Perfil', path: '/peleador/editar-perfil', icon: createOutline },
  { title: 'Rankings', path: '/rankings', icon: trophyOutline },
  { title: 'Eventos', path: '/eventos', icon: calendarOutline },
  { title: 'Peleadores', path: '/peleadores', icon: peopleOutline },
];

// Menú para SUPER_ADMIN
const menuItemsAdmin: MenuItemProps[] = [
  { title: 'Dashboard', path: '/dashboard', icon: gridOutline },
  { title: 'Aprobar Eventos', path: '/admin/aprobar', icon: checkmarkCircleOutline },
  { title: 'Todos los Eventos', path: '/admin/eventos', icon: calendarOutline },
  { title: 'Rankings', path: '/rankings', icon: trophyOutline },
  { title: 'Peleadores', path: '/peleadores', icon: peopleOutline },
  { title: 'Promotores', path: '/admin/promotores', icon: megaphoneOutline },
];

const SideMenu: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { getPeleadorById } = usePeleadoresStore();
  const peleador = user?.peleadorId ? getPeleadorById(user.peleadorId) : null;
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Seleccionar menú según rol
  const getMenuItems = () => {
    switch (user?.rol) {
      case 'SUPER_ADMIN':
        return menuItemsAdmin;
      case 'PROMOTOR':
        return menuItemsPromotor;
      case 'MANAGER':
        return menuItemsManager;
      case 'ATLETA':
        return menuItemsAtleta;
      default:
        return menuItemsAtleta;
    }
  };

  const getRoleIcon = () => {
    switch (user?.rol) {
      case 'SUPER_ADMIN':
        return shieldCheckmarkOutline;
      case 'PROMOTOR':
        return megaphoneOutline;
      case 'MANAGER':
        return briefcaseOutline;
      case 'ATLETA':
        return personCircleOutline;
      default:
        return personCircleOutline;
    }
  };

  const getRoleLabel = () => {
    switch (user?.rol) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'PROMOTOR':
        return user.promotoraNombre || 'Promotor';
      case 'MANAGER':
        return 'Manager';
      case 'ATLETA':
        return 'Atleta';
      default:
        return 'Usuario';
    }
  };

  const getUserPhoto = () => {
    if (peleador?.fotoUrl) return peleador.fotoUrl;
    if (user?.fotoUrl) return user.fotoUrl;
    return null;
  };

  const menuItems = getMenuItems();

  return (
    <IonMenu contentId="main-content" type="overlay" className="modern-menu">
      <IonContent className="menu-content">
        {/* Header del menú con perfil */}
        <div className="menu-header">
          <div className="menu-header-bg"></div>
          <div className="menu-profile">
            <div className="menu-avatar-container">
              {getUserPhoto() ? (
                <IonAvatar className="menu-avatar">
                  <img src={getUserPhoto()!} alt={user?.nombre} />
                </IonAvatar>
              ) : (
                <div className="menu-avatar-placeholder">
                  <IonIcon icon={getRoleIcon()} />
                </div>
              )}
              <div className="menu-online-indicator"></div>
            </div>
            <div className="menu-user-info">
              <h2 className="menu-user-name">{user?.nombre || 'Usuario'}</h2>
              <div className="menu-user-role">
                <IonIcon icon={getRoleIcon()} />
                <span>{getRoleLabel()}</span>
              </div>
              {peleador && (
                <div className="menu-user-elo">
                  <IonIcon icon={trophyOutline} />
                  <span>{peleador.puntuacionElo} ELO</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navegación principal */}
        <div className="menu-section">
          <p className="menu-section-title">NAVEGACIÓN</p>
          <IonList lines="none" className="menu-list">
            {menuItems.map((item) => (
              <IonMenuToggle key={item.path} autoHide={false}>
                <IonItem 
                  routerLink={item.path} 
                  routerDirection="none"
                  className={`menu-item ${location.pathname === item.path ? 'menu-item-active' : ''}`}
                  detail={false}
                >
                  <div className="menu-item-icon-wrapper">
                    <IonIcon icon={item.icon} className="menu-item-icon" />
                  </div>
                  <IonLabel className="menu-item-label">{item.title}</IonLabel>
                  {item.badge && item.badge > 0 && (
                    <IonBadge className="menu-badge">{item.badge}</IonBadge>
                  )}
                  {location.pathname === item.path && (
                    <div className="menu-item-indicator"></div>
                  )}
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </div>

        {/* Sección de configuración */}
        <div className="menu-section">
          <p className="menu-section-title">CUENTA</p>
          <IonList lines="none" className="menu-list">
            <IonMenuToggle autoHide={false}>
              <IonItem className="menu-item" detail={false}>
                <div className="menu-item-icon-wrapper">
                  <IonIcon icon={notificationsOutline} className="menu-item-icon" />
                </div>
                <IonLabel className="menu-item-label">Notificaciones</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem className="menu-item" detail={false}>
                <div className="menu-item-icon-wrapper">
                  <IonIcon icon={settingsOutline} className="menu-item-icon" />
                </div>
                <IonLabel className="menu-item-label">Configuración</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="menu-footer">
          <IonMenuToggle autoHide={false}>
            <button className="menu-logout-btn" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
              <span>Cerrar Sesión</span>
            </button>
          </IonMenuToggle>
        </div>
      </IonContent>
    </IonMenu>
  );
};

// Dashboard según rol
const RoleDashboard: React.FC = () => {
  const { user } = useAuthStore();
  
  switch (user?.rol) {
    case 'SUPER_ADMIN':
      return <DashboardAdmin />;
    case 'PROMOTOR':
      return <DashboardPromotor />;
    case 'MANAGER':
      return <DashboardManager />;
    case 'ATLETA':
      return <DashboardPeleador />;
    default:
      return <DashboardPeleador />;
  }
};

const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonRouterOutlet id="main-content">
        {/* Dashboard dinámico según rol */}
        <Route exact path="/dashboard">
          <RoleDashboard />
        </Route>
        
        {/* Rutas comunes */}
        <Route exact path="/peleadores">
          <Peleadores />
        </Route>
        <Route exact path="/peleadores/:id">
          <PeleadorDetalle />
        </Route>
        <Route exact path="/rankings">
          <Rankings />
        </Route>
        <Route exact path="/eventos">
          <Eventos />
        </Route>
        
        {/* Rutas de Promotor */}
        <Route exact path="/promotor/eventos">
          <Eventos />
        </Route>
        <Route exact path="/promotor/eventos/nuevo">
          <Eventos />
        </Route>
        <Route exact path="/promotor/eventos/:id">
          <Eventos />
        </Route>
        <Route exact path="/promotor/resultados">
          <Rankings />
        </Route>
        
        {/* Rutas de Manager */}
        <Route exact path="/manager/peleadores">
          <Peleadores />
        </Route>
        <Route exact path="/manager/eventos">
          <Eventos />
        </Route>
        <Route exact path="/manager/eventos/:id">
          <Eventos />
        </Route>
        <Route exact path="/manager/inscripciones">
          <Eventos />
        </Route>
        
        {/* Rutas de Peleador */}
        <Route exact path="/peleador/editar-perfil">
          <DashboardPeleador />
        </Route>
        
        {/* Rutas de Super Admin */}
        <Route exact path="/admin/aprobar">
          <DashboardAdmin />
        </Route>
        <Route exact path="/admin/eventos">
          <Eventos />
        </Route>
        <Route exact path="/admin/promotores">
          <Peleadores />
        </Route>
        
        {/* Redirección por defecto */}
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};

const UnauthenticatedApp: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </IonRouterOutlet>
  );
};

const App: React.FC = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <IonApp>
      <IonReactRouter basename={import.meta.env.BASE_URL}>
        {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
