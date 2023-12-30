import React from "react";

import { IonCard, IonCardContent, IonCardHeader,IonCardTitle} from "@ionic/react";
import LogInForm from "../Forms/LogInForm";
import SignInForm from "../Forms/SignInForm";


interface CardLogProp{
    prop:any;
}

const CardUsuarioLogIn: React.FC<CardLogProp> = ({prop}) => {


    return (
        <IonCard style={{height:'40rem' }}>
            <IonCardHeader>
                <IonCardTitle>{prop.titulo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {prop.titulo == "Log in" ? <LogInForm/>:<></>}
                {prop.titulo == "Sign in" ? <SignInForm/>:<></>}
            </IonCardContent>
        </IonCard>)
}


export default CardUsuarioLogIn;