import React, { useEffect, useState } from 'react'
import { IonCol, IonSearchbar, IonRow, IonTitle } from "@ionic/react";

import CardCategoria from './Cards/CardCategoria';

interface Org {
    name:string;
    description:string;
}

function ListadoOng(){

    /*
    let organizaciones=[
        {title:"NombreONG1",text:"detalle ONG1"},
        {title:"NombreONG2",text:"detalle ONG2"},
        {title:"NombreONG3",text:"detalle ONG3"},
        {title:"PruebaONG4",text:"detalle ONG4"},
    ]
    */
  

    let [results, setResults] = useState<Org[]>([]);
    let [filtrado,setFiltrado]=useState<Org[]>([])

    useEffect(()=>{
        fetch("http://localhost:8080/api/company/",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',    
            }
        }).then(Response=> Response.json())
        .then(data=>{ 
            setResults(data)
            
            setFiltrado(data)
        })
        .catch(err=>{;
        })

    },[])
    
    console.log(filtrado)

    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
    
        setFiltrado(results.filter((d) => d.name.toLowerCase().indexOf(query) > -1));
      };

    return <>
        <IonTitle className="TituloTexto">
            ONG y Asociaciones
        </IonTitle>

        <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>

        <IonRow className="ion-justify-content-center ion-align-items-center" >
            {
            filtrado.map(org=>
                <IonCol size="4" >
                    <CardCategoria prop={org} />
                </IonCol>   
            )}
        </IonRow>



    </>

}



export default ListadoOng;