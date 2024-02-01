import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  usuario: string;
  setUsuario: React.Dispatch<React.SetStateAction<string>>;
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

  return (
    <AppContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
