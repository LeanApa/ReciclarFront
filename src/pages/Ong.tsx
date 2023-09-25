import React from 'react'

import { AppNavigation } from '../navigation';
import { IonCard, IonCardTitle, IonContent } from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router"

import { IonPage } from '@ionic/react';


import Menu from './Componentes/BarraMenu/Menu';
import NavBar from './Componentes/BarraMenu/NavBar';
import ListadoOng from './Componentes/ListadoOng';

function ListOng(){

    return (
    <IonReactRouter>       
        <Menu/>
        <IonPage id="main-content" >
        <NavBar />
        <IonContent className="ion-padding">
            <ListadoOng/>
        </IonContent>
        </IonPage>
    </IonReactRouter>
    );
}




export default ListOng