import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '@bottoms/screen';

const Stack = createNativeStackNavigator();
const AccountScreen = ()=>{
    return(
        <Stack.Navigator>
            {
                screens.accountTab.map((item, index)=>{
                    return (
                        <Stack.Screen 
                            name={item.name} 
                            component={item.component} 
                            options={item.options} 
                            key={"accountScreen_"+ index}
                        />
                    )
                })
            }
        </Stack.Navigator>
    );
};

export default AccountScreen;
