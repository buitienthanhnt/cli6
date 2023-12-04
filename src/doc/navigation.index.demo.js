// In index.js of a new project
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: 'green'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'blue'
    },
    background: {
      color: 'green'
    }
  }
});

// Home screen declaration
const HomeScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>Hello React Native Navigation 👋</Text>
      <Text>234234</Text>
      <Button
        title='Push Settings Screen'
        color='#710ce3'
        onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Settings',
            options: {
              topBar: {
                title: {
                  text: 'Settings'
                }
              }
            }
          }
        })}/>
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
};

// Settings screen declaration - this is the screen we'll be pushing into the stack
const SettingsScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
      <Button
        title='Push Settings Screen'
        color='#710ce3'
        onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Detail',
            options: {
              topBar: {
                title: {
                  text: 'Detail'
                }
              }
            }
          }
        })}/>
    </View>
  );
}

const DetailScreen = () => {
  return (
    <View style={styles.root}>
      <Text>detail Screen demo</Text>
    </View>
  );
}

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen); // DetailScreen
Navigation.registerComponent('Detail', () => DetailScreen);

Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          stack: {
            children: [{
              component: {
                name: 'Home',
                options: {
                  bottomTab: {
                    fontSize: 12,
                    text: 'Children1',
                    icon: require('./adaptive-icon.png')
                  }
                }
              }
            }],
          }
        },
        {
          stack: {
            children: [{
              component: {
            name: 'Settings',
            options: {
              bottomTab: {
                text: 'Settings',
                fontSize: 12,
                icon: require('./adaptive-icon.png')
              }
            }
          }}],
        },
      },
      {
        stack: {
          children: [{
            component: {
          name: 'Detail',
          options: {
            bottomTab: {
              text: 'Children3',
              fontSize: 12,
              icon: require('./adaptive-icon.png')
            }
          }
        }}],
      },
    }
      ],
    }
  }
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});

// "dependencies": {
//     "react": "18.2.0",
//     "react-native": "0.72.4",
//     "react-native-navigation": "^7.37.0-hotfix.1"
//   },
// https://github.com/wix/react-native-ui-lib/issues/1744
// https://dev.to/gaserd/small-trick-for-your-app-to-react-native---side-menu-with-overlay-52be
// https://github.com/wix/react-native-navigation/issues/3841