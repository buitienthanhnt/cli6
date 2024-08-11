import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '@bottoms/screen';

const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator>
      {screens.homeTab.map((item, index) => {
        return (
          <Stack.Screen
            name={item.name}
            component={item.component}
            options={item.options}
            key={'homeScreen_' + index}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default HomeScreen;
