import React, { useEffect, useState } from 'react'
import { useAppContext } from "./Context/Context";
import { variables } from '../../Config/variableDeEntorno';
import CardReciclables from './Cards/CardReciclables';
import { IonCol, IonRow } from "@ionic/react";


function ListadoPlanillaVerde(){

    const [reciclables,setReciclables] = useState([])

    const { token} = useAppContext();

    useEffect(()=>{
        fetch(`${variables.URL}/reciclables/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': token
            }
        })
        .then(respuesta =>{
            if(!respuesta.ok){
                throw new Error('La solicitud sobre los reciclables no fue exitosa');
            }
            return respuesta.json()
        })
        .then(data=>{
            console.log(data)
            setReciclables(data)
        })

    },[])
    

    return (
        <IonRow class="ion-justify-content-center">
            
            {reciclables.map((reciclable)=>(            
                <IonCol sizeLg='3' sizeMd='6' sizeXs='12' >
                    agregar buscador
                    <CardReciclables prop={reciclable}/>
                </IonCol>
            ))}
        </IonRow>
    )

}



export default ListadoPlanillaVerde;