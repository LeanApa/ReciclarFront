import React, { useState } from 'react';
import {IonButton,
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
import { useEffect } from 'react';

import {IonItemSliding,
    IonAvatar,
    IonItemOption,
    IonIcon,
    IonItemOptions} from '@ionic/react';

import { trash, arrowForward } from 'ionicons/icons';

import io from 'socket.io-client';


const mensajess= [
    {
        "_id": "65e8f50e63c58d9ba7e696fc",
        "company": "65a200dfb75b49c92482b4fe",
        "user": "65e25d3647c673f411d9f7de",
        "messages": [{emisor:"65a200dfb75b49c92482b4fe",mensaje:"mi mentaje"},
                    {emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"}],
        "__v": 0
    }
]
const mensajes = [{emisor:"65a200dfb75b49c92482b4fe",mensaje:"mi mentaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"}
/*{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"},
{emisor:"65e25d3647c673f411d9f7de",mensaje:"su mensaje"}*/
]

const usur = {
    id:"65e25d3647c673f411d9f7de"
}

const arr = Array.from({ length: 30 }, (_, index) => index + 1);

const ListadoChat: React.FC = () => {

    const [prueba,setPrueba] = useState("")

    let socket
    
    socket = io('http://localhost:8080');
    
    console.log(socket)

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });



    const enviarMensaje = () => {
        socket.emit('findChat', "652db15332c0659070c061b5","65a200dfb75b49c92482b4fe");
        socket.on('chatFound', (data)=>{
            console.log("michat", data)
        })
        //setPrueba("escribio")
    };



  return (
    <IonPage id='PantallaChat'>
        <NavBar />
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
                            
                            <IonCardContent style={{height: '90%'}} >
                                <div style={{ overflow: 'auto' }}>       
                                    <IonList>
                                        {mensajes.map(mensaje=>
                                        <IonRow class={`ion-justify-content-${usur.id === mensaje.emisor ? 'start' : 'end'} ion-align-items-end`} >
                                            <IonItem fill="outline" style={{width:"30%"}}>
                                                <IonLabel>
                                                    {prueba//mensaje.mensaje
                                                    }
                                                </IonLabel>
                                            </IonItem>
                                        </IonRow>
                                        
                                        )}
                                    </IonList>
                                </div>
                                
                            </IonCardContent>

                            
                            <IonCard color="dark" style={{height: '7%'}}>
                                <IonRow class="ion-align-items-center">
                                    <IonCol style={{width: '80%'}}>
                                    <IonItem fill="outline">
                                        <IonInput  placeholder="Enter text"></IonInput>
                                    </IonItem>
                                    </IonCol>
                                    <IonCol size='auto'>
                                        <IonButton onClick={enviarMensaje} color="medium" expand="block" className="TextoBoton" style={{textTransform: 'none'}}>
                                        <IonIcon size="large"  icon={arrowForward}></IonIcon>
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCard>

                        </IonCard>
                        
                    </IonCol>

                </IonRow>
            
        </IonContent>
    </IonPage>
  );
}
export default ListadoChat;