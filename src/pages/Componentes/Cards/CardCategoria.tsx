import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";


interface CardCategoriaProp{
    prop:any;
}

const CardCategoria: React.FC<CardCategoriaProp> = ({prop}) => {

    return(
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>{prop.datos.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{prop.datos.description}</IonCardContent>
            <IonButton color="medium"  expand="block" className="TextoBoton" style={{textTransform: 'none'}}>
                <Link to={prop.url} className="linkStyle">
                    Ver Mas
                </Link>
            </IonButton>
        </IonCard>


    );
}



export default CardCategoria;