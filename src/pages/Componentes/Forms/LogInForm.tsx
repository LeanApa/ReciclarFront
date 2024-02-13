import React from "react";
import {useState,useEffect} from 'react';
import { IonItem, IonLabel,IonInput, IonButton } from "@ionic/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useStorage } from "../Context/useStorage";
import { Redirect } from 'react-router-dom';
import { useAppContext } from "../Context/Context";



function LogInForm (){

    const {usuario,setUsuario, obtenerUsuario, setToken} = useAppContext();
    const [loggedIn, setLoggedIn] = useState(false);


    //const [key,setKey]=useState('');
    const [mensaje,setMensaje]=useState('')
    const [error,setError]=useState(false);

    //const { setToken , setIngresado,ingresado} = useStorage();

    function IngresarDatos(event:any){
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))
        

        fetch("http://localhost:8080/api/sessions/login",{
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
                    //setToken(data.accessToken)
                    //setIngresado(true)
                    setLoggedIn(true)
                    setError(false)
                    obtenerUsuario(data.accessToken)
                }).catch(err=>{})
            }else if(Response.status > 400 && Response.status < 500){
                Response.json()
                    .then(data=>{
                        setLoggedIn(false)
                        
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
            <form onSubmit={IngresarDatos} method="POST">
                {/*************MAIL************/}
                <IonItem>
                    <IonLabel position="floating">Mail</IonLabel>
                    <IonInput placeholder="Enter text" name="email" value="a1@gmail.com"></IonInput>
                </IonItem>
                {/*************PASSWORD************/}
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" placeholder="Enter text" name="password" value="123456789"></IonInput>
                </IonItem>
                <IonButton type="submit" expand="block">Ingresar</IonButton>
                
            </form>
            {error ? <IonLabel position="floating">{mensaje}</IonLabel> : <></>}
        </>
    );
}

export default LogInForm;