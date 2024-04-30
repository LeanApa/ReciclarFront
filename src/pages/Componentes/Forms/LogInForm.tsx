import React from "react";
import {useState,useEffect} from 'react';
import { IonItem, IonLabel,IonInput, IonButton, IonRow, IonCol, IonToggle } from "@ionic/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useStorage } from "../Context/useStorage";
import { Redirect } from 'react-router-dom';
import { useAppContext } from "../Context/Context";

import { variables } from "../../../Config/variableDeEntorno";

function LogInForm (){

    const {usuario,obtenerEmpresa, obtenerUsuario, setToken} = useAppContext();
    const [loggedIn, setLoggedIn] = useState(false);
    const [toggleValue, setToggleValue] = useState(false);

    //const [key,setKey]=useState('');
    const [mensaje,setMensaje]=useState('')
    const [error,setError]=useState(false);

    //const { setToken , setIngresado,ingresado} = useStorage();

    const handleToggleChange = (event: CustomEvent) => {
        setToggleValue(event.detail.checked);
    };

    function IngresarDatosUsuario(event:any){
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))
        

        fetch(`${variables.URL}/sessions/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(Response=> {
            console.log(Response.status)
            if(Response.status ==200) {Response.json()
                .then(data=>{
                    
                    //setKey(data.accessToken)
                    setToken(data.accessToken)
                    //setIngresado(true)
                    setLoggedIn(true)
                    setError(false)
                    obtenerUsuario(data.accessToken)
                }).catch(err=>{})
            }else if(Response.status > 400 && Response.status < 500){
                Response.json()
                    .then(data=>{
                        setLoggedIn(false)
                        console.log(data.message)
                        setMensaje(data.message)
                        setError(true)
                    })
            }else{
            }
        })
    }

    function IngresarDatosEmpresa(event:any){
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))
        

        fetch(`${variables.URL}/sessions/logincompany`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(Response=> {
            console.log(Response.status)
            if(Response.status ==200) {Response.json()
                .then(data=>{
                    
                    //setKey(data.accessToken)
                    setToken(data.accessToken)
                    //setIngresado(true)
                    setLoggedIn(true)
                    setError(false)
                    obtenerEmpresa(data.accessToken)
                }).catch(err=>{})
            }else if(Response.status > 400 && Response.status < 500){
                Response.json()
                    .then(data=>{
                        setLoggedIn(false)
                        console.log(data.message)
                        setMensaje(data.message)
                        setError(true)
                    })
            }else{
            }
        })
    }
    
    if(loggedIn){
        return <Redirect to="/" />
        //return<p>{usuario.first_name}</p>
    }

    return(
        <>
            <IonRow class="ion-align-items-center">
                <IonCol size="auto">
                    <IonLabel>Soy una Empresa</IonLabel>
                </IonCol>
                <IonCol size="auto">
                    <IonToggle checked={toggleValue} onIonChange={handleToggleChange}/>
                </IonCol>
            </IonRow>
            {toggleValue ? 
                <form onSubmit={IngresarDatosEmpresa} method="POST">
                    {/*************CUIL************/}
                    <IonItem>
                        <IonLabel position="floating">CUIL</IonLabel>
                        <IonInput placeholder="Enter text" name="cuil" value="30111111113"></IonInput>
                    </IonItem>
                    {/*************PASSWORD************/}
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" placeholder="Enter text" name="password" value="password"></IonInput>
                    </IonItem>
                    <IonButton id="logIn" type="submit" expand="block">Ingresar</IonButton>
                    
                </form> 
                
            :
                <form onSubmit={IngresarDatosUsuario} method="POST">
                    {/*************MAIL************/}
                    <IonItem>
                        <IonLabel position="floating">Mail</IonLabel>
                        <IonInput placeholder="Enter text" name="email" value="b2@gmail.com"></IonInput>
                    </IonItem>
                    {/*************PASSWORD************/}
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" placeholder="Enter text" name="password" value="123456789"></IonInput>
                    </IonItem>
                    <IonButton id="logIn" type="submit" expand="block">Ingresar</IonButton>
                    
                </form> 
            }
            
            {error ? <IonLabel position="floating">{mensaje}</IonLabel> : <></>}
        </>
    );
}

export default LogInForm;