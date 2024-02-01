import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";


interface CardCategoriaProp{
    prop:any;
}

const CardCategoria: React.FC<CardCategoriaProp> = ({prop}) => {

    return(
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>{prop.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{prop.description}</IonCardContent>
            <IonButton color="medium" href={prop.url} expand="block" className="TextoBoton" style={{textTransform: 'none'}}>
                Ver Mas
            </IonButton>
        </IonCard>


    );
}



export default CardCategoria;