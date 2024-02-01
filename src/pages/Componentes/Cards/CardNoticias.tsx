import React from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";


interface CardNoticiasProp{
    prop:any;
}

const CardNoticias: React.FC<CardNoticiasProp> = ({prop}) => {

    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{prop.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{prop.content}</IonCardContent>
        </IonCard>


    );
}


export default CardNoticias;