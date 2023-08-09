import Axios from "axios";
import React,{createContext, useState} from "react";
import { Alert } from "react-native";

type MainContextData={
    autenticar: (usuario: string, senha: string) => Promise<string|null>;
    tkn: string | null
    setTkn:React.Dispatch<string|null>
    user: string| null
    setUser: React.Dispatch<string|null>
    id: number | null
    setId: React.Dispatch<number|null>
    role: string[]
    setRole: React.Dispatch<string[]>
    idDemanda:string,
    setIdDemanda:React.Dispatch<string>
    listaContagem:IContagem[]
    setListaContagem:React.Dispatch<IContagem[]>
}

type IContagem={
    id:number;
    demandaId:number;
    enderecoId:string;
    produtoId:number | null;
    sif:number | null;
    fabricacao:Date | null;
    quantidadecx:number | null;
    quantideUn:number | null;



}

export const UserContext = createContext({} as MainContextData)

const UserProvider =({children}:{children: React.ReactNode})=>{
    const [tkn, setTkn] = useState<string|null>("")
    const [id, setId] = useState<number|null>(null)
    const [user, setUser] = useState<string|null>(null)
    const [role, setRole] = useState<string[]>([])
    const[listaContagem, setListaContagem] = useState<IContagem[]>([])

    const [idDemanda, setIdDemanda] = useState("")

    const autenticar = async (usuario:string, senha:string): Promise<string|null> => {
        const infoToken = await Axios.post(`https://wmsapi.vercel.app/user/autenticar`,{
                usuario, senha
        }, {timeout:15000, headers:{"Content-Type":'application/json '}}).then(response => {
            const validarToken = verificarToken(response.data)
            if(validarToken){
                setTkn(response.data)
                return response.data
            }

        }).catch(erro=>  Alert.alert("erro, Ação não realizada!"))

        if(infoToken){
            return infoToken
        }else{
            return ""
        }
    }

    const verificarToken = (token:string) => {
        if (!token || typeof token !== 'string' || token.trim() === '') {
          return false;
        }
        return true;
      };
  

    return (<UserContext.Provider value={{autenticar,tkn,setTkn, id, setId, user, setUser, role, setRole,idDemanda,setIdDemanda,listaContagem, setListaContagem}}>
        {children}
        </UserContext.Provider>)
}

export default UserProvider