import { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, Alert, ScrollView } from 'react-native';
import { List, FAB, Avatar, Card, IconButton } from 'react-native-paper';
import ModalDemanda from './modal';
import { UserContext } from '../../contexts/userProvider';
import  Axios from 'axios';
import Cabecalho from '../cabecalho';

type IDemanda ={
    id:number;
    conferenteId:number;
    inventariosId:number;
    tipo:string|null;
    status:string|null;
    iniciado:Date | null;
    finalizado:Date |null;


}

export default function Demanda({navigation}:{navigation:any}){
    const{idDemanda,id,setIdDemanda}=useContext(UserContext)
    const [ ver, setVer] = useState(false)
    const [demandas, setDemandas] = useState<IDemanda[]>([])
    const [titulo,setTitulo]= useState("")

    async function confirmarAberturaDemanda(){
        return await Axios.put(`https://wmsapi.vercel.app/estoque/iniciardemanda/${idDemanda}`)
        .then(()=> {
                navigation.navigate("menuInferior")  
                setVer(false)    
        }).catch(erro => Alert.alert("erro, Ação não realizada!"))

    }

    async function carregarDemandas(){
        return await Axios.get(`https://wmsapi.vercel.app/estoque/demandaporusuario/${id}`)
        .then(response=> {
            setDemandas(response.data)
        })
        .catch(erro=> Alert.alert("erro, Ação não realizada!"))
    }

    function abrirModal(id:string, status:string){
        if(status === "Iniciado"){
            setIdDemanda(id)
            navigation.navigate("menuInferior")
            setTitulo(id)
        }else{
            setIdDemanda(id)
            setTitulo(id) 
            setVer(true)

        }
    }

    useEffect(()=>{
        carregarDemandas()
    },[])

    return (
        <ScrollView style={{flex:1}}>
            <Cabecalho titulo="DEMANDAS"/>
            <ModalDemanda acao={confirmarAberturaDemanda} titulo={titulo} visible={ver} setVisible={setVer}/>
            {demandas.map(item =>   <Card.Title key={item.id} titleStyle={{fontSize:24, fontWeight:"700"}}
                title={item.status}
                subtitle={item.tipo}
                left={(props) => <Avatar.Text size={44} label={item.id.toString()}/>}
                right={(props) => <IconButton {...props} size={38} icon="send-circle-outline" onPress={() => abrirModal(item.id.toString(), item.status as string)} />}
            
            />)}
        </ScrollView>

    )
}