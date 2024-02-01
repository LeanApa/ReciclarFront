import React from "react";

import { IonItem, IonLabel,IonInput, IonButton,IonToggle, IonRow, IonCol, IonText } from "@ionic/react";
import { useState } from "react";




function SignInForm () {

    const [toggleValue, setToggleValue] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValid, setIsValid] = useState<boolean>();

    const handleToggleChange = (event: CustomEvent) => {
        setToggleValue(event.detail.checked);
    };


    const validar = (ev:Event,setContra:Function)=>{
        const value = (ev.target as HTMLInputElement).value;
        setContra(value)
        if(confirmPassword == value || password==value) setIsValid(true)
        else setIsValid(false)
    }

    function registrarse (event:any){
        const data = Object.fromEntries(new FormData(event.target))

        fetch("http://localhost:8080/api/users/register",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(respuesta=>respuesta.json())
        .then(data=>{

        }).catch(error=>{})
    }

    return(
        <>
            <IonRow class="ion-align-items-center">
                <IonCol size="auto">
                    <IonLabel>Soy una Empresa</IonLabel>
                </IonCol>
                <IonCol size="auto">
                    <IonToggle checked={toggleValue} onIonChange={handleToggleChange}/>
                </IonCol>
            </IonRow>
            
            

            {toggleValue ? 
  
            //////////////////////////REGISTRAR USUARIO/////////////////////////////////
            <form onSubmit={registrarse} method="POST">
                {/*************MAIL************/}
                <IonItem>
                    <IonLabel position="floating">CUIT</IonLabel>
                    <IonInput placeholder="Enter text" name="CUIT"></IonInput>
                </IonItem>
                {/*************PASSWORD************/}
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" placeholder="Enter text" name="password" onIonChange={(e) => validar(e,setPassword)}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Confirmacuin Password</IonLabel>
                    <IonInput type="password" placeholder="Enter text" onIonChange={(e) => validar(e,setConfirmPassword)}/>
                    <IonText color="danger">{isValid === false ? 'La contrasenia no conciden' : ''}</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Nombre de la empresa</IonLabel>
                    <IonInput type="text" placeholder="Enter text" name="name"/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Direccion</IonLabel>
                    <IonInput type="text" placeholder="Enter text" name="headquarters"/>
                </IonItem>
                <IonButton type="submit">Registrarse</IonButton>
            </form>
            : 
            //////////////////////////REGISTRAR EMPRESA/////////////////////////////////
            <form>
                <IonRow>
                    <IonCol size-lg="12" size-xl="5" size="12">
                        <IonItem>
                            <IonLabel position="floating">Nombre</IonLabel>
                            <IonInput type="text" placeholder="Enter text" name="first_name"/>
                        </IonItem>
                    </IonCol>
                    <IonCol size-lg="9" size-xl="4" size="12">
                        <IonItem>
                            <IonLabel position="floating">Apellido</IonLabel>
                            <IonInput type="text" placeholder="Enter text" name="last_name"/>
                        </IonItem>
                    </IonCol>
                    <IonCol size="3">
                        <IonItem>
                            <IonLabel position="floating">Edad</IonLabel>
                            <IonInput type="number" name="age"/>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonItem>
                    <IonLabel position="floating">Ciudad</IonLabel>
                    <IonInput placeholder="Enter text" name="city"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Direccion</IonLabel>
                    <IonInput placeholder="Enter text" name="address"></IonInput>
                </IonItem>
                {/*************MAIL************/}
                <IonItem>
                    <IonLabel position="floating">Mail</IonLabel>
                    <IonInput placeholder="Enter text" name="email"></IonInput>
                </IonItem>
                {/*************PASSWORD************/}
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" placeholder="Enter text" name="password" onIonChange={(e) => validar(e,setPassword)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Confirmacuin Password</IonLabel>
                    <IonInput type="password" placeholder="Enter text" name="passwordConfirmado" onIonChange={(e) => validar(e,setConfirmPassword)}></IonInput>
                </IonItem>
                <IonButton type="submit" >Registrarse</IonButton>
            </form>
            }
        </>
        
    );
}




export default SignInForm;