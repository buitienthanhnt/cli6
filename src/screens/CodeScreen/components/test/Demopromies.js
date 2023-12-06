import {useState, useEffect} from 'react';
import { Text, View } from "react-native";

const Demopromies = ()=>{
    useEffect(()=>{
        const promise1 = Promise.resolve(3);
        const promise2 = 42;
        const promise3 = new Promise((resolve, reject) => {setTimeout(resolve, 2000, 'foo');});

        Promise.all([promise1, promise2, promise3]).then((values) => {
        console.log(values);
        });
    }, []);
    
    return(
        <View>
            <Text>Demopromies</Text>
        </View>
    );
}

export default Demopromies;