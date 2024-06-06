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
    IonInput,
    IonToggle} from "@ionic/react";


import { useAppContext } from "../Context/Context";
import { variables } from '../../../Config/variableDeEntorno';


interface CardReciclablesProp{
    prop:any;
    cargado:boolean;
}

const CardReciclables: React.FC<CardReciclablesProp> = ({prop,cargado}) => {

    const { token} = useAppContext();
    const [enPlanilla,setEnPlanilla]=useState(cargado)

    const agregarEnPlanilla = () => {
        fetch(`${variables.URL}/planillaverde/${prop._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': token
            }
        })
        .then(respuesta =>{
            if(!respuesta.ok){
                throw new Error('La solicitud sobre los reciclables no fue exitosa');
            }
            setEnPlanilla(true)
            console.log("se dio ok la carga")
            return respuesta.json()
            
        })
    };

    function quitarDePlanilla(){
        fetch(`${variables.URL}/planillaverde/${prop._id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': token
            }
        })
        .then(respuesta =>{
            if(!respuesta.ok){
                throw new Error('La solicitud sobre los reciclables no fue exitosa');
            }
            setEnPlanilla(false)
            console.log("se dio ok la eliminacion")
            return respuesta.json()
            
        })
    }


    return(
        <IonCard>
            <img alt="Silhouette of mountains" src={prop.imageUrl} />
            <IonRow class="ion-align-items-center">
                <IonCol size="9">
                    <IonCardHeader>
                        <IonCardTitle>{prop.title}</IonCardTitle>
                    </IonCardHeader>
                    
                    
                    <IonCardContent>
                        
                        <IonLabel color="dark">
                            {prop.description}
                        </IonLabel>
                        
                        
                    </IonCardContent>
                </IonCol>
                
                <IonCol size="1">
                    
                    
                    <IonToggle checked={enPlanilla} onIonChange={enPlanilla ?  quitarDePlanilla : agregarEnPlanilla}>Tengo?</IonToggle>
                </IonCol>
            </IonRow>
            
        </IonCard>


    );
}

export default CardReciclables;