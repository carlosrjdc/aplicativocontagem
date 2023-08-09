import  Axios  from "axios";
import { useContext, useEffect, useState } from "react";
import { View,FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Text } from "react-native-paper";
import { UserContext } from "../../../contexts/userProvider";
import moment from "moment"
import ModalEditar from "./modalEditar";
import BotaoFlutuante from "../listaDemanda/botaoFlutuante";
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

export default function ListaEditarContagem(){
    const{idDemanda,listaContagem, setListaContagem}=useContext(UserContext)
    const[infoSelecionada, setInfoSelecionada] = useState<IContagem>()
    const[visible, setVisible] = useState(false)

    function ver(item:IContagem){
        setInfoSelecionada(item)
        setVisible(true)
    }

    const Renderizar = (item: IContagem) => 
    {
        
        return <TouchableOpacity onPress={()=> ver(item)} style={{marginHorizontal:16, padding:16, backgroundColor:"#85a5c5",margin:2}}>
            <ModalEditar info={infoSelecionada} visible={visible} setVisible={setVisible}/>
            <View style={{flexDirection:"row", justifyContent:"space-between"}} >
                <Text style={styles.texto}>{item.enderecoId}</Text>
                <Text style={styles.texto}>{item.produtoId}</Text>
                </View>

                <View style={{flexDirection:"row", justifyContent:"space-between"}} >

                    <Text style={styles.texto}>{item.quantidadecx} - Cxs</Text>
                    <Text style={styles.texto}>{item.quantideUn} - Unds</Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-between"}} >
                <Text style={styles.texto}>FAB: {moment(item.fabricacao).format("DD/MM/YYYY")}</Text>
                    <Text style={styles.texto}>SIF - {item.sif}</Text>
                </View>


        </TouchableOpacity>
        }
      

    async function listarContagemDaDemanda(){
        return await Axios.get(`https://wmsapi.vercel.app/estoque/contagempordemanda/${idDemanda}`)
        .then(response => setListaContagem(response.data))
        .catch(erro => Alert.alert("erro, Açao não executada"))
    }

    const contagemFiltrada = listaContagem.filter(filtrar => filtrar.quantidadecx !== null)

    useEffect(()=>{
        listarContagemDaDemanda()
    },[])

    return <SafeAreaView style={{flex:1}}>
        <Cabecalho titulo="EDITAR"/>
        <FlatList
        data={contagemFiltrada}
        renderItem={({item}) => <Renderizar {...item}/>}
        keyExtractor={item => item.id.toString()}
      />
      <BotaoFlutuante atualizar={()=>{listarContagemDaDemanda()}}/>
    </SafeAreaView>
}


const styles = StyleSheet.create({
    texto:{
        fontSize:16,
        fontWeight:"700"
    }
})