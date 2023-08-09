import * as React from 'react';
import { View, Button as Botao ,StyleSheet,ScrollView, Alert     } from "react-native";
import { Dialog, Portal, Text, Button,TextInput ,IconButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import Axios from 'axios';

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

const ModalEditar = ({visible, setVisible,info}:{info:IContagem|undefined ,visible:boolean, setVisible:React.Dispatch<boolean>}) => {

  const hideDialog = () => setVisible(false);

  const[sku, setSku] = React.useState(info?.produtoId?.toString() as string)
  const[sif, setSif] = React.useState(info?.sif?.toString() as string)
  const[qtdCx, setQtdCx] = React.useState(info?.quantidadecx?.toString() as string)
  const[qtdUnd, setQtdUnd] = React.useState(info?.quantideUn?.toString() as string)

  const [date, setDate] = React.useState(new Date(new Date().setDate(new Date().getDate()+1)));
  const [showPicker, setShowPicker] = React.useState(false);

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  const handleDatePicked = (event: Event, selectedDate?: Date) => {
    if (selectedDate) {
      if(selectedDate> new Date()){
          Alert.alert("data fabricacao, nao pode ser maior que data atual")
      }else{
          setDate(selectedDate);
      }
    }
    hideDateTimePicker();
  };


  async function atualizarContagemPorId(){
    return await Axios.put(`https://wmsapi.vercel.app/estoque/contagem/${info?.id}`,{
      produtoId: parseInt(sku),
      sif: parseInt(sif),
      fabricacao: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      quantidadecx: parseInt(qtdCx),
      quantideUn: parseInt(qtdUnd)
    }).then(response => {
      setVisible(false)
      Alert.alert(response.data)
    }).catch(erro => Alert.alert("erro, registro nao atualizado"))
  }

  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title style={{fontWeight:"bold", textAlign:"center"}}>{info?.enderecoId}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{paddingHorizontal: 8, gap:8}}>
            <TextInput
                style={{width:"100%"}}
                mode="outlined"
                label="SKU"
                value={sku}
                onChangeText={setSku}
                inputMode="numeric"
                />
                           <TextInput
                style={{width:"100%"}}
                mode="outlined"
                label="SIF"
                value={sif}
                onChangeText={setSif}
                inputMode="numeric"
                />
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginHorizontal:16 }}>
    <Text>Fabricação</Text>
    <Text>{moment(date).format("DD/MM/YYYY")}</Text>
    <IconButton
    mode="contained-tonal"
    icon="plus"   
    size={20}
    onPress={showDateTimePicker}
  />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date" // Modo de seleção (date, time, datetime)
          display="default" // Exibir o picker padrão do sistema ou modal
          onChange={handleDatePicked as any} 
        />
      )}
    </View>
              <TextInput
                style={{width:"100%"}}
                mode="outlined"
                label="QTD CX"
                value={qtdCx}
                onChangeText={setQtdCx}
                inputMode="numeric"
                />
              <TextInput
                style={{width:"100%"}}
                mode="outlined"
                label="QTD UND"
                value={qtdUnd}
                onChangeText={setQtdUnd}
                inputMode="numeric"
                />

          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
            <Button onPress={hideDialog} >Fechar</Button>
            <Button disabled={new Date(date) > new Date()  } onPress={atualizarContagemPorId} >Salvar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
})

export default ModalEditar;