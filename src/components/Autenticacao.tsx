import { useContext, useState } from "react";
import { UserContext } from "../contexts/userProvider";
import { Alert, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import jwt_decode from "jwt-decode";

type IResponse = {
  data: {
    id:number;
    role:string[]
    usuario:string;
    exp:number;
    iat:number
  }
}

export default function Teste({navigation}:{navigation:any}){
    const {autenticar, setId, setUser, setRole} = useContext(UserContext)
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    function abrirNovaAba(){
      autenticar(usuario, senha).then((response) =>  {
        if(response){
          const validarToken = verificarToken(response)
          if(validarToken){
            var token = response;
            var decoded:IResponse = jwt_decode(token);
            setId(decoded?.data?.id)
            setUser(decoded?.data?.usuario)
            setRole(decoded?.data?.role)
            navigation.navigate('menu')
          }
          else {
            Alert.alert("login ou senha incorretos")
          }
        }
      })

    }

    const verificarToken = (token:string) => {
      if(token === 'Senha incorreta' || token === 'usuario não localizado'){
        false
      } else {
        return true
      }
    };


    return (
    <View style={styles.container}>
      <Text style={{textAlign:"center", marginBottom:16, fontWeight:"800", fontSize:22}}>LOGIN</Text>
      <TextInput
        label="usuario"
        value={usuario}
        onChangeText={texto => setUsuario(texto)}
        mode="outlined"
        inputMode="numeric"
        outlineColor="#000"
        activeOutlineColor="#000"

      />
      <TextInput
      style={{marginTop:8}}
        label="senha"
        secureTextEntry
        value={senha}
        onChangeText={texto => setSenha(texto)}
        mode="outlined"
        inputMode="text"

      />

      
      <Button buttonColor="blue" style={{marginTop:16}} icon="login" mode="contained" onPress={abrirNovaAba}>
    LOGIN
  </Button>
    </View>
)}

const styles = StyleSheet.create({
  container:{
    width:"90%",
    flex:1,
    justifyContent:"center",
    alignSelf:"center"

  }
})