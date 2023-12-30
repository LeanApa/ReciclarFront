import { useEffect, useState } from "react";
import {Storage} from "@ionic/storage"

//npm install @ionic/storage
//Se importo la libreria que se menciona arriba

const USUARIO_KEY = 'my_USUR';

export interface UsurItem {
    nombre: string;
    token: string
    id:string;    
}


export function useStorage() {
    const [store,setStore] = useState<Storage>()
    const [usur,setUser] = useState<UsurItem>({
        nombre: '',
        token:'',
        id:''
    })

    useEffect(()=>{
        const initStorage = async () =>{
            const newStore = new Storage({
                name: 'UserRecdb',

            });
            const store = await newStore.create();
            setStore(store);
            
            const storeUsur = await store.get(USUARIO_KEY) || [];
            setUser(storeUsur);
        }

        initStorage();

    },[])


    const setName = async(nombre2: string) =>{
        usur.nombre = nombre2
        setUser(usur)
    }

    const setToken = async (tokenNew: string)=>{
        usur.token = tokenNew
        setUser(usur)
        store?.set(USUARIO_KEY,usur)
    }

    

    return{
        usur,
        setName,
        setToken
    }
}