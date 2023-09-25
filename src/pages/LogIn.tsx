import React from "react";

import { AppNavigation } from '../navigation';
import { IonContent } from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router"

import { IonPage } from '@ionic/react';


import Menu from './Componentes/BarraMenu/Menu';
import NavBar from './Componentes/BarraMenu/NavBar';
import ListadoLogIn from './Componentes/ListLogIn';

function ListLogIn(){

    return (
    <IonReactRouter>       
        <Menu/>
        <IonPage id="main-content" >
        <NavBar />
        <IonContent className="ion-padding">
            <ListadoLogIn/>
        </IonContent>
        </IonPage>
    </IonReactRouter>
    );
}

export default ListLogIn;