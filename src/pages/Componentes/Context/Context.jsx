import React, {useContext,createContext, useState} from "react";
//import firebase from 'firebase';

const ProfileContext = createContext([])

export const useProfileContext = () => useContext(ProfileContext);

const clienteVacio ={nombre:'',mail:'',direccion:'',numero:''};


function ProfileContexProvaider ({ children }){
    
    const [cliente,setCliente] = useState(clienteVacio);


    return (
        <ProfileContext.Provider value={{
            setCliente,
            cliente
            }}>{children}
        </ProfileContext.Provider>
    );
}


export default ProfileContexProvaider;