import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '@bottoms/screen';

const Stack = createNativeStackNavigator();
const CodeScreen = ()=>{
    return(
        <Stack.Navigator screenOptions={{gestureEnabled: true,}}>
           {
                screens.codeTab.map((item, index)=>{
                    return (
                        <Stack.Screen
                            name={item.name}
                            component={item.component}
                            options={item.options}
                            key={"codeScreen_"+ index}
                        />
                    )
                })
            }
        </Stack.Navigator>
    );
}

export default CodeScreen;
