import  Axios  from 'axios';
import * as React from 'react';
import { ProgressBar, Avatar, Card, Button, Text } from 'react-native-paper';
import { UserContext } from '../../../contexts/userProvider';
import { Alert, View } from 'react-native';
import moment from "moment"
import BotaoFlutuante from '../listaDemanda/botaoFlutuante';
import ModalConfirmacao from './modalFinalizar';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from '../../cabecalho';

type IPercentual={
    contadas: number;
    total:number;
    iniciado: Date | null;
    idDemanda: number;
    status: string | null;
    tipo: string| null
}

//return {total, contadas, iniciado:info.iniciado, idDemanda:info.id, status:info.status, tipo:info.tipo}

const Finalizar = () => {

    const navigation = useNavigation()
   
    const{idDemanda}= React.useContext(UserContext)
    const[info, setInfo] = React.useState<IPercentual>()
    const[visible,setVisible] = React.useState<boolean>(false)

  async function buscarInfoParaPercentual(){
    return await Axios.get(`https://wmsapi.vercel.app/estoque/verpercentualcontagem/${idDemanda}`)
    .then(response => setInfo(response.data))
    .catch(erro => Alert.alert("erro, Ação não realizada!"))
  }  

  async function finalizarDemanda(){
    return await Axios.put(`https://wmsapi.vercel.app/estoque/finalizardemanda/${idDemanda}`)
    .then(response=> {
      Alert.alert(response.data)
      navigation.goBack()
    })
    .catch(erro => Alert.alert("erro, demanda nao finalizada"))
  }

  function verPercentual(){
    if(info?.contadas && info.total){
        const resultado = info?.contadas / info?.total
        return resultado
    } else {
        return 0
    }
  }

  function aContar(){
    if(info?.contadas && info.total){
        const resultado = info?.total - info?.contadas
        return resultado
    } else {
        return 0
    }
  }

  React.useEffect(()=>{
    buscarInfoParaPercentual()
  },[])

  return <View style={{flex:1}}> 
    <ModalConfirmacao setVisible={setVisible} visible={visible} cadastrar={finalizarDemanda} />
    <Cabecalho titulo="FINALIZAR"/>
    <View style={{flexDirection:"row", justifyContent:"space-between",marginHorizontal:8, padding:16}}>
        <Text style={{fontWeight:"700"}}>TOTAL: {info?.total}</Text>
        <Text style={{fontWeight:"700"}}>CONTADAS: {info?.contadas}</Text>
        <Text style={{fontWeight:"700"}}>A CONTAR: {aContar()}</Text>
    </View>
    <ProgressBar style={{margin:8}} progress={verPercentual()}  />
    <Card>
    <Card.Content style={{gap:8}}>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:16}}>
            <Text>{`DEMANDA - ${info?.idDemanda}`}</Text>
            <Text>{`STATUS - ${info?.status}`}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:16}}>
            <Text>{`INICIADO - ${moment(info?.iniciado).format("DD/MM/YYYY - HH:mm:ss")}`}</Text>
        </View>
    </Card.Content>
   </Card>
   <Button disabled={info?.contadas !== info?.total} contentStyle={{flexDirection:"row-reverse"}} style={{marginTop:64, width:200, alignSelf:"center"}} icon="send" mode="contained" onPress={() => finalizarDemanda()}>
    Finalizar
  </Button>
  <BotaoFlutuante atualizar={()=>{buscarInfoParaPercentual()}}/>
    </View>
}

export default Finalizar;