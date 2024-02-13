import {
  IonApp,
  IonPage,
  setupIonicReact
} from '@ionic/react';
import {AppNavigation} from "./navigation"
import {IonReactRouter} from "@ionic/react-router"
import {Route, Redirect} from 'react-router-dom'

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

import ListHome from './pages/home';
import ListOng from './pages/Ong';
import ListLogIn from './pages/LogIn';
import ListPerfil from './pages/Perfil';
import NavBar from './pages/Componentes/BarraMenu/NavBar';

import AppContextProvider from './pages/Componentes/Context/Context';
import React from 'react';



setupIonicReact();

const App: React.FC = () => (
  <IonApp> 
    <AppContextProvider>
      <AppNavigation/>
      
        <IonReactRouter>
          <Route exact path="/" component={ListHome}/>
          <Route exact path="/ONG" component={ListOng}/>
          <Route exact path="/LogIn" component={ListLogIn}/>
          <Route exact path="/PlanillaVerde" />
          <Route exact path="/Perfil" component={ListPerfil}/>
      </IonReactRouter>
    </AppContextProvider>
  </IonApp>
);

export default App;
