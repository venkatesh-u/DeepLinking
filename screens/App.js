/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Linking
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component{

componentDidMount(){
     Linking.getInitialURL().then(url => {
         console.log("InitialURL: "+ url);
          this.navigate(url);

       });
    Linking.addEventListener('url', this._handleOpenURL);

    this.firebaseSetUp();
}

  componentWillUnmount() {
     Linking.removeEventListener('url', this._handleOpenURL);
  }


   firebaseSetUp(){
       const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
       firebase.notifications().android.createChannel(channel);
       this.checkPermission();
       this.createNotificationListeners();
   }


async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
}

async createNotificationListeners() {

    firebase.notifications().onNotification(notification => {
        notification.android.setChannelId('insider').setSound('default')
        firebase.notifications().displayNotification(notification)
    });

    firebase.notifications().onNotificationOpened((notificationOpen) => {
          this.onPressNotification(notificationOpen.notification.data);
          firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId)
      });

    const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
          this.onPressNotification(notificationOpen.notification.data);
          firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId)
        }
}


 onPressNotification(data){
    this.props.navigation.navigate( 'B', {'notification_data':data} );
 }

async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
               console.log("fcmToken:  "+ fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
}

async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        this.getToken();
    } catch (error) {
        console.log('permission rejected');
    }
}



_handleOpenURL =(event)=> {
  console.log("_handleOpenURL: "+event.url);
  this.navigate(event.url);
}


navigate = (url) => {
      const { navigate } = this.props.navigation;
      var routeName
      if(url != null){
       console.log("Url not null:"+ url);
            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];
            routeName = route.split('/')[1];
      }


      if (routeName != null && routeName === 'B') {
        console.log("routeName: "+routeName);
        navigate('B')
      }


 }


render(){
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>

    </Fragment>
  );
  }
};

//
//  <NavigationEvents
//            onWillFocus={this.loadScreen}
//          />

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
