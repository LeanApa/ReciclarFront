import React from 'react';
import {
  IonApp,
  IonPage,
  setupIonicReact,
  IonContent
} from '@ionic/react';
import {AppNavigation} from "./navigation"
import {IonReactRouter} from "@ionic/react-router"
import {Route, Redirect, Switch} from 'react-router-dom'

import { useStorage } from "./pages/Componentes/Context/useStorage";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import ListadoInicio from './pages/Componentes/ListadoInicio';
import ListadoOng from './pages/Componentes/ListadoOng';
import ListadoLogIn from './pages/Componentes/ListLogIn';
import ListadoPerfil from './pages/Componentes/ListPerfil';
import UsuarioDetail from './pages/Componentes/DetalleUsuario/EmpresaDetail';
import ListadoChat from './pages/Componentes/Chat/ListadoChat';
import ListadoPlanillaVerde from './pages/Componentes/ListadoPlanillaVerde';
import ListadoReciclables from './pages/Componentes/ListadoReciclables';
import ListadoReciclablesContacto from './pages/Componentes/ListadoReciclablesContacto';

import Menu from './pages/Componentes/BarraMenu/Menu'
import NavBar from './pages/Componentes/BarraMenu/NavBar';
import { IonSplitPane, IonRouterOutlet } from '@ionic/react';

import AppContextProvider from './pages/Componentes/Context/Context';

setupIonicReact();

const App: React.FC = () => (
  <IonApp> 
    <AppContextProvider>
    <IonReactRouter>
      <Menu />
      
      <IonSplitPane contentId="main">
        
        <IonRouterOutlet id="main">
          <IonPage id="main-content" >
            <NavBar />
            <IonContent className="ion-padding" >
              <Route exact path="/" component={ListadoInicio}/>
              <Route exact path="/ONG" component={ListadoOng}/>
              <Route exact path="/ONG/:id" component={UsuarioDetail}/>
              <Route exact path="/LogIn" component={ListadoLogIn}/>
              <Route exact path="/misChats" component={ListadoChat}/>
              <Route exact path="/misChats/:id" component={ListadoChat}/>
              <Route exact path="/Perfil" component={ListadoPerfil}/>
              <Route exact path="/Perfil/PlanillaVerde" component={ListadoPlanillaVerde}/>
              <Route exact path="/Perfil/Reciclables" component={ListadoReciclables}/>
              <Route exact path="/Perfil/Reciclables/:id" component={ListadoReciclablesContacto}/>
            </IonContent>
          </IonPage>
        </IonRouterOutlet>
        
      </IonSplitPane>
    </IonReactRouter>
    </AppContextProvider>
  </IonApp>
);

export default App;
