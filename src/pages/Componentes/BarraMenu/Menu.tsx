import React from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonNav, IonNavLink } from "@ionic/react";

const styleHeader = {
    background:"#B4EC89",
    backgroundColor:"#B4EC89"
}

const Menu: React.FC = () => {

  const paths = [
    {name: 'Inicio',url: "/"},
    {name: 'ONU',url: "/ONG"},
    {name: 'LogIn',url: "/LogIn"},
    {name: 'Planilla Verde', url:"/PlanillaVerde"},
    {name: 'Perfil', url:"/Perfil"}
  ]

    
    return(
        <IonMenu contentId="main-content">
        <IonHeader style={styleHeader}>
          <IonToolbar color="#B4EC89" className="TituloTexto">
            <IonTitle>Menu</IonTitle>    
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {paths.map((item, index)=>
            <IonMenuToggle key={item+'-'+index}>
              <IonItem routerLink={item.url}>{item.name}</IonItem>
            </IonMenuToggle>
          )}
        </IonContent>
      </IonMenu>   
    );
}

export default Menu;