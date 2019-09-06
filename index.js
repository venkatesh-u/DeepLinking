/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Container from './navigator';
import {name as appName} from './app.json';
import bgMessaging from './screens/bgMessaging';

AppRegistry.registerComponent(appName, () => Container);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);