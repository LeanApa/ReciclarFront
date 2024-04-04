import { IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonRow,
    IonCol } from "@ionic/react";
import React from "react";
import { useAppContext } from "../Context/Context";


interface CardEmpresaProp{
    prop:any;
}

const CardEmpresaDetalle: React.FC<CardEmpresaProp> = ({prop}) => {

    const {usuario} = useAppContext();

    return(
        <IonCard >          
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>{prop.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{prop.description}</IonCardContent>
            {usuario==null ?
            
            <></>
            :
            <IonButton routerLink={"/misChats/"+prop._id} color="medium" expand="block" className="TextoBoton" style={{textTransform: 'none'}}>
                Contactar
            </IonButton>
            
            }
            
        </IonCard>
    );
}


export default CardEmpresaDetalle;