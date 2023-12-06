import { View, Text, Button } from 'react-native'
import React, { useState, useCallback, useEffect} from 'react';


const DemoMemo = ()=>{
    const [count, setCount] = useState(0);
    // const getData = ()=>{}; // can dung useCallBack do co dung trong ChildrentComponent
    const getData = useCallback(()=>{}, []);

    useEffect(()=>{
        console.log('====================================');
        console.log('run useEffect');
        console.log('====================================');
        return ()=>{
            console.log('====================================');
            console.log("run return function in useEffect");
            console.log('====================================');
        }
    }, [count]);

    return (
        <View>
            <Text>DemoMemo count: {count}</Text>
            <Button title="click" onPress={()=>{
                setCount(old => old+1);
            }}></Button>
            <Childrent val ={count} getData={getData}></Childrent>
        </View> 
    );
}

// const Childrent = ()=>{
//     console.log('====================================');
//     console.log("Childrent 123");
//     console.log('====================================');
//     return(<View>
//         <Text>Childrent Childrent</Text>
//     </View>)
// }

// so sanh nong" https://stackoverflow.com/questions/36084515/how-does-shallow-compare-work-in-react
const Childrent = React.memo(
    ()=>{
        console.log('====================================');
        console.log("Childrent 123");
        console.log('====================================');
        return(<View>
            <Text>Childrent Childrent</Text>
        </View>)
    }, (prevProps, nextProps) =>{
        // return prevProps.count === nextProps.count // true se khoong reRender, false se reRender 
    }
);

export default DemoMemo;