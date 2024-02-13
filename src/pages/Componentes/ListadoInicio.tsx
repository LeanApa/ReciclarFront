import { IonButton, IonCol, IonLabel, IonRow, IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import CardNoticias from "./Cards/CardNoticias";
import CardCategoria from "./Cards/CardCategoria"
import { useStorage } from "./Context/useStorage";
import { useAppContext } from "./Context/Context";


let categorias=[
    {name:"inicio1",description:"kasndka",url: "/"},
    {name:"Organicaciones",description:"kasndka",url: "/ONG"},
    {name:"inicio3",description:"kasndka",url: "/"},
    {name:"inicio4",description:"kasndka",url: "/"},
    {name:"inicio5",description:"kasndka",url: "/"}
]



function ListadoInicio(){
    
    const {usuario}=useAppContext();
    const {usur}=useStorage();

    const [noticias,setNoticias] = useState([])
    
    useEffect(()=>{
        fetch("http://localhost:8080/api/posts/",{
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

    return (
        <React.Fragment key="listadoInicio">
            <IonTitle className="TituloTexto">
                Inicio 
            </IonTitle>
            <IonButton onClick={imprimier}>aaa</IonButton>
            <IonRow key="fila_categoria">
            {
                categorias.map((categoria, index) =>
                <IonCol key={categoria.name + '-' + index}>
                    <CardCategoria prop={categoria} />
                </IonCol>
                )
            }
            </IonRow>

            <IonTitle key="Noticias_Novedades" size="large" className="ion-padding TituloTexto ion-margin ion-text-center">
                Noticias y Novedades
            </IonTitle>

            <IonRow>
            {
                noticias.map((nota, index) =>
                <React.Fragment key={"nota-" + index}>
                    {index < noticias.length - 1 ?
                    <IonCol key={"nota-" + index} size="6">
                        <CardNoticias prop={nota} />
                    </IonCol>
                    :
                    <IonCol key={"nota-" + index}>
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