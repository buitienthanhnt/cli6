import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '@bottoms/screen';
import Config from '@config/Config';
const Stack = createNativeStackNavigator();
const PaperScreen = (props) => {
    const back = ()=>{
        props.navigation.goBack();
    }

    return (
        <Stack.Navigator initialRouteName={"PaperHome"}>
            {
                screens.paperTab.map((item, index)=>{
                    return (
                        <Stack.Screen 
                            name={item.name} 
                            component={item.component} 
                            options={item.options} 
                            key={"paperScreen_"+ index}
                        />
                    )
                })
            }
        </Stack.Navigator>
    );
};

export default PaperScreen;
