import React, { useState } from 'react';
import { Button, Dialog, Portal,Text } from 'react-native-paper';

export default function ModalConfirmacao({visible, setVisible, cadastrar}:{cadastrar:()=> void,visible:boolean, setVisible:React.Dispatch<boolean>}){

    const hideDialog = () => setVisible(false);

    return <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
    <Dialog.Title style={{fontWeight:"bold", textAlign:"center"}}>
          CONFIRMAR AÇÃO
        </Dialog.Title>
      <Dialog.Actions style={{flexDirection:"column", justifyContent:"center"}}>
      <Button style={{width:"90%"}} mode="contained" onPress={() => cadastrar()}>Salvar</Button>
        <Button style={{width:"90%"}} mode="contained" onPress={hideDialog}>Cancelar</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
}