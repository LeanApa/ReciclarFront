import React from "react";

import { IonItem, IonLabel,IonInput, IonButton,IonToggle, IonRow, IonCol, IonText } from "@ionic/react";
import { useState } from "react";
import { Redirect } from 'react-router-dom';
import { DefaultSerializer } from "v8";
import { useAppContext } from "../Context/Context";

import { variables } from "../../../Config/variableDeEntorno";




function SignInForm () {

    const {loginWithGoogle}=useAppContext()

    const [toggleValue, setToggleValue] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValid, setIsValid] = useState<boolean>();

    const [registrado,setRegistrado] = useState(false);

    const handleToggleChange = (event: CustomEvent) => {
        setToggleValue(event.detail.checked);
    };


    const validar = (ev:Event,setContra:Function)=>{
        const value = (ev.target as HTMLInputElement).value;
        setContra(value)
        if(confirmPassword == value || password==value) setIsValid(true)
        else setIsValid(false)
    }

    function registrarUsuario (event:any){

        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target))

        fetch(`${variables.URL}/users/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(respuesta=>respuesta.json())
        .then(data=>{
            //ToDo: hacer cartel emergente diciendo que se pudo crear la cuenta
            alert("se creo el usuario")
            console.log(data)
            setRegistrado(true)
        }).catch(error=>{
            console.log(error)
            setRegistrado(false)
        })
    }

    function registrarEmpresa (event:any){
        const data = Object.fromEntries(new FormData(event.target))

        fetch(`${variables.URL}/company/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(respuesta=>respuesta.json())
        .then(data=>{
            //ToDo: hacer cartel emergente diciendo que se pudo crear la cuenta
            console.log(data)
            setRegistrado(true)
        }).catch(error=>{
            console.log("aca hay un error")
            console.log(error)
            setRegistrado(false)
        })
    }

    function registrarGoogle (event:any){
        event.preventDefault();
        var a = loginWithGoogle()
        console.log(a)
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
  
            //////////////////////////REGISTRAR EMPRESA/////////////////////////////////
            <form onSubmit={registrarEmpresa} method="POST">
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
                    <IonLabel position="floating">Confirmar Password</IonLabel>
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
                <IonButton type="submit" expand="block">Registrarse</IonButton>
            </form>
            : 
            //////////////////////////REGISTRAR USUARIO/////////////////////////////////
            <>
                <form onSubmit={registrarUsuario} method="POST">
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
                        <IonLabel position="floating">Confirmar Password</IonLabel>
                        <IonInput type="password" placeholder="Enter text" name="passwordConfirmado" onIonChange={(e) => validar(e,setConfirmPassword)}></IonInput>
                    </IonItem>
                    <IonButton type="submit" expand="block">Registrarse</IonButton>
                </form>

                <IonButton expand="block" onClick={registrarGoogle}>Ingresar con Google</IonButton>
            </>
            }
        </>
        
    );
}




export default SignInForm;