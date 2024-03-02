import { IonButton, IonCol, IonLabel, IonRow, IonTitle, useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import CardNoticias from "./Cards/CardNoticias";
import CardCategoria from "./Cards/CardCategoria"
import { useStorage } from "./Context/useStorage";
import { useAppContext } from "./Context/Context";
import { Link, NavLink, useHistory } from 'react-router-dom';

import { variables } from "../../Config/variableDeEntorno";

let categorias=[
    {datos:{name:"inicio1",description:"kasndka"},url: "/"},
    {datos:{name:"Organicaciones",description:"kasndka"},url: "/ONG"},
    {datos:{name:"inicio1",description:"kasndka"},url: "/"},
    {datos:{name:"inicio1",description:"kasndka"},url: "/"},
    {datos:{name:"inicio1",description:"kasndka"},url: "/"}
]



function ListadoInicio(){
    const history = useHistory();
    const navigation = useIonRouter();
    const {usuario}=useAppContext();
    const {usur}=useStorage();

    const [noticias,setNoticias] = useState([])
    
    useEffect(()=>{
        fetch(`${variables.URL}/posts/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',    
            }
        })
        .then(respuesta=> respuesta.json()).then(data=>{
            setNoticias(data)
        })
        .catch(error=>{})
    },[])

    function imprimier(){
        console.log(usuario)
    }

    const redirectToONGPage = () => {
        navigation.push('/ONG','root',"replace")
      };

    return (
        <React.Fragment key="listadoInicio">
            <IonTitle className="TituloTexto">
                Inicio 
            </IonTitle>
            <IonButton routerLink="/misChats">chats</IonButton>
            <IonRow key="fila_categoria">
            {
                categorias.map((categoria, index) =>
                <IonCol key={categoria.datos.name + '-' + index}>
                    <CardCategoria prop={categoria} />
                </IonCol>
                )
            }
            </IonRow>

            <IonTitle  size="large" className="ion-padding TituloTexto ion-margin ion-text-center">
                Noticias y Novedades
            </IonTitle>

            <IonRow>
            {
                noticias.map((nota, index) =>
                <React.Fragment >
                    {index < noticias.length - 1 ?
                    <IonCol key={nota.id} size="6">
                        <CardNoticias prop={nota} />
                    </IonCol>
                    :
                    <IonCol key={nota.id}>
                        <CardNoticias prop={nota} />
                    </IonCol>
                    }
                </React.Fragment>
                )
            }
            </IonRow>
        </React.Fragment>
        )

}



export default ListadoInicio;