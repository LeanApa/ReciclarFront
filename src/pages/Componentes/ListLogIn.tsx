import React, { useState } from 'react'
import CardUsuarioLogIn from './Cards/CardUsuarioLogIn';
import { IonCol, IonRow } from '@ionic/react';



function ListadoLogIn() {
    

    return <>
        <IonRow class="ion-margin-vertical ion-justify-content-center">
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn />
            </IonCol>
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn />
            </IonCol>
        </IonRow>

    </>
}


export default ListadoLogIn;