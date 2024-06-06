import React from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonNav, IonNavLink } from "@ionic/react";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";

const styleHeader = {
    background:"#B4EC89",
    backgroundColor:"#B4EC89"
}

const Menu: React.FC = () => {

  const paths = [
    {name: 'Inicio',url: "/"},
    {name: 'ONG',url: "/ONG"},
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
              <IonItem>
                <Link to={item.url}>{item.name}</Link>
              </IonItem>
              
            </IonMenuToggle>
          )}
        </IonContent>
      </IonMenu>   
    );
}

export default Menu;