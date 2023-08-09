import { Text, TouchableOpacity, View } from "react-native";
import Cabecalho from "../cabecalho";
import { Avatar } from 'react-native-paper';
import { useContext } from "react";
import { UserContext } from "../../contexts/userProvider";
import { AntDesign } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';


export default function Perfil(){
    const {user,setTkn,setId,setUser,setRole} = useContext(UserContext)

    const linkTo = useLinkTo();


    function logout(){
        setTkn("")
        setId(0)
        setUser("")
        setRole([])
        linkTo("/login")
    }


    return <View style={{flex:1, width:"100%"}}>
         <Cabecalho titulo="PERFIL"/>
         <View style={{alignItems:"center", justifyContent:"space-between", flex:1, marginVertical:64}}>
         <View style={{marginTop:32, alignItems:"center", gap:16}}>
            <Avatar.Icon size={52} icon="account" />
            <Text style={{fontSize:28, fontWeight:"700", textTransform:"uppercase"}} >{user}</Text>
            </View>
            <View style={{alignItems:"center"}}>
                <Text style={{fontSize:16, fontWeight:"700", textTransform:"uppercase", marginBottom:16}}>Logout</Text>
                <TouchableOpacity onPress={()=>logout()}>
                    <AntDesign name="logout" size={36} color="red" />
                </TouchableOpacity>
            </View>

        </View>
    </View>
}