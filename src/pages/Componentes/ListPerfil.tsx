import React, { useEffect, useState } from 'react'
import {IonCardTitle, IonItem,IonSelect, IonSelectOption, IonTitle, IonCard, IonCol, IonRow, IonCardHeader, IonAvatar, IonLabel, IonCardContent, IonButton, IonContent, IonText,IonAlert } from '@ionic/react';
import { useStorage } from "../Componentes/Context/useStorage";
import { useAppContext } from './Context/Context';
import { useHistory, Redirect } from 'react-router-dom';

const levels = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO"]

function ListadoPerfil() {
    
    const {usuario, modificarUsuario, logOut, eliminarCuenta}= useAppContext()
    const [loading, setLoading] = useState(true);
    const [showAlertCerrar, setShowAlertCerrar] = useState(false);
    const [showAlertEliminar, setShowAlertEliminar] = useState(false);
    

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
        usuario.level = newUser.level 
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
                        {usuario.role=='USER' ?
                            <IonCardTitle style={{margin: "2rem 0 0 0"}}>{usuario.last_name == undefined ? usuario.first_name : usuario.first_name+" "+ usuario.last_name}</IonCardTitle>
                        :
                            <IonCardTitle style={{margin: "2rem 0 0 0"}}>{usuario.name}</IonCardTitle>
                        }
                    
                    </IonCardHeader>

                    <IonCardContent className='textoColor cardSeparacion' >
                        {usuario.role=='USER' ?
                            <>
                                <IonRow>
                                    <IonCol>
                                        <IonLabel>Nivel de reciclador:</IonLabel>
                                    </IonCol>
                                </IonRow>
                            
                                <IonRow>
                                    <IonCol>
                                        
                                    <IonSelect value={usuario.level} placeholder="Nivel"  interface="popover" onIonChange={setlevelReciclable}>
                                        
                                        {levels.map((level)=>
                                            <IonSelectOption value={level}>{level}</IonSelectOption>
                                        )}
                                    </IonSelect>
                                    </IonCol>
                                </IonRow> 
                            </>
                        :
                            <div className="ion-text-left">
                                <h2 style={{ fontWeight: 'bold' }}>
                                    Descripcion
                                </h2>
                                <IonLabel >
                                    {usuario.description}
                                </IonLabel>    
                            </div>
                        }
                        
                    </IonCardContent>
                    <div style={{margin: "3rem 0 0 0"}}>
                            <IonButton expand="block"> Modificar Usuario </IonButton>
                            <IonButton id='LogOut' expand="block" color="danger" onClick={()=>setShowAlertCerrar(true)}> salir de la cuenta </IonButton>    
                    </div>
                </IonCard>
            </IonCol>
            <IonCol size="12" size-lg="7" >
                <IonCard>
                    <IonCardHeader >
                        <IonCardTitle>Información</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent className='textoColor' style={{margin: "2rem 0"}}>
                        <IonRow>
                            <IonCol>
                                <IonLabel>Email: {usuario.email}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            {usuario.role=='USER'?
                            <>
                                <IonCol>
                                    <IonLabel>Edad: {usuario.age}</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>Ubicación: {usuario.address} - {usuario.city}</IonLabel>
                                </IonCol>
                            </>
                            :
                            <>
                                <IonCol>
                                    <IonLabel>CUIL: {usuario.cuil}</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>Ubicación: {usuario.headquarters}</IonLabel>
                                </IonCol>
                            </>
                            }
                            
                        </IonRow>
                        <div style={{margin: "2rem 0 0"}}>
                            {usuario.role=='USER' ?
                                <IonButton style={{margin: "25px 0"}} expand="block" routerLink='/Perfil/PlanillaVerde'> Mi planilla Ver </IonButton>
                                :
                                <IonButton style={{margin: "25px 0"}} expand="block" routerLink='/Perfil/Reciclables'> Mi planilla Ver </IonButton>
                            }
                            <IonButton style={{margin: "25px 0"}}  expand="block" > Mis chats </IonButton>
                        </div>
                    </IonCardContent>
                    <IonButton expand="block" color="danger" onClick={()=>setShowAlertEliminar(true)}> Eliminar cuenta </IonButton>  
                </IonCard>
            </IonCol>
        </IonRow>
        
        <IonAlert
        header="Quiere cerrar de la sesion?"
        isOpen={showAlertCerrar}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setShowAlertCerrar(false)
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              logOut()
              setShowAlertCerrar(false)
              history.push('/');
            },
          },
        ]}
        onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
      ></IonAlert>

              <IonAlert
        header="Quiere ELIMINAR su cuenta?"
        isOpen={showAlertEliminar}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setShowAlertEliminar(false)
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              eliminarCuenta()
              logOut()
              setShowAlertEliminar(false)
              history.push('/');
            },
          },
        ]}
        onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
      ></IonAlert>                                
    </>
}


export default ListadoPerfil;