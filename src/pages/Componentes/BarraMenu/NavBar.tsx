import React, { useContext, useEffect, useState } from 'react';
import { IonAvatar, IonButtons, IonCol, IonContent, IonHeader, IonLabel, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useStorage } from "../Context/useStorage";
import { useAppContext } from '../Context/Context';

import { IonRouterLink } from '@ionic/react';
import { Link } from 'react-router-dom';


const NavBar: React.FC = () => {

    const {usuario} = useAppContext();

    const styleHeader = {
        background:"#B4EC89",
        backgroundColor:"#B4EC89",
        //height:'4rem'
    }

    const {usur}=useStorage();
    
 

  return (
    <IonHeader style={styleHeader} >
        
        <IonToolbar  color="#B4EC89" >
            <IonRow className="ion-justify-content-between">
                <IonCol style={{width:'5rem'}} size='2'>
                    <IonButtons>
                        <IonMenuButton/>
                    </IonButtons> 
                </IonCol>
                <IonCol size='2' className='ion-text-center' >
                    <Link to="/" className='TituloTexto'>
                        <IonTitle className='TituloTexto' style={{height:'3rem'}}>ReciclAR</IonTitle>
                    </Link>
                    
                </IonCol>
                <IonCol size='2' className='ion-align-items-end '>
                    <IonRow className=' ion-align-items-end ion-justify-content-end'>
                        <IonCol className='ion-text-end'>
                            {usuario != null ?
                                (<IonLabel >
                                    <Link to="/Perfil">{usuario.role == 'USER' ? usuario.first_name : usuario.name}</Link>
                                </IonLabel>) 
                                    : 
                                (<IonLabel>
                                    <Link to="/LogIn">Ingresar</Link>
                                </IonLabel>)
                            }
                            
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