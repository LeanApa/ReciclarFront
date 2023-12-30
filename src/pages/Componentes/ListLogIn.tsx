import React, { useState } from 'react'
import CardUsuarioLogIn from './Cards/CardUsuarioLogIn';
import { IonCol, IonRow } from '@ionic/react';



function ListadoLogIn() {
    
    const LogIn = {titulo:"Log in"}

    const SignIn = {titulo:"Sign in"}

    return <>
        <IonRow class="ion-margin-vertical ion-justify-content-center">
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn prop={LogIn}/>
            </IonCol>
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn prop={SignIn}/>
            </IonCol>
        </IonRow>

    </>
}


export default ListadoLogIn;