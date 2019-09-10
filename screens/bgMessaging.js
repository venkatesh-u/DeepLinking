import type { RemoteMessage } from 'react-native-firebase';
import firebase from 'react-native-firebase';
import {Linking, ToastAndroid} from 'react-native';

/// When Application is in Background to recieve a notification.
//This file is not in usage

export default async (message: RemoteMessage) => {
    // handle your message
//alert("MSG: "+JSON.stringify(message));
    ToastAndroid.show("Data: "+JSON.stringify(data), ToastAndroid.LONG);


console.log("MSG: "+ JSON.stringify(message));
    return Promise.resolve();
}


 onPressNotification =(data)=>{
    ToastAndroid.show("Data: "+JSON.stringify(data), ToastAndroid.SHORT);
//    alert(JSON.stringify(data));

//    Linking.openURL("https://deeplinking/B").catch((err) => console.error('An error occurred', err));
 }