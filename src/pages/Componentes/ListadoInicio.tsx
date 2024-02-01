import { IonCol, IonLabel, IonRow, IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import CardNoticias from "./Cards/CardNoticias";
import CardCategoria from "./Cards/CardCategoria"
import { useStorage } from "./Context/useStorage";


let categorias=[
    {name:"inicio1",description:"kasndka",url: "/"},
    {name:"Organicaciones",description:"kasndka",url: "/ONG"},
    {name:"inicio3",description:"kasndka",url: "/"},
    {name:"inicio4",description:"kasndka",url: "/"},
    {name:"inicio5",description:"kasndka",url: "/"}
]



function ListadoInicio(){
    
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
    

    return <>
        <IonTitle className="TituloTexto">
            Inicio {usur?.nombre}
        </IonTitle>
        <IonRow>
            {
                categorias.map(categoria=>
                    <IonCol>
                        <CardCategoria prop={categoria}/>
                    </IonCol>
                    
            )}
        </IonRow>
        
        <IonTitle size="large" className="ion-padding TituloTexto ion-margin ion-text-center">
            Noticias y Novedades
        </IonTitle>

        <IonRow>
            {
                noticias.map((nota,index)=>
                    <>
                    { index<noticias.length-1 ?
                        <IonCol size="6">
                            <CardNoticias prop={nota}/>
                        </IonCol>
                        :
                        <IonCol >
                            <CardNoticias prop={nota}/>
                        </IonCol>
                    }
                    </>   
            )}
        </IonRow>

    </>

}



export default ListadoInicio;