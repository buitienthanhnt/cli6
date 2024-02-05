import { useEffect, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View, Dimensions, FlatList } from "react-native";
import database from '@react-native-firebase/database';
import { firebase } from "@react-native-firebase/auth";

import { sources } from '@services/firebase';
import { FlashList } from '@shopify/flash-list';

const ListData = (props) => {

    const [sourceData, setSourceData] = useState([]);
    const user = firebase.auth().currentUser;
    const user_id = '45edb9c8-53cf-4cdb-910c-696255f4f3e4';

    useEffect(() => {
        const onValueChange = database().ref(sources).on('value', (snapshot) => {
            if (snapshot.numChildren()) {
                const _data = [];
                snapshot.forEach(item => {
                    let target_value = item.val();
                    target_value.index = item.key;
                    _data.push(target_value)
                })
                setSourceData(_data);
            };
        })

        // return () => database().ref(sources).off('value', onValueChange);
    }, []);

    const fechData = useCallback(() => {
        // once: Đọc một lần
        // database().ref(sources).orderByChild('id').equalTo(user_id).once('value').then((snapshot) => {
        //     if (snapshot.numChildren()) {
        //         // setSourceData(Object.values(snapshot.toJSON())); // array not key
        //     };
        // })
        database().ref('/newpaper/category').once('value').then((snapshot)=>{
            if (snapshot.numChildren()) {
                let values = [];
                snapshot.forEach((item)=>{
                    values = item;
                })
                console.log(values);
            }
        });
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                height: 80,
                flex: 1,
                flexDirection: 'row',
                gap: 2,
                // borderRadius: 5,
                // backgroundColor: 'red',
               
            }}>
                <View style={{
                    backgroundColor: item.active ? 'rgba(0, 241, 0, 0.7)' : 'rgba(225, 0, 0, 0.6)',
                    padding: 8,
                    borderRadius: 8,
                    width: '60%'
                }}>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                    <Text style={{fontSize: 15}}>{item?.email || ''}</Text>
                    <Text style={{fontSize: 15, color: 'blue'}}>{item?.phone || ''}</Text>
                    
                </View>

                <TouchableOpacity style={{
                    backgroundColor: 'rgba(208, 72, 150, 0.9)',
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    // flex: 10
                }}
                    onPress={
                        () => {
                            database().ref(sources + `/${item.index}`).update({
                                active: true
                            })
                        }
                    }
                >
                    <Text>accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: 'rgba(68, 105, 129, 0.9)',
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    // flex: 10
                }}
                    onPress={
                        () => {
                            database().ref(sources + `/${item.index}`).update({
                                active: false
                            })
                        }
                    }
                >
                    <Text>block</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: 'violet',
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    // flex: 10
                }}
                    onPress={() => {
                        database().ref(sources + `/${item.index}`).remove();
                    }}
                >
                    <Text>delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, padding: 10 }}>
            <Text>list data from realtime database</Text>

            <View style={{ flex: 1, marginVertical: 10, gap: 8 }}>
                <View style={{ height: '60%' }}>
                    <FlatList
                        style={{
                          
                        }}
                        data={sourceData}
                        keyExtractor={(item, index) => 'key_' + index}
                        extraData={sourceData}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => {
                            return (<View style={{ height: 2 }}></View>)
                        }}
                    >
                    </FlatList>
                </View>

                <View
                    style={{
                        alignItems: 'flex-end'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            alignItems: 'center',
                            padding: 8,
                            borderRadius: 5,
                            width: 120
                        }}
                        onPress={()=>{
                            props.navigation.navigate('FsourceForm', {name: 'new source'});
                        }}
                    >
                        <Text>add new source</Text>
                    </TouchableOpacity>

                    <Text>nếu bị lỗi client không có quyền truy cập firebase database thì {'\n'}
                        có thể do đã hết hạn quyền truy cập trong phần rules của database {'\n'}
                        giải pháp là tăng thêm thời gian cấp quyền truy cập cho firebase database{'\n'}
                        vào -\ realtime databases -\Rules tăng .read và .write các chữ số thứ 4 và thứ 5 {'\n'}
                        từ trái sang lên 1 đơn vị; tương tự với fireStorage data source
                    </Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            alignItems: 'center',
                            padding: 8,
                            borderRadius: 5,
                            width: 120
                        }}
                        onPress={fechData}
                    >
                        <Text>fecth data</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
};

export default ListData;