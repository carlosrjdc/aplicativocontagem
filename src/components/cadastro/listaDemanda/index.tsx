import  Axios  from "axios";
import { useContext, useEffect, useState } from "react";
import { View,FlatList, Alert } from "react-native";
import { Text } from "react-native-paper";
import { UserContext } from "../../../contexts/userProvider";
import BotaoFlutuante from "./botaoFlutuante";
import Cabecalho from "../../cabecalho";

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

export default function ListaDemanda(){
    const{idDemanda,listaContagem, setListaContagem}=useContext(UserContext)
  
    const Renderizar = (item: IContagem) => 
    {
        return <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:16, padding:16, backgroundColor:"#85a5c5",margin:2}} >
          <Text>{item.id}</Text>
          <Text>{item.enderecoId}</Text>
        </View>
        }
      

    async function listarContagemDaDemanda(){
        return await Axios.get(`https://wmsapi.vercel.app/estoque/contagempordemanda/${idDemanda}`)
        .then(response => setListaContagem(response.data))
        .catch(erro => Alert.alert("erro, Ação não realizada!"))
    }

    useEffect(()=>{
        listarContagemDaDemanda()
    },[])

    const contagemFiltrada = listaContagem.filter(filtrar => filtrar.quantidadecx === null)

    return <View style={{flex:1}}>
        <Cabecalho titulo="LISTA"/>
            <FlatList
            data={contagemFiltrada}
            renderItem={({item}) => <Renderizar {...item}/>}
            keyExtractor={item => item.id.toString()}
        />
      <BotaoFlutuante atualizar={()=>{listarContagemDaDemanda()}}/>
    </View>
}