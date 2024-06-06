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
import { Link } from "react-router-dom";



interface CardReciclablesProp{
    prop:any;
}

const CardReciclablesContacto: React.FC<CardReciclablesProp> = ({prop}) => {

    const { token} = useAppContext();

    console.log(`prop`,prop)
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
            <Link to={`/Perfil/Reciclables/${prop._id}`}>
                <IonButton expand="block">Buscar contacto</IonButton>
            </Link>
        </IonCard>


    );
}
//Dejar solo si y no no espesificar cantidad.

export default CardReciclablesContacto;