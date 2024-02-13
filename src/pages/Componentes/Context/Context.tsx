import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '../../../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  usuario: UsuarioType;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioType>>;
  obtenerUsuario: (token: string) => void;
  loginWithGoogle: Function;
  setToken: Function;
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
    const responseGoogle = new GoogleAuthProvider();
    return signInWithPopup(auth, responseGoogle);
  };

  async function obtenerUsuario(token: string) {
    try {
      const respuesta = await fetch("http://localhost:8080/api/users/myaccount", {
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

  return (
    <AppContext.Provider value={{
      usuario,
      setUsuario,
      loginWithGoogle,
      obtenerUsuario,
      setToken
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
