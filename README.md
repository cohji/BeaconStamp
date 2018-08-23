# BeaconStamp

## How to build

### Install Ionic Plugin

~~~
ionic cordova plugin add cordova-plugin-ibeacon
npm install --save @ionic-native/ibeacon
~~~

~~~
ionic cordova plugin add cordova-plugin-file
npm install --save @ionic-native/file
~~~

~~~
ionic cordova plugin add cordova-plugin-statusbar
npm install --save @ionic-native/status-bar
~~~

~~~
npm install moment --save
~~~

~~~
ionic cordova plugin add cordova-plugin-local-notification
npm install --save @ionic-native/local-notifications
~~~

### Build Project

#### Android
~~~
ionic cordova run android --device
~~~

#### iOS
~~~
ionic cordova build ios
~~~

## Issue

  - IOS background problem #123

    https://github.com/petermetz/cordova-plugin-ibeacon/issues/123
    
  - iOS background monitoring when app is killed #53

    https://github.com/petermetz/cordova-plugin-ibeacon/issues/53
  
