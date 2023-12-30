import React from "react";
import {useState,useEffect} from 'react';
import { IonItem, IonLabel,IonInput, IonButton } from "@ionic/react";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useStorage } from "../Context/useStorage";



function LogInForm (){

    const [key,setKey]=useState('');
    const [mensaje,setMensaje]=useState('')
    const [error,setError]=useState(false);

    const { setToken } = useStorage();

    function IngresarDatos(event:any){
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))

        fetch("http://localhost:8080/api/sessions/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(Response=> Response.json())
        .then(data=>{
            
            setKey(data.accessToken)
            setMensaje(data.message)
            console.log("key: "+key)
            setToken(key)
        })
        .catch(err=>{
            setError(true);
        })
    }
    
    /*
    let prueba = {
        email: "slampropulos@gmail.com",
        password:"12345678" 
    };
    fetch("http://localhost:8080/api/sessions/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prueba)
    }).then(Response=> Response.json())
    .then(data=>{
        console.log(data)
        
    })

    fetch("http://localhost:8080/api/users/").then(data=>{console.log(data)})
    */
    /*
    fetch("http://localhost:8080/api/posts/", {method: 'GET'})
    .then(data=>{console.log(data)})
    */

    return(
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
            <IonButton type="submit">Ingresar</IonButton>
            {mensaje!=' ' ? <></> : <IonLabel position="floating">NO pudo ingresar</IonLabel>}
            {error ? <IonLabel position="floating">error se encontro</IonLabel> : <></>}
        </form>

    );
}

export default LogInForm;