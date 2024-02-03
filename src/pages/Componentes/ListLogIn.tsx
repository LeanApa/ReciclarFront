import React, { useEffect, useState } from 'react'
import CardUsuarioLogIn from './Cards/CardUsuarioLogIn';
import { IonCol, IonRow } from '@ionic/react';
import { useStorage } from "../Componentes/Context/useStorage";


function ListadoLogIn() {
    
    const { usur, ingresado} = useStorage();
    
    const LogIn = {titulo:"Log in"}

    const SignIn = {titulo:"Sign in"}

    return <>
        <IonRow class="ion-margin-vertical ion-justify-content-center">
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn prop={LogIn}/>
            </IonCol>
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn prop={SignIn} />
            </IonCol>
            
        </IonRow>

    </>
}


export default ListadoLogIn;