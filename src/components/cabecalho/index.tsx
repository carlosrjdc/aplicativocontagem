import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLinkTo } from '@react-navigation/native';
import { UserContext } from '../../contexts/userProvider';
import teste from "../perfil"

const Cabecalho = ({titulo}:{titulo:string}) => {
    const{user} = React.useContext(UserContext)

    const navigation = useNavigation()
    const linkTo = useLinkTo();

  const _goBack = () => navigation.goBack();

  function usuario(){
    if(user){
        return user
    }else{
        return ""
    }
  }

  return (
    <Appbar.Header mode='small'>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content titleStyle={{fontSize:18, fontWeight:"800"}} title={titulo} />
      <Appbar.Content onPress={()=>{}} titleStyle={{fontSize:16, fontWeight:"800", textAlign:"right"}} title={usuario()} />
      <Appbar.Action icon="account" onPress={()=>linkTo("/profile")} />
    </Appbar.Header>
  );
};

export default Cabecalho;