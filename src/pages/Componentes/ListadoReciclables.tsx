import React, { useEffect, useState } from 'react'
import { useAppContext } from "./Context/Context";
import { variables } from '../../Config/variableDeEntorno';
import CardReciclablesContacto from './Cards/CardReciclablesContacto';
import { IonCol, IonLabel, IonRow, IonSearchbar } from "@ionic/react";


interface ReciclableProp{
    createdAt: string
    description:string; 
    imageUrl:string;
    title: string;
    __v: number;
    _id: string;
}

function ListadoReciclables(){

    const [reciclables,setReciclables] = useState([])
    const [filtrado,setFiltrado] = useState<ReciclableProp[]>([])
    

    const {usuario, token} = useAppContext();

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
            console.log(`TE4NGO FATA`,data)
            setFiltrado(data)
            setReciclables(data)
        })        
    },[])
    

    function handleInput(ev){
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
        
        setFiltrado(reciclables.filter((d) => d.title.toLowerCase().indexOf(query) > -1));
    }

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }


    return (
        
        <>

            {
                usuario.role=='USER' ?

                <><p>error esta pagina es solo para empresas</p></>
                :
                <>
                <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>
                {chunkArray(filtrado, 2).map((grupo, index) => (
                    <IonRow key={index} class="ion-justify-content-center">
                        {grupo.map((reciclable, i) => (
                            
                            <IonCol key={i} sizeLg='3' sizeMd='6' sizeXs='12'>
                                
                                <CardReciclablesContacto prop={reciclable}/>
                            </IonCol>
                        ))}
                    </IonRow>
                ))}
                </>


            }
        </>

    )

}



export default ListadoReciclables;