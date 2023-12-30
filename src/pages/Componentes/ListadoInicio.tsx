import { IonCol, IonLabel, IonRow, IonTitle } from "@ionic/react";
import React from "react";
import CardNoticias from "./Cards/CardNoticias";
import CardCategoria from "./Cards/CardCategoria"
import { useStorage } from "./Context/useStorage";


let categorias=[
    {title:"inicio1",text:"kasndka",url: "/"},
    {title:"Organicaciones",text:"kasndka",url: "/ONG"},
    {title:"inicio3",text:"kasndka",url: "/"},
    {title:"inicio4",text:"kasndka",url: "/"},
    {title:"inicio5",text:"kasndka",url: "/"}
]
let noticias=[
    {titulo:"Noticia1",text:"mucho texto de la noticia 1"},
    {titulo:"Noticia2",text:"mucho texto de la noticia 2"},
    {titulo:"Noticia3",text:"mucho texto de la noticia 3"} 
]



function ListadoInicio(){
    
    const {usur}=useStorage();
    

    fetch("http://localhost:8080/api/users/:id")
    .then(res=>{console.log(res)})

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