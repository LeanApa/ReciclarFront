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


interface CardReciclablesProp{
    prop:any;
}

const CardReciclables: React.FC<CardReciclablesProp> = ({prop}) => {

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return(
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonRow class="ion-align-items-center">
                <IonCol size="10">
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
                    
                    <IonButton onClick={toggleExpand}>
                        {expanded ? 'si' : 'no'}
                    </IonButton>
                </IonCol>
            </IonRow>
            
        </IonCard>


    );
}
//Dejar solo si y no no espesificar cantidad.

export default CardReciclables;