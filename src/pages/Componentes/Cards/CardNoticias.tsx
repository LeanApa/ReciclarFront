import React from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";


interface CardNoticiasProp{
    prop:any;
}

const CardNoticias: React.FC<CardNoticiasProp> = ({prop}) => {

    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{prop.titulo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{prop.text}</IonCardContent>
        </IonCard>


    );
}


export default CardNoticias;