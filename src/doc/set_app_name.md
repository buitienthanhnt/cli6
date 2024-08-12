[//]: # (64)

[//]: # ()
[//]: # (First of all: Open app.json file in your react-native project directory. And, just replace displayName json property's value in this file. e.g.:)

[//]: # ()
[//]: # ({)

[//]: # ("name": "SomethingSomething",)

[//]: # ("displayName": "My New App Name")

[//]: # (})

[//]: # ()
# (For Android app: Open strings.xml file, replace the <string name="app_name"> tag's value to your new app name. e.g.:)

[//]: # ()
[//]: # (<string name="app_name">My New App Name</string>)

# (For iOS: Open info.plist, replace the value after <key>CFBundleDisplayName</key> to your app name. e.g.:)

[//]: # ()
[//]: # (<key>CFBundleDisplayName</key>)

[//]: # (<string>My New App Name</string>)

[//]: # (Uninstall your previous app installed on your device. Use npm install in project main directory, in ios folder directory run pod install commands. Now, simply install app in your device.)