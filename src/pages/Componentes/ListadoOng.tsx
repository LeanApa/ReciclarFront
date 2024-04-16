import React, { useEffect, useState } from 'react'
import { IonCol, IonSearchbar, IonRow, IonTitle } from "@ionic/react";
import { Link } from 'react-router-dom';
import CardCategoria from './Cards/CardCategoria';

import { variables } from "../../Config/variableDeEntorno";

interface Org {
    name:string;
    description:string;
    _id:string;
}

function ListadoOng(){
    

    let [results, setResults] = useState<Org[]>([]);
    let [filtrado,setFiltrado]=useState<Org[]>([])
    
    useEffect(()=>{
        fetch(`${variables.URL}/company/`,{
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
                    <CardCategoria prop={{datos:org, url: "/ONG/"+org._id}} />
                </IonCol>   
            )}
        </IonRow>



    </>

}



export default ListadoOng;