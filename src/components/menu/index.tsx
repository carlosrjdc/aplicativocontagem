import { useContext } from "react";
import { FlatList, Text, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { UserContext } from "../../contexts/userProvider";
import { List, MD3Colors,Divider } from 'react-native-paper';
import Cabecalho from "../cabecalho";

type ItemProps = {title: string};

const menu =["ESTOQUE", "RETORNO"]

const image = {uri: 'https://reactjs.org/logo-og.png'};

const Item = ({title}: ItemProps) => (
    <View style={{alignItems: 'center', justifyContent: 'center', padding:8, margin:4, backgroundColor:"yellow", width:"100%"}}>
      <Text >{title}</Text>
    </View>
  );

export default function Menu({navigation}:{navigation:any}){
    const{user} = useContext(UserContext)
    return (
      <View> 
        <Cabecalho titulo="MENU"/>    
        <Divider style={{margin:8}}/>  
        <TouchableOpacity onPress={()=> {}} >
          <ImageBackground style={styles.container} source={{uri:"https://cargox.com.br/wp-content/uploads/2017/04/como-implementar-a-logistica-cross-docking-na-minha-empresa.jpg"}} resizeMode="cover">
            <View style={styles.containerText}>
              <Text style={styles.texto}>RECEBIMENTO</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Divider style={{margin:8}}/>
          <TouchableOpacity onPress={()=> navigation.navigate('demanda')} >
          <ImageBackground style={styles.container} source={{uri:"https://inforchannel.com.br/wp-content/uploads/2019/07/estoque.jpg"}} resizeMode="cover">
            <View style={styles.containerText}>
              <Text style={styles.texto}> CONTROLE DE ESTOQUE</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Divider style={{margin:8}}/>
          <TouchableOpacity onPress={()=> {}} >
          <ImageBackground style={styles.container} source={{uri:"https://conceitos.com/wp-content/uploads/economia/Logistica.jpg"}} resizeMode="cover">
            <View style={styles.containerText}>
              <Text style={styles.texto}> DEVOLUÇAO</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
    </View>   
    )
}


const styles =StyleSheet.create({
  container:{
    height:120
  },
  containerText:{
    backgroundColor:"rgba(229, 233, 237, 0.896)",
    height:40,
    textAlignVertical:"center",
    width:"100%",
    position: 'absolute',
    padding: 8,
    right: 0,
    bottom: 0,
  },

  texto:{
    fontWeight:"800",
    textTransform:"uppercase"

  }
})
