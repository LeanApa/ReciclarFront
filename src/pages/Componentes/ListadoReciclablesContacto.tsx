import React, { useEffect, useState } from 'react'
import { useAppContext } from "./Context/Context";
import { variables } from '../../Config/variableDeEntorno';
import CardReciclablesContacto from './Cards/CardReciclablesContacto';
import { IonAvatar, IonButton, IonCard, IonCol, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSpinner, IonTitle } from "@ionic/react";
import { Redirect, useParams } from 'react-router';
import { arrowBackOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

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

interface ParametroProp{
    id:string
}
interface ParametroChat{
    _id:string
}


function ListadoReciclablesContacto(){


    const idReciclable = useParams<ParametroProp>();

    const [usuarios,setUsuarios] = useState([])
    const [miChat,setMiChat] = useState<ParametroChat>()


    const {usuario, token} = useAppContext();

    useEffect(()=>{
        fetch(`${variables.URL}/planillaverde/all`,{
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
            
            obtenerListadoUsuarios(data)
        })

    },[])
    
    function obtenerListadoUsuarios(planilla){
        let usuario = []
        planilla.forEach(element=>{
            element.reciclables.map(reciclable=>{
                if(reciclable.reciclable==null) return
                if(reciclable.reciclable._id==idReciclable.id) usuario.push(element.user)
            })
            
        })
        setUsuarios(usuario)
    }

    function contactar(idContacto){
        fetch(`${variables.URL}/chat`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': token
            },
            body: JSON.stringify({userId:idContacto})
        })
        .then(respuesta =>{
            if(!respuesta.ok){
                throw new Error('La solicitud sobre los reciclables no fue exitosa');
            }
            return respuesta.json()
        })
        .then(data=>{
            console.log("pruebaContactar",data)
            setMiChat(data)
            
        })
        
    }

    if(miChat){
        return <Redirect to={`/misChats/${miChat._id}`} />
    }

    return (
        
        <>

            {
                usuario.role=='USER' ?

                <><p>error esta pagina es solo para empresas</p></>
                :
                <>
                {usuarios==null ?
                <IonSpinner/>
                :
                <>
                    <IonTitle  size="large" className="ion-padding TituloTexto ion-margin">
                        Personas que tienen el reciclable ...
                    </IonTitle>
                    <Link to={`/Perfil/Reciclables`}>
                        <IonFab horizontal="start" vertical="bottom" slot="fixed">
                            <IonFabButton >
                                <IonIcon icon={arrowBackOutline} />
                            </IonFabButton>
                        </IonFab>
                    </Link>
                    
                    <IonRow class="ion-justify-content-center">
                        <IonCol sizeMd='6'>
                            <IonCard>
                                <IonList >
                                    {usuarios.map(usuario=>(
                                        <IonRow class='ion-align-items-center'>
                                            <IonCol >
                                                <IonItem button>
                                                <IonAvatar aria-hidden="true" slot="start">
                                                    <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                                </IonAvatar>
                                                <IonLabel>{usuario.first_name==null ? usuario.first_name : usuario.first_name +" "+ usuario.last_name}</IonLabel>
                                                </IonItem>
                                            </IonCol>
                                            <IonCol size="auto">
                                                <IonButton onClick={()=>contactar(usuario._id)}>Contactar</IonButton>
                                            </IonCol>
                                        </IonRow>

                                    ))}                           
                                </IonList>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </>
                }
                </>

            }

        </>

    )

}



export default ListadoReciclablesContacto;