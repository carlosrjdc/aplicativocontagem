import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import UserProvider from './src/contexts/userProvider';
import { PaperProvider } from 'react-native-paper';
import Autenticacao from './src/components/Autenticacao';
import Menu from './src/components/menu';
import Demanda from './src/components/demanda'
import MenuInferior from './src/components/cadastro/menuinferior';
import Perfil from './src/components/perfil';

const Stack = createStackNavigator()

export default function App() {

  return (
    <UserProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='login' component={Autenticacao}/>
            <Stack.Screen name='menu' component={Menu}/>
            <Stack.Screen name='demanda' component={Demanda}/>
            <Stack.Screen name='menuInferior' component={MenuInferior}/>
            <Stack.Screen name='profile' component={Perfil}/>
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
