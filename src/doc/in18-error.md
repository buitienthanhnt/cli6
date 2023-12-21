<!-- nếu gặp lỗi liên quan đến i18n khi build thì vào: 

node_modules/react-native-i18n/android/build.gradle

và sửa: 'compile' sang 'implementation' vì có thể lỗi với grade >= 7

dependencies {
  implementation "com.facebook.react:react-native:+" // From node_modules: tha edit for in18 build error:thay thế: 'compile' bằng 'implementation'
} -->


<!-- tương tư với: react-native-check-app-install

  node_modules/react-native-check-app-install/android/build.gradle 
  
cũng bị vẫn đề này  -->


<!--           implementation             -->