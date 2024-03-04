import { Dimensions, Image, Text, TouchableOpacity } from "react-native";

const { View } = require("react-native-ui-lib")

const LoadingScreen = ({loadding})=>{
    if (loadding) {
        return(
            <TouchableOpacity
                disabled={true}
                style={{
                    position: 'absolute', 
                    backgroundColor: "rgba(0, 41, 158, 0.2)", 
                    top: 0, 
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 12,
                    justifyContent: 'center', 
				    alignItems: 'center'
                }}>
                    <Image source={require("@assets/Rolling-1s-200px.gif")} style={{ width: 40, height: 40 }}></Image>
            </TouchableOpacity>
        )
    }
    return null;

}
export default LoadingScreen;