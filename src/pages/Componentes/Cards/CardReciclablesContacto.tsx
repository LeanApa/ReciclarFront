import React, { useState } from "react";
import { IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonLabel,
    IonRow,
    IonCol,
    IonInput} from "@ionic/react";


import { useAppContext } from "../Context/Context";
import { variables } from '../../../Config/variableDeEntorno';


interface CardReciclablesProp{
    prop:any;
}

const CardReciclablesContacto: React.FC<CardReciclablesProp> = ({prop}) => {

    const { token} = useAppContext();


    return(
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            
            <IonCardHeader>
                <IonCardTitle>{prop.title}</IonCardTitle>
            </IonCardHeader>
           
            <IonCardContent>  
                <IonLabel color="dark">
                    {prop.description}
                </IonLabel>  
            </IonCardContent>
            <IonButton expand="block" routerLink={`/Perfil/Reciclables/${prop._id}`}>Buscar contacto</IonButton>
        </IonCard>


    );
}
//Dejar solo si y no no espesificar cantidad.

export default CardReciclablesContacto;