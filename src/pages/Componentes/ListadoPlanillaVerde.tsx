import React, { useEffect, useState } from 'react'
import { useAppContext } from "./Context/Context";
import { variables } from '../../Config/variableDeEntorno';
import CardReciclables from './Cards/CardReciclables';
import { IonCol, IonRow, IonSearchbar } from "@ionic/react";

interface PlanillaProp{
    createdAt:string;
    user:{};
    __v:number
    reciclables:ReciclablePlanilla[];
    _id:string;
}

interface ReciclablePlanilla {
    reciclable:{
        createdAt: string
        description:string; 
        imageUrl:string;
        title: string;
        __v: number;
        _id: string;
    }
    _id: string;
}
interface ReciclableProp{
    createdAt: string
    description:string; 
    imageUrl:string;
    title: string;
    __v: number;
    _id: string;
}

function ListadoPlanillaVerde(){

    const [reciclables,setReciclables] = useState([])
    const [planilla,setPlanilla] = useState<PlanillaProp>()
    const [filtrado,setFiltrado] = useState<ReciclableProp[]>([])
    

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
            setReciclables(data)
        })

        fetch(`${variables.URL}/planillaverde/`,{
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
            
            setPlanilla(data)
        })

        
    },[])
    
    function verificarCargados(reciclableActual){
        
        let encontro = false;
        console.log(reciclables)
        return(planilla.reciclables.some(element=>reciclableActual._id==element.reciclable._id))
    }

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

            { planilla ==null?

            <></>
            :
            <>
                <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>
                {chunkArray(filtrado, 2).map((grupo, index) => (
                    <IonRow key={index} class="ion-justify-content-center">
                        {grupo.map((reciclable, i) => (
                            
                            <IonCol key={i} sizeLg='3' sizeMd='6' sizeXs='12'>
                                {/* Agrega el buscador aquí si es necesario */}
                                <CardReciclables prop={reciclable} cargado={verificarCargados(reciclable)}/>
                            </IonCol>
                        ))}
                    </IonRow>
                ))}
            </>
            }
            
        </>

    )

}



export default ListadoPlanillaVerde;