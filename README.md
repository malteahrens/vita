# Android app
The website will run with a browser and as a native smartphone app. The difference between the two versions is a different set of features. To get the website to a native app (nearly) tbe same source is used. During build time on Travis the translation will be done with PhoneGap (Cardova).

## Native App
* run as a background service (even if the screen is locked)
* list all available wifi access points

## Cordova Plugins
* cordova-plugin-background-mode
* cordova-plugin-background-geolocation
 