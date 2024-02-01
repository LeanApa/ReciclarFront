import React, { useEffect, useState } from 'react'
import CardUsuarioLogIn from './Cards/CardUsuarioLogIn';
import { IonCol, IonRow } from '@ionic/react';
import { useStorage } from "../Componentes/Context/useStorage";



function verificarUsuarioIngresado(token:string) {

    let data;

    fetch("http://localhost:8080/api/users/",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accessToken':token
            },
            body: JSON.stringify(data)
        }).then(Response=> Response.json())
        .then(data=>{ 
            console.log(data.accessToken +"******"+data.message)
            
        })
        .catch(err=>{;
        })

}


/*

function verificarUsuarioIngresado(setIngresado : (valor:boolean) => void, token:string) {

    let data;

    fetch("http://localhost:8080/api/users/",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accessToken':token
            },
            body: JSON.stringify(data)
        }).then(Response=> Response.json())
        .then(data=>{ 
            console.log(data.accessToken +"******"+data.message)
            
        })
        .catch(err=>{;
        })

}
}

*/

function ListadoLogIn() {
    
    const { usur, ingresado} = useStorage();
    
    verificarUsuarioIngresado(usur.token)
    const LogIn = {titulo:"Log in"}

    const SignIn = {titulo:"Sign in"}

    return <>
        <IonRow class="ion-margin-vertical ion-justify-content-center">
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn prop={LogIn}/>
            </IonCol>
            <IonCol size="12" size-sm='5' class="ion-margin-vertical">
                <CardUsuarioLogIn prop={SignIn} />
            </IonCol>
            
        </IonRow>

    </>
}


export default ListadoLogIn;