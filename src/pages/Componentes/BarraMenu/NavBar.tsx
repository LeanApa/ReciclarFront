import React from 'react';
import { IonAvatar, IonButtons, IonCol, IonContent, IonHeader, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';




const NavBar: React.FC = () => {

    const styleHeader = {
        background:"#B4EC89",
        backgroundColor:"#B4EC89"
    }


  return (
    <IonHeader style={styleHeader}>
        
        <IonToolbar  color="#B4EC89" >
            <IonRow className="ion-justify-content-between">
                <IonCol style={{width:'5rem'}} size='2'>
                    <IonButtons>
                        <IonMenuButton/>
                    </IonButtons> 
                </IonCol>
                <IonCol size='2' className='ion-text-center' >
                    <IonTitle className='TituloTexto' style={{height:'3rem'}}>ReciclAR</IonTitle>
                </IonCol>
                <IonCol size='2' className='ion-align-items-end '>
                    <IonRow className=' ion-align-items-end ion-justify-content-end'>
                        <IonCol className='ion-text-end'>
                            <IonLabel>Item Avatar</IonLabel>
                        </IonCol>
                        <IonCol className=' ion-align-items-end ion-justify-content-end'>
                            <IonAvatar style={{height:'2rem', width:'2rem'}} >
                                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </IonAvatar>
                        </IonCol>
                        
                    </IonRow>
                </IonCol>
            </IonRow>
            
        </IonToolbar>
        
    </IonHeader>
  );
}
export default NavBar;