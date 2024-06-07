import React, { useRef, useState } from 'react';
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
    IonInput,
    IonInfiniteScroll,
    IonInfiniteScrollContent} from '@ionic/react';
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
import { Link } from 'react-router-dom';

interface usuarioProp{
    first_name:string;
    last_name:string;
    _id:string;
}
interface empresaProp{
    name:string;
    _id:string;
}

interface chatProp{
    company: empresaProp;
    user: usuarioProp;
    _id:string;
}

const ListadoChat: React.FC = () => {

    const [mensajes,setMensajes] = useState([])
    const [chats,setChats] = useState<chatProp[]>([])
    const [chatId,setChatId] = useState("")
    const [contactoId,setContactoId] = useState()
    const [mensajeActual,setMensajeActual] = useState("")

    const idContacto = useParams();
    const {usuario, token} = useAppContext();
    

    const chatContainerRef = useRef(null);
    let socket 
    
    socket = io(variables.SOCKET);
    

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });
    

    useEffect(()=>{
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
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
            setChats(data)

            obtenerMiChat();
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
        
    },[idContacto])

    const enviarMensaje = () => {
        console.log("ID=",contactoId)
        if('_id' in idContacto && idContacto._id != null){
            socket.emit('sendMessage', idContacto._id,usuario._id,mensajeActual);
            
            socket.on('messageSent', (data)=>{
                console.log("MENSAJES",data)
                setMensajes(data)
            })
        }
        obtenerMiChat()
        setMensajeActual('')
        
    };

    function obtenerMiChat(){
        if('_id' in idContacto && idContacto._id != null){
            let chatEncontrado
            fetch(`${variables.URL}/chat/${idContacto._id}`, {
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
                
                if(usuario.role=="USER"){
                    setContactoId(data.company._id)
                    chatEncontrado = socket.emit('findChat', usuario._id,data.company._id);
                }else{
                    setContactoId(data.user._id)
                    chatEncontrado = socket.emit('findChat', data.user._id,usuario._id);
                }
                socket.on('chatFound', (data)=>{
                    setChatId(data)
                    setMensajes(data.messages)
                    
                })
                
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
            
            
        }
    }


    const guardarMensajeActual=(ev:Event)=>{
        const value = (ev.target as HTMLInputElement).value;
        
        setMensajeActual(value)
    }

  return (
    
                <IonRow>

                    {////////SECCION DE USUARIOS////////////////////
                    }
                    <IonCol size='3'>
                        <IonCard style={{ overflowY: 'scroll' }}>
                        <div style={{height: '90vh',  overflow: 'auto' }} ref={chatContainerRef}>
                            <IonList >
                                {chats.map((index) => (
                                    <Link to={`/misChats/${index._id}`}>
                                        <IonItem button={true}>
                                            <IonAvatar aria-hidden="true" slot="start">
                                                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                            </IonAvatar>
                                            <IonLabel>{usuario.role=='USER' ? index.company.name : index.user.first_name + " " + index.user.last_name}</IonLabel>
                                        </IonItem>
                                    </Link>
                                    

                                ))}
                            </IonList>

                        </div>
                        
                        </IonCard>
                    </IonCol>
                    {////////SECCION DE CHATS////////////////////
                    }
                    <IonCol size='6'>
                        <IonCard style={{height: '90vh'}} ref={chatContainerRef}>
                            
                        <IonCardContent style={{height: '90%', overflow: 'auto'}} >
                                <div style={{ overflow: 'auto' }} ref={chatContainerRef}>       
                                    <IonList>
                                        {mensajes.map(mensaje=>
                                        <IonItemSliding>
                                            <IonRow class={`ion-justify-content-${usuario._id != mensaje.sender ? 'start' : 'end'} ion-align-items-end`} >
                                                <IonItem fill="outline" style={{width:"30%"}}>
                                                    <IonLabel>
                                                        {mensaje.content}
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
         
  );
}
export default ListadoChat;