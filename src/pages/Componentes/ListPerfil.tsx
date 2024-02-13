import React, { useEffect, useState } from 'react'
import {IonCardTitle, IonTitle, IonCard, IonCol, IonRow, IonCardHeader, IonAvatar, IonLabel, IonCardContent, IonButton, IonContent } from '@ionic/react';
import { useStorage } from "../Componentes/Context/useStorage";
import { useAppContext } from './Context/Context';



function ListadoPerfil() {
    
    /*
    let usuario = {
        _id: "65be639428f9ac2e84c77135",
        first_name: "Violeta",
        last_name: "Apelido",
        email: "a1@gmail.com",
        age: 45,
        city: "aa",
        address: "aa",
        password: "$2b$10$6XjaWV7pjlDUODLIWqhrIu1TAfPiRX2W9L1XAbmq5nXllq.fWw/oq",
        level: "PRINCIPIANTE",
        role: "USER",
        __v: 0
    }
    */
    const {usuario}= useAppContext()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica si el usuario está cargando
        if (!usuario) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [usuario]);

    function imprimier(){
        console.log(usuario)
    }

    // Si aún se está cargando, puedes mostrar un mensaje de carga o cualquier otra lógica
    if (loading) {
        return <div><IonButton onClick={imprimier}>aaa</IonButton>Cargando...</div>;
    }

    return <>
        <IonTitle className="TituloTexto">
                Perfil
        </IonTitle>
        
                        
        <IonRow class="ion-margin-vertical ion-justify-content-center">
            <IonCol size="12" size-lg="3" className="ion-text-center centered-content">
                <IonCard>
                    <IonCardHeader >
                        <img className='rounded-image' alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        <IonCardTitle style={{margin: "2rem 0 0 0"}}>{usuario.first_name+" "+ usuario.last_name}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent className='textoColor cardSeparacion' style={{margin: "3rem 0"}}>
                        <IonRow>
                            <IonCol>
                                <IonLabel>Nivel Recicalble:</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{usuario.level}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <div style={{margin: "2rem 0"}}>
                            <IonButton expand="block"> Modificar Usuario </IonButton>
                            <IonButton expand="block" color="danger"> salir de la cuenta </IonButton>    
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonCol>
            <IonCol size="12" size-lg="7" >
                <IonCard>
                    <IonCardHeader >
                        <IonCardTitle>{usuario.first_name+" "+ usuario.last_name}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent className='textoColor' style={{margin: "2rem 0"}}>
                        ToDo listado de todos los reciclables que tiene ahora el usurio
                        <div style={{margin: "2rem 0"}}>
                            <IonButton style={{margin: "25px 0"}} expand="block"> Mi planilla Ver </IonButton>
                            <IonButton style={{margin: "25px 0"}}  expand="block"> Mis chats </IonButton>
                        </div>
                    </IonCardContent>
                    <IonButton expand="block" color="danger"> Eliminar cuenta </IonButton>  
                </IonCard>
            </IonCol>
        </IonRow>

    </>
}


export default ListadoPerfil;