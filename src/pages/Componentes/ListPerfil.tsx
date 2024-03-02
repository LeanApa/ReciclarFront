import React, { useEffect, useState } from 'react'
import {IonCardTitle, IonItem,IonSelect, IonSelectOption, IonTitle, IonCard, IonCol, IonRow, IonCardHeader, IonAvatar, IonLabel, IonCardContent, IonButton, IonContent, IonText,IonAlert } from '@ionic/react';
import { useStorage } from "../Componentes/Context/useStorage";
import { useAppContext } from './Context/Context';
import { useHistory, Redirect } from 'react-router-dom';

var levels = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO"]

function ListadoPerfil() {
    
    const {usuario, modificarUsuario, logOut}= useAppContext()
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory();

    useEffect(() => {
        // Verifica si el usuario está cargando
        if (!usuario) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [usuario]);

    function setlevelReciclable(event){
        const newUser = {level:event.detail.value}
        modificarUsuario(newUser) 
    }

    if(!usuario){
        return <Redirect to="/" />
    }

    return <>
        <IonTitle className="TituloTexto">
                Perfil
        </IonTitle>
        <IonButton routerLink='/Perfil/65be639428f9ac2e84c77135'>ir a detalle</IonButton>
                        
        <IonRow class="ion-margin-vertical ion-justify-content-center">
            <IonCol size="12" size-lg="3" className="ion-text-center centered-content">
                <IonCard>
                    <IonCardHeader >
                        <img className='rounded-image' alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        <IonCardTitle style={{margin: "2rem 0 0 0"}}>{usuario.first_name+" "+ usuario.last_name}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent className='textoColor cardSeparacion' >
                        <IonRow>
                            <IonCol>
                                <IonLabel>Nivel Recicalble:</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                
                            <IonSelect value={usuario.level} placeholder="Nivel"  interface="popover" onIonChange={setlevelReciclable}>
                                prueba
                                {levels.map((level)=>
                                    <IonSelectOption value={level}>{level}</IonSelectOption>
                                )}
                            </IonSelect>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                    <div style={{margin: "3rem 0 0 0"}}>
                            <IonButton expand="block"> Modificar Usuario </IonButton>
                            <IonButton id='LogOut' expand="block" color="danger" onClick={()=>setShowAlert(true)}> salir de la cuenta </IonButton>    
                    </div>
                </IonCard>
            </IonCol>
            <IonCol size="12" size-lg="7" >
                <IonCard>
                    <IonCardHeader >
                        <IonCardTitle>Informacion</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent className='textoColor' style={{margin: "2rem 0"}}>
                        <IonRow>
                            <IonCol>
                                <IonLabel>Email: {usuario.email}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>Edad: {usuario.age}</IonLabel>
                            </IonCol>
                            <IonCol>
                                <IonLabel>Ubicacion: {usuario.address} - {usuario.city}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <div style={{margin: "2rem 0 0"}}>
                            <IonButton style={{margin: "25px 0"}} expand="block"> Mi planilla Ver </IonButton>
                            <IonButton style={{margin: "25px 0"}}  expand="block"> Mis chats </IonButton>
                        </div>
                    </IonCardContent>
                    <IonButton expand="block" color="danger"> Eliminar cuenta </IonButton>  
                </IonCard>
            </IonCol>
        </IonRow>
        
        <IonAlert
        header="Quiere cerrar de la sesion?"
        isOpen={showAlert}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setShowAlert(false)
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              logOut()
              setShowAlert(false)
              history.push('/');
            },
          },
        ]}
        onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
      ></IonAlert>                            
    </>
}


export default ListadoPerfil;