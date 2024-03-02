import React from 'react';
import { IonPage, IonContent, IonLabel, IonCol, IonRow } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Context/Context'
import { useState, useEffect } from 'react';


import NavBar from '../BarraMenu/NavBar';
import CardEmpresaDetalle from '../Cards/CardEmpresaDetalle';

function EmpresaDetail(){

    const { id } = useParams<{ id: string }>();
    const [empresaDetail, setEmpresaDetail] = useState<any>(null); // Asegúrate de ajustar el tipo según la estructura de tus datos
    const { obtenerEmpresaPorId } = useAppContext();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const Empresa = await obtenerEmpresaPorId(id);
          setEmpresaDetail(Empresa);
        } catch (error) {
          console.error('Error al obtener el empresa:', error);
        }
      };
  
      fetchData();
    }, [id, obtenerEmpresaPorId]);

    return (

        <IonPage id="ONG-DETALLE" >
            <NavBar />
            <IonContent className="ion-padding">
                
                {
                empresaDetail ? (
                    <IonRow class="ion-justify-content-center ion-align-items-center">
                      <IonCol size='6'>
                        <CardEmpresaDetalle prop={empresaDetail}/>
                      </IonCol>
                    </IonRow>
                    )
                    :
                    (
                    <IonLabel>
                        cargando
                    </IonLabel>
                    )                
                }
    
            </IonContent>
        </IonPage>

    )
}



export default EmpresaDetail;