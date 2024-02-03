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

        fetch("http://localhost:8080/api/sessions/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(Response=> Response.json())
        //ver dependiendo el valor de 200 o 404 entre o no el rebot y manda un mensaje
        .then(data=>{
            
            setKey(data.accessToken)
            setMensaje(data.message)
            setToken(key)
            setIngresado(true)
            setUsuario(data)
            setLoggedIn(true)
            console.log(data)
            console.log("ingreso correctamente")
        })
        .catch(err=>{
            console.log("error al ingresar" )
            setError(false);
        })
    }
    if(loggedIn){
        return <Redirect to="/" />
    }

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
            <IonButton type="submit" expand="block">Ingresar</IonButton>
            {mensaje!=="Invalid user or password" ? <></> : <IonLabel position="floating">NO pudo ingresar</IonLabel>}
            {error ? <IonLabel position="floating">error se encontro</IonLabel> : <></>}
        </form>

    );
}

export default LogInForm;