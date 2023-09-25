import React from 'react'
import {IonReactRouter} from "@ionic/react-router"
import {IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon} from "@ionic/react"
import {Route, Redirect} from 'react-router-dom'
import { Tasks, Settings } from "../../pages";
import {settingsOutline, listOutline} from 'ionicons/icons'
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';


export const AppNavigation : React.FC = ()=> {
  return (
    <IonReactRouter>       
        <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>    
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons >
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
      </IonPage>
    </IonReactRouter>
  )
}


