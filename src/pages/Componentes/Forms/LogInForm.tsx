import React from "react";
import {useState,useEffect} from 'react';
import { IonItem, IonLabel,IonInput, IonButton } from "@ionic/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useStorage } from "../Context/useStorage";
import { Redirect } from 'react-router-dom';
import { useAppContext } from "../Context/Context";




function LogInForm (){

    const {setUsuario} = useAppContext();
    const [loggedIn, setLoggedIn] = useState(false);


    const [key,setKey]=useState('');
    const [mensaje,setMensaje]=useState('')
    const [error,setError]=useState(false);

    const { setToken , setIngresado,ingresado} = useStorage();

    function IngresarDatos(event:any){
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))
        let respuesta

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
                    
                    setKey(data.accessToken)
                    setToken(key)
                    setIngresado(true)
                    setUsuario(data)
                    setLoggedIn(true)
                    console.log(data)
                    console.log("ingreso correctamente")
                    setError(false)
                })
            }else if(Response.status > 400 && Response.status < 500){
                Response.json()
                    .then(data=>{
                        console.log(data)
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
    }

    return(
        <>
            <form onSubmit={IngresarDatos} method="POST">
                {/*************MAIL************/}
                <IonItem>
                    <IonLabel position="floating">Mail</IonLabel>
                    <IonInput placeholder="Enter text" name="email"></IonInput>
                </IonItem>
                {/*************PASSWORD************/}
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" placeholder="Enter text" name="password"></IonInput>
                </IonItem>
                <IonButton type="submit" expand="block">Ingresar</IonButton>
                
            </form>
            {error ? <IonLabel position="floating">{mensaje}</IonLabel> : <></>}
        </>
    );
}

export default LogInForm;