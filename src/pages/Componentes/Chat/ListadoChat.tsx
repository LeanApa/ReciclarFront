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
import { useParams } from 'react-router';

import io from 'socket.io-client';
import { useAppContext } from "../Context/Context";
import { variables } from '../../../Config/variableDeEntorno';


const ListadoChat: React.FC = () => {

    const [mensajes,setMensajes] = useState([])
    const [chats,setChats] = useState([])
    const [chatId,setChatId] = useState("")
    const [mensajeActual,setMensajeActual] = useState("")

    const idContacto = useParams();
    const {usuario, token} = useAppContext();
    
    let socket 
    
    socket = io('http://localhost:8080');
    

    socket.on('connect', () => {
        //console.log('Conectado al servidor');
    });
    


    const enviarMensaje = () => {
        if('id' in idContacto && idContacto.id != null){
            socket.emit('sendMessage', chatId,usuario._id,mensajeActual);
            console.log("envio mi mensaje despues del sendMessage")
            socket.on('messageSent', (data)=>{
                console.log("michat", data)
                setMensajes(data.messages)
            })
            console.log("envio mi mensaje despues del MessageSent")
        }
        obtenerMiChat()
        setMensajeActual('')
        
    };

    function obtenerMiChat(){
        console.log("entre a btener chat")

        if('id' in idContacto && idContacto.id != null){
            
            let a = socket.emit('findChat', usuario._id,idContacto.id);
            console.log(a)
            socket.on('chatFound', (data)=>{
                setChatId(data._id)
                console.log("michat", data)
                setMensajes(data.messages)
                
            })
        }
    }

    
    useEffect(()=>{
        
        fetch(`${variables.URL}/chat/mychats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': token
            }
        })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return respuesta.json(); // Devolver la promesa para el siguiente then
        })
        .then(data => {
            console.log("mycontactos: ", data);
            setChats(data)
            obtenerMiChat();
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });

    },[idContacto,mensajes])

    const guardarMensajeActual=(ev:Event)=>{
        const value = (ev.target as HTMLInputElement).value;
        
        setMensajeActual(value)
    }

  return (
    <IonPage id='PantallaChat'>
        <NavBar />
        <IonContent>
                
                <IonRow>
                    <IonCol size='3'>
                        <IonCard>
                        <div style={{height: '90vh',  overflow: 'auto' }}>
                            <IonList>
                                {chats.map((index) => (
                                <IonItemSliding>
                                    <IonItem button={true}>
                                        <IonAvatar aria-hidden="true" slot="start">
                                            <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                        </IonAvatar>
                                        <IonLabel>{index.company.name}</IonLabel>
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
                            
                            <IonCardContent style={{height: '90%', overflow: 'auto'}} >
                                <div style={{ overflow: 'auto' }}>       
                                    <IonList>
                                        {mensajes.map(mensaje=>
                                        <IonItemSliding>
                                            <IonRow class={`ion-justify-content-${usuario._id === mensaje.emisor ? 'start' : 'end'} ion-align-items-end`} >
                                                <IonItem fill="outline" style={{width:"30%"}}>
                                                    <IonLabel>
                                                        {mensaje.content
                                                        
                                                        }
                                                        <p style={{fontSize: '10px', textAlign: 'right'}} >{mensaje.timestamp} </p>
                                                    </IonLabel>
                                                </IonItem>
                                            </IonRow>
                                        </IonItemSliding>
                                        
                                        
                                        )}
                                    </IonList>
                                </div>
                                
                            </IonCardContent>

                            
                            <IonCard color="dark" style={{height: '7%'}}>
                                <IonRow class="ion-align-items-center">
                                    <IonCol style={{width: '80%'}}>
                                    <IonItem fill="outline">
                                        <IonInput value={mensajeActual} placeholder="Enter text" onIonChange={(e) => guardarMensajeActual(e)}></IonInput>
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