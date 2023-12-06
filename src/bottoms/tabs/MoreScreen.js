import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '@bottoms/screen';

const Stack = createNativeStackNavigator();
const MoreScreen = ()=>{
    return(
        <Stack.Navigator>
          {
                screens.moreTab.map((item, index)=>{
                    return (
                        <Stack.Screen 
                            name={item.name} 
                            component={item.component} 
                            options={item.options} 
                            key={"moreScreen_"+ index}
                        />
                    )
                })
            }
        </Stack.Navigator>
    );
};

export default MoreScreen;
