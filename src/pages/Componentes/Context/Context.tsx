import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '../../../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  usuario: string;
  setUsuario: React.Dispatch<React.SetStateAction<string>>;
  loginWithGoogle : Function;
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
  const [usuario, setUsuario] = useState<string>("");
  
 
  useEffect(()=>{
    const suscribed = onAuthStateChanged(auth, (currentUser)=>{
      if(!currentUser){
        console.log("NO HAY USUARIO suscripto")
        setUsuario("")
      }else{
        console.log(currentUser)
        
      }
      
    })
  })

  const loginWithGoogle = async () =>{
    const responseGoogle = new GoogleAuthProvider()
    return signInWithPopup(auth,responseGoogle)
  }



  return (
    <AppContext.Provider value={{
      usuario,
      setUsuario,
      loginWithGoogle
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
