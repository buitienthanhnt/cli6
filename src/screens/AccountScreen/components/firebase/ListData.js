import {useEffect, useCallback, useState} from 'react';
import { Text, TouchableOpacity, View, Dimensions, FlatList } from "react-native";
import database from '@react-native-firebase/database'; 
import { firebase } from "@react-native-firebase/auth";

import { sources } from '@services/firebase';
import { FlashList } from '@shopify/flash-list';

const ListData = (props)=>{

    const [sourceData, setSourceData] = useState([]);
    const user = firebase.auth().currentUser;
    const user_id = '45edb9c8-53cf-4cdb-910c-696255f4f3e4';

    useEffect(()=>{
        const onValueChange = database().ref(sources).orderByChild('id').equalTo(user_id).on('value', (snapshot )=>{
            if(snapshot.numChildren()){
                const _data = [];
                snapshot.forEach(item =>{
                    let target_value = item.val();
                    target_value.index = item.key;
                    _data.push(target_value)
                })
                setSourceData(_data);
            };
        })

        return () => database().ref(sources).orderByChild('id').equalTo(user_id).off('value', onValueChange);
    }, []);

    const fechData = useCallback(()=>{
        // once: Đọc một lần
        database().ref(sources).orderByChild('id').equalTo(user_id).once('value').then((snapshot )=>{
            if(snapshot.numChildren()){
                // setSourceData(Object.values(snapshot.toJSON())); // array not key
            };
        })
    }, []);

    return(
        <View style={{alignItems: 'center', flex: 1,}}>
            <Text>list data from realtime database</Text>

            <TouchableOpacity style={{
                    height: 60,
                    backgroundColor: 'rgba(0, 137, 78, 0.7)',
                    borderRadius: 20,
                    padding: 10
                }}
                onPress={()=>{
                    console.log(123);
                    fechData();
                }}
            >
                <Text>load data from firebase</Text>
            </TouchableOpacity>

            <View style={{flex: 1}}>
                <FlatList 
                    data={sourceData}
                    keyExtractor={(item, index) => 'key_' + index}
                    extraData={sourceData}
                    renderItem={({item})=>{
                        return(
                            <View style={{height: 40}}>
                                <Text>{item.index}</Text>
                            </View>
                        )
                    }}>
                </FlatList>
            </View>
        </View>
    )
};

export default ListData;