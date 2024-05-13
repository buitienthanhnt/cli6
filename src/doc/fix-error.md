<!-- 
Error:  ViewPropTypes will be removed from react-native along with all other PropTypes

Fixed:
This is the patch issue and can be resolved by just replacing few lines of code:

check if you have installed deprecated-react-native-prop-types package if not run the below command first.

1    yarn add deprecated-react-native-prop-types

1   inside 

    node_modules/react-native/index.js

replace these functions with the below lines

// Deprecated Prop Types
    get ColorPropType(): $FlowFixMe {
        return require('deprecated-react-native-prop-types').ColorPropType;
    },

    get EdgeInsetsPropType(): $FlowFixMe {
        return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
    },

    get PointPropType(): $FlowFixMe {
        return require('deprecated-react-native-prop-types').PointPropType;
    },

    get ViewPropTypes(): $FlowFixMe {
        return require('deprecated-react-native-prop-types').ViewPropTypes;
    }, 
-->
<!-- =========================================================================================== -->

<!-- ==================================Ubuntu: java update from 11 to 17==========================

The javac executable is not part of the openjdk-*-jdk packages. To install it, you need to install the openjdk-17-jdk-headless package:

sudo apt install openjdk-17-jdk-headless

To manage the active version, don't forget about the update-alternatives command:

sudo update-alternatives --config java
sudo update-alternatives --config javac
============================================================================================ -->
when run: npx react-native start.
error: listen EADDRINUSE: address already in use :::8081 
301

I hit this on my laptop running win8. this worked.
open cmd as 'Administrator':
run:

C:\Windows\System32>taskkill /F /IM node.exe

SUCCESS: The process "node.exe" with PID 11008 has been terminated.

================================================================================================