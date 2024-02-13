import React from 'react'

import {  IonContent } from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router"

import { IonPage } from '@ionic/react';


import Menu from './Componentes/BarraMenu/Menu';
import NavBar from './Componentes/BarraMenu/NavBar';
import ListadoPerfil from './Componentes/ListPerfil';

function ListPerfil(){

    return (
    <IonReactRouter>       
        <Menu/>
        <IonPage id="main-content" >
        <NavBar />
        <IonContent className="ion-padding">
            <ListadoPerfil/>
        </IonContent>
        </IonPage>
    </IonReactRouter>
    );
}




export default ListPerfil