import { View, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';

const DemoUseCallBack = () => {
    const [val, setVal] = useState([]);

    const getData = () => {
        console.log('====================================');
        console.log("get Data in DemoUseCallBack");
        console.log('====================================');
    }


    return (
        <View>
            <Text>
                DemoUseCallBack
            </Text>
            <Button title="getData" onPress={() => {

                setVal([1, 2, 3])

            }}>
            </Button>

            <Childrent getData={getData}></Childrent>
        </View >
    )
}

const Childrent = ({ getData }) => {
    useEffect(() => {
        console.log('====================================');
        console.log('noi dung chajy trong useeffect Childrent');
        console.log('====================================');
    }, [getData]);

    return (
        <View>
            <Text>childrent</Text>
        </View>)
}

export default DemoUseCallBack;