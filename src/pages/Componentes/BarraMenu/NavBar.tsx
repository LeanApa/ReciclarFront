import React, { useContext, useEffect, useState } from 'react';
import { IonAvatar, IonButtons, IonCol, IonContent, IonHeader, IonLabel, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useStorage } from "../Context/useStorage";
import { useAppContext } from '../Context/Context';



const NavBar: React.FC = () => {

    const {usuario} = useAppContext();

    const styleHeader = {
        background:"#B4EC89",
        backgroundColor:"#B4EC89"
    }

    const {usur}=useStorage();
    
    const [currentUser, setCurrentUser] = useState(usuario);

    useEffect(() => {
        // Este efecto se ejecutará cada vez que el usuario cambie en el contexto
        setCurrentUser(usuario);
    }, [usuario]);


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
                            {currentUser != null ? (<IonLabel ><a href="/Perfil" style={{ color: 'inherit', cursor: 'pointer' }}>lpm</a></IonLabel>) : (<IonLabel><a href="/LogIn" style={{ color: 'inherit', cursor: 'pointer' }}>Ingresar</a></IonLabel>)}
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