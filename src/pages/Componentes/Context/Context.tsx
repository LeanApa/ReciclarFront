import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '../../../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { UsurItem } from './useStorage';

import { variables } from "../../../Config/variableDeEntorno";

interface AppContextType {
  usuario: UsuarioType;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioType>>;
  obtenerUsuario: (token: string) => void;
  loginWithGoogle: Function;
  setToken: Function;
  modificarUsuario: Function;
  obtenerEmpresaPorId: (idUsur: string) => Promise<Org | null>;
  logOut: Function
  eliminarCuenta : Function
}

interface UsuarioType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  city: string;
  address: string;
  password: string;
  level: string;
  role: string;
  __v: number;
}

interface Org {
  name:string;
  description:string;
  _id:string;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppContextProvider');
  }
  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioType>();
  const [token,setToken] = useState("")


  
  const loginWithGoogle = async () => {
    try {
      const responseGoogle = new GoogleAuthProvider();  
      const response = await signInWithPopup(auth, responseGoogle);
      
      const registerResponse = await fetch(`${variables.URL}/users/registergoogle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });
  
      const data = await registerResponse.json();
  
  
      try {
        const respuesta = await fetch(`${variables.URL}/users/myaccount`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'accessToken': token
          }
        });
  
        const data = await respuesta.json();
        setUsuario(data);
      } catch (err) {
        console.log("Error al obtener el usuario:", err);
      }

      return data;
    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear el usuario.');
      return null; 
    }
  };

  async function obtenerUsuario(token: string) {
    try {
      const respuesta = await fetch(`${variables.URL}/users/myaccount`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accessToken': token
        }
      });

      const data = await respuesta.json();
      setUsuario(data);
    } catch (err) {
      console.log("Error al obtener el usuario:", err);
    }
  }

  async function obtenerEmpresaPorId(idUsur : string) {
    console.log("token: "+token)
    try {
      const respuesta = await fetch(`${variables.URL}/company/${idUsur}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accessToken': token
        }
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        console.log(data)
        return data
      } else {
        console.log('Error al obtener el usuario:', respuesta.statusText);
      }
    } catch (err) {
      console.log("Error al obtener el usuario:", err);
    }
    return null
  }

  async function modificarUsuario(usuarioNew:UsuarioType) {
    try {
        const respuesta = await fetch(`${variables.URL}/api/users/${usuario?._id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'accessToken': token
          },
          body: JSON.stringify(usuarioNew),
        })

    } catch (error) {
      console.log("ToDo no se pudo actualiszar el usuario")
    }
  }

  async function logOut() {
    setUsuario(null)
    setToken("")
  }

  async function eliminarCuenta() {
    try{
      fetch(`${variables.URL}/user/${usuario._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir cualquier otra cabecera necesaria, como tokens de autenticación, aquí
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error al eliminar el usuario. Código de estado: ${response.status}`);
          }
          console.log(`Usuario con ID ${usuario} eliminado exitosamente.`);
        })
        .catch(error => console.error(error));
    }catch{
      console.log("fallo al quere borrar el usuario")
    }
  }

  return (
    <AppContext.Provider value={{
      usuario,
      setUsuario,
      loginWithGoogle,
      obtenerUsuario,
      setToken,
      modificarUsuario,
      obtenerEmpresaPorId,
      logOut,
      eliminarCuenta
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
