import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from './Views/WelcomeScreen'
import LoginScreen from './Views/LoginScreen';

const MainNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
});

console.disableYellowBox = true;

const App = createAppContainer(MainNavigator);

export default App;