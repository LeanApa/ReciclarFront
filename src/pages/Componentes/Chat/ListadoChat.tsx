import React from 'react';
import {IonButtons,
    IonCol,
    IonContent,
    IonLabel,
    IonItem,
    IonPage,
    IonList,
    IonCard,
    IonRow,
    IonCardContent,
    IonInput} from '@ionic/react';
import NavBar from '../BarraMenu/NavBar';

import {IonItemSliding,
    IonAvatar,
    IonItemOption,
    IonIcon,
    IonItemOptions} from '@ionic/react';

import { trash } from 'ionicons/icons';


const arr = Array.from({ length: 30 }, (_, index) => index + 1);

const ListadoChat: React.FC = () => {

  return (
    <IonPage id='PantallaChat'>
        <NavBar/>
        <IonContent>
            
                <IonRow>
                    <IonCol size='3'>
                        <IonCard>
                        <div style={{height: '90vh',  overflow: 'auto' }}>
                            <IonList>
                                {arr.map((index) => (
                                <IonItemSliding>
                                <IonItem button={true}>
                                <IonAvatar aria-hidden="true" slot="start">
                                    <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </IonAvatar>
                                <IonLabel>Rick Astley</IonLabel>
                                </IonItem>
                                <IonItemOptions slot="end">
                                <IonItemOption color="danger" expandable={true}>
                                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                                </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                                ))}
                            </IonList>
                        </div>
                        
                        </IonCard>
                    </IonCol>

                    <IonCol size='9'>
                        <IonCard style={{height: '90vh'}}>
                            <IonCardContent style={{height: '90%'}}>

                            </IonCardContent>
                            <IonInput placeholder="Enter text" />
                                
                            <IonButtons color="medium"  className="TextoBoton" style={{textTransform: 'none'}}>Mandar</IonButtons>
                        </IonCard>
                    </IonCol>

                </IonRow>
            
        </IonContent>
    </IonPage>
  );
}
export default ListadoChat;