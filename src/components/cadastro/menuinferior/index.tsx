import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Cadastro from '../cadastro';
import ListaDemanda from '../listaDemanda';
import ListaEditarContagem from '../editar';
import Finalizar from '../finalizar';

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'listademanda', title: 'Lista Demanda', focusedIcon: 'format-list-bulleted'},
    { key: 'cadastro', title: 'Cadastro', focusedIcon: 'plus' },
    { key: 'editar', title: 'Editar', focusedIcon: 'playlist-edit' },
    { key: 'finalizar', title: 'Finalizar', focusedIcon: 'send-circle' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    listademanda: ListaDemanda,
    cadastro: Cadastro,
    editar: ListaEditarContagem,
    finalizar: Finalizar
  });

  return (
    
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;