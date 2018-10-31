/** @format */

import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation'


import App from './Screens/App';
import Map from './Screens/Map'
import LocationSelection from './Screens/LocationSelection'
import {name as appName} from './app.json';


export const SimpleApp = StackNavigator({
    App:{
        screen: App
    },
    Map:{
        screen: Map
    },
    LocationSelection: {
        screen: LocationSelection
    }
});

AppRegistry.registerComponent(appName, () => SimpleApp);
