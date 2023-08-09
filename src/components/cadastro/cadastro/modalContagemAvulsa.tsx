import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal,Text } from 'react-native-paper';

type ISku = {
  sku:number;
  descricao:string;
  shelfLife: number | null
  pesLiquidoCx: number | null
  tipoPeso:number|null
}

export default function ContagemAvulsa({verConfirmacao, setVerConfirmacao, cadastrar,cadastrarComEndereco}:{descricaoSku:ISku|undefined,cadastrarComEndereco:()=>void,cadastrar:()=> void,verConfirmacao:boolean, setVerConfirmacao:React.Dispatch<boolean>}){

    const hideDialog = () => setVerConfirmacao(false);

    return <Portal>
    <Dialog visible={verConfirmacao} onDismiss={hideDialog}>
    <Dialog.Title style={{fontWeight:"bold", textAlign:"center"}}>
          CONFIRMAR AÇÃO
        </Dialog.Title>
        <Dialog.Content>
        </Dialog.Content>
      <Dialog.Actions style={{flexDirection:"column", justifyContent:"center"}}>
      <Button style={{width:"90%"}} mode="contained" onPress={() => cadastrar()}>Salvar</Button>
        <Button style={{width:"90%", marginVertical:16}} mode="contained" onPress={() => cadastrarComEndereco()}>Salvar e add Novo SKU</Button>
        <Button style={{width:"90%"}} mode="contained" onPress={hideDialog}>Cancelar</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
}