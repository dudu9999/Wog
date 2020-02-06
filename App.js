import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/Login/';
import Registro from './src/Registro/';
import Home from './src/Home';
import Contato from './src/Contato';

const AppNavigator = createStackNavigator({
  Login:{
    screen: Login
  },
  Registro:{
    screen: Registro
  },
  Home:{
    screen: Home
  },
  Contato:{
    screen: Contato
  }
}, {

  initialRouteName: 'Login',

  defaultNavigationOptions:{
    headerTintColor: '#0000FF',
    headerBackTitle: null
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;