import { useState } from "react";
import { Image } from "react-native-elements";

const { TouchableOpacity } = require("react-native")

const LoadingBtn = ({ children, onPress, loadingSize}) => {
    const [loadding, setLoadding] = useState(false);

    const _onPress = async () => {
        setLoadding(true);
        await onPress?.();
        console.log('LoadingBtn run!');
        setLoadding(false)
    }

    return (
        <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline', alignItems: 'center' }} onPress={_onPress}>
            {loadding ?
                (<Image source={require("@assets/Rolling-1s-200px.gif")} style={{ width: loadingSize || 24, height: loadingSize|| 24 }}></Image>)
                : (children)}
        </TouchableOpacity>
    )
}

export default LoadingBtn;