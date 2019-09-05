import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import App from './screens/App.js';
import Screen2 from './screens/Screen2.js';

const navigator = createStackNavigator(
{

    A:{
        screen:App,
        navigationOptions:{
            title:'Home'
        }
    },

    B:{
        screen:Screen2,
        navigationOptions: {
          title: "Demo Screen 2"
        }
    },

},
{
    initialRouteName: 'A',
//    defaultNavigationOptions: {
//      title:'Title',
//      headerStyle: {
//        backgroundColor: '#f4511e',
//      },
//      headerTintColor: '#fff',
//      headerTitleStyle: {
//        fontWeight: 'bold',
//      },
//    },
}
)

const Container = createAppContainer(navigator);
export default Container;