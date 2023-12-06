import { useEffect, useReducer } from 'react';
import { Text, Button } from 'react-native';
import { View } from 'react-native';

// gia tri tra ve tu reducer  function nay se gan vao: count trong khai bao ben duoi
const reducer = (state, action)=>{
    switch (action) {
        case "TANG":
            return state +1;
        
        case "GIAM": 
            return state -1;

        case "XOA":
            return 0;

        default:
    }
    return state;
};

const DemouseReduce = () => {

    // nhan vao 1 reducer la 1 function va 1 initState tra ve nhu useState voi 1 ten bien nhung gia tri so 2 
    // khong phai la 1 setFuction nua ma la 1 dispstch function(dat ten tuy y) de tryen di 1 action nao do.

    const [count, dispatch] = useReducer(reducer, 0);
    // action

    // view: nhan 1 button se goi vao 1 dispatch 1 action vao reducer

    // reducer gom 1 state truoc do va 1 action
    // (state, action)=>{
    // return state moi cho state truoc do
    // }

    useEffect(() => {
        console.log('====================================');
        console.log('use effect run');
        return () => {
            console.log('run return in useEffect when reRender or back');
        }
    }, []);

    return (
        <View>
            <Text>DemouseReduce: {count}</Text>
            <Button title='add' onPress={() => {
                dispatch('TANG');
            }}></Button>
            <Text></Text>

            <Button title='sub' onPress={() => {
                dispatch("GIAM")
            }}></Button>
            <Text></Text>

            <Button title='xoa' onPress={() => {
                dispatch('XOA')
            }}></Button>
            <Text></Text>
        </View>
    );
}

export default DemouseReduce;