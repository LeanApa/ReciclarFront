import React, { useState } from 'react'
import { IonCol, IonSearchbar, IonRow, IonTitle } from "@ionic/react";

import CardCategoria from './Cards/CardCategoria';



function ListadoOng(){

    let organizaciones=[
        {title:"NombreONG1",text:"detalle ONG1"},
        {title:"NombreONG2",text:"detalle ONG2"},
        {title:"NombreONG3",text:"detalle ONG3"},
        {title:"PruebaONG4",text:"detalle ONG4"},
    ]

    let [results, setResults] = useState([...organizaciones]);


    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
    
        setResults(organizaciones.filter((d) => d.title.toLowerCase().indexOf(query) > -1));
      };

    return <>
        <IonTitle className="TituloTexto">
            ONG y Asociaciones
        </IonTitle>

        <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>

        <IonRow className="ion-justify-content-center ion-align-items-center" >
            {
            results.map(org=>
                <IonCol size="4" >
                    <CardCategoria prop={org} />
                </IonCol>   
            )}
        </IonRow>



    </>

}



export default ListadoOng;