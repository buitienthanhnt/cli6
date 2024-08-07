import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import I18n from "@locales/i18n";

const screens = [
    {
        name: 'ExForm',
        component: 'ExForm'
    },
    {
        name: 'FlatInScroll',
        component: 'FlatInScroll'
    },
    {
        name: 'ExVirtualizedlist',
        component: 'ExVirtualizedlist'
    },
    {
        name: 'TestRedux & permission',
        component: 'TestRedux'
    },
    {
        name: 'ExUploadImg',
        component: 'ExUploadImg'
    },
    {
        name: 'ExSvg',
        component: 'ExSvg'
    },
    {
        name: 'to DemouseReduce',
        component: 'DemouseReduce'
    },
    {
        name: 'to DemoMemo',
        component: 'DemoMemo'
    },
    {
        name: 'UseCallBack & stanstack',
        component: 'DemoUseCallBack'
    },
    {
        name: 'promies & hide bottom',
        component: 'Demopromies'
    },
    {
        name: 'to Nmap',
        component: 'Nmap'
    },
    {
        name: 'to Nmap2 google',
        component: 'Nmap2'
    },
    {
        name: 'to Nmap3 google',
        component: 'Nmap3'
    },
    {
        name: 'to Stankstack google',
        component: 'Stanstacks'
    },
    {
        name: 'to DemoDraw',
        component: 'DemoDraw'
    },
];

const DemoTest = ({ navigation }) => {

    // const { authenRe: {user_data},  numberRe: {number}} = useSelector((state) => state);

    // useSelector: state.authenRe thì sẽ chỉ reRener khi state authenRe này được dispatch
    // còn dispatch vào: ADD_NUMBER sẽ không reRender.
    const {useFirebase} = useSelector((state) => state.authenRe);
    const {key} = useSelector(state => state.appRe);
    const dispatch = useDispatch();

    const [local, setLocal] = useState(I18n.currentLocale())

    const redirectView = useCallback((viewName) => {
        navigation.navigate(viewName);
    }, [navigation]);

    const randomValue = useCallback((max) => {
        return Math.floor(Math.random() * max);
    }, []);
    const randomColor = useCallback(() => {
        return `rgba(${randomValue(256)}, ${randomValue(256)}, ${randomValue(256)}, 1)`;
    }, []);

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 60, flex: 1, backgroundColor: randomColor(),
                    justifyContent: 'center', alignItems: 'center', margin: 2,
                    borderRadius: 10
                }}
                onPress={() => {
                    redirectView(item.component);
                }}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>

            <View>
                <FlatList
                    style={{ height: Dimensions.get('screen').height / 3 * 2 }}
                    data={screens}
                    numColumns={2}
                    horizontal={false}
                    renderItem={renderItem}
                >
                </FlatList>
            </View>

            <TouchableOpacity onPress={() => {
                I18n.locale = 'fr';
                setLocal(I18n.currentLocale());
                console.log(key);
                // console.log(number, 'user data: ',user_data);
            }}>
                <Text>{I18n.t('greeting')} {I18n.currentLocale()}</Text>
                <Text style={{color: 'violet', fontSize: 16}}>show state{`(test redux)`}:</Text>
            </TouchableOpacity>
            <Text>useFirebase: {useFirebase ? 'active' : 'inActive'}</Text>
        </View>
    )
};
export default React.memo(DemoTest);

// useSelector((state) => state.numberRe);
// state = 
// {
//     "authenRe":{
//        "_tha_sid":"",
//        "cart_data":null,
//        "data":[
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ]
//        ],
//        "message_count":null,
//        "number":5,
//        "paper_id":46,
//        "user_data":null
//     },
//     "defRe":{
//        "_tha_sid":"",
//        "cart_data":null,
//        "data":[
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ]
//        ],
//        "message_count":null,
//        "number":5,
//        "paper_id":46,
//        "user_data":null
//     },
//     "numberRe":{
//        "_tha_sid":"",
//        "cart_data":null,
//        "data":[
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ]
//        ],
//        "message_count":null,
//        "number":12,
//        "paper_id":46,
//        "user_data":null
//     },
//     "paperRe":{
//        "_tha_sid":"",
//        "cart_data":null,
//        "data":[
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ],
//           [
//              "Object"
//           ]
//        ],
//        "message_count":null,
//        "number":5,
//        "paper_id":46,
//        "user_data":null
//     }
//  }