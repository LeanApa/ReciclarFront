import React from 'react'

import {  IonContent } from '@ionic/react';

import { IonPage } from '@ionic/react';


import NavBar from './Componentes/BarraMenu/NavBar';
import ListadoPlanillaVerde from './Componentes/ListadoPlanillaVerde';

function ListPlanillaVerde(){

    return (
        <IonPage id="main-content" >
        <NavBar />
        <IonContent className="ion-padding">
            <ListadoPlanillaVerde />
        </IonContent>
        </IonPage>
    );
}




export default ListPlanillaVerde