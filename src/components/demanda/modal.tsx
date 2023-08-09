import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text, Button,Badge } from 'react-native-paper';

const ModalDemanda = ({visible, setVisible, titulo,acao}:{acao:()=> void,titulo:string,visible:boolean, setVisible:React.Dispatch<boolean>}) => {

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
  
      <Dialog  visible={visible} onDismiss={hideDialog}>

        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>Confirmar inicio de contagem</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Deseja realmente dar inicio na contagem?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancelar</Button>
          <Button onPress={() => acao()}>Sim</Button>
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

export default ModalDemanda;