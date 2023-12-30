import React from "react";

import { IonItem, IonLabel,IonInput, IonButton } from "@ionic/react";




function SignInForm () {


    return(
        <form>
            {/*************MAIL************/}
            <IonItem>
                <IonLabel position="floating">Mail2</IonLabel>
                <IonInput placeholder="Enter text"></IonInput>
            </IonItem>
            {/*************PASSWORD************/}
            <IonItem>
                <IonLabel position="floating">Password2</IonLabel>
                <IonInput type="password" placeholder="Enter text"></IonInput>
            </IonItem>
            <IonButton type="submit">Ingresar</IonButton>
        </form>
    );
}




export default SignInForm;