import * as React from 'react';
import { ScrollView,View,TouchableOpacity } from 'react-native';
import { Dialog, Portal, Text,TextInput, IconButton, Divider,Button } from 'react-native-paper';





const ModalVariavel = ({ setVisible,setPeso,peso,setArrayPeso,arrayPeso,setPesoMedio}:
    {setPesoMedio:React.Dispatch<string>, setVisible:React.Dispatch<boolean>, peso:string|undefined, setPeso:React.Dispatch<string|undefined>,arrayPeso:number[], setArrayPeso:React.Dispatch<number[]>}) => {

  const hideDialog = () => setVisible(false);

  function addPeso(){
    if(peso){
        setArrayPeso([...arrayPeso, parseFloat(peso)]);
        setPeso("")
    }
  }

  function remover(numero: number){
    setArrayPeso(arrayPeso.filter(filtrar=> numero !== filtrar))

  }

  function calcularMedia(array: number[]): number {
    const soma = array.reduce((total, numero) => total + numero, 0);
    const media = soma / array.length;
    setPesoMedio(media.toFixed(2).toString())
    return media;
  }

  return (
    <Portal>
      <Dialog visible={true}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <Text>Peso Medio: {calcularMedia(arrayPeso).toFixed(2)}</Text>
            <Divider style={{marginVertical:16}}/>
    <View style={{flexDirection:"row"}}>
        <TextInput
      style={{width:"90%"}}
      mode="outlined"
      label="Peso Caixa"
      placeholder="Informe o peso da Caixa"
      value={peso?.toString()}
      onChangeText={setPeso}
      inputMode="decimal"
      onBlur={()=> addPeso()}
    />
      <IconButton
      mode="contained"
    icon="weight"
    size={20}
    onPress={() => addPeso()}
  />
  </View>
  <Divider style={{marginVertical:16}}/>
    {arrayPeso.map(item=> {

        return <TouchableOpacity style={{alignContent:"center", justifyContent:"center", width:"100%", backgroundColor:"yellow",padding:8, marginVertical:4}} onPress={()=> remover(item)}>
            <Text>{item}</Text>
            </TouchableOpacity>
    })}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideDialog} >Salvar</Button>

        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ModalVariavel;