import react, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Image, ScrollView, RefreshControl, Text, View, FlatList, Linking, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import Config from "@config/Config";
// @ts-ignore
import axios from 'react-native-axios';
// const axios = require('react-native-axios');
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from "react-native-elements/dist/helpers";
import Collapsible from 'react-native-collapsible';  // npm install --save react-native-collapsible
import { useNavigation } from '@react-navigation/native';

import { useQuery } from 'react-query'               // https://codestus.com/posts/su-dung-react-query-de-fetch-du-lieu
import fetchingPosts from '@screens/PaperScreen/api/fetchingPosts'

const Sdetail = () => {
    const [detail, setDetail] = useState(null);
    const [store, setStore] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { data, error, isError, isLoading } = useQuery(['articles'], fetchingPosts)

    useEffect(() => {
        stores();
        proData();
    }, []);

    const stores = async () => {
        let request = Config.custom_url() + "api/getStore";
        // let request = 'http://192.168.100.248/newpaper/public/index.php/api/getStore';
        console.log(request);
        const result = await fetch(request);
        const data = await result.json();
        setStore(data);
    }

    const proData = async () => {
        let request = Config.custom_url() + "api/sdetail";
        // let request = 'http://192.168.100.248/newpaper/public/index.php/api/sdetail';
        console.log(request);
        axios({
            method: 'get',
            url: request,
        }).then((response?: any) => {
            setDetail(response.data);
            setRefresh(false);
        });
    }

    const onRefresh = useCallback(() => {
        setRefresh(true)
        stores();
        proData();
    }, [])
    if (isLoading) {
        return <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
            <Image source={require('../../assets/Rolling-1s-200px.gif')} style={{width: 120, height: 120, resizeMode: 'cover'}}></Image>
        </View>
    }

    if (!detail ) {
        return <View>
            <Text>not has product detail data </Text>
        </View>
    } else {
        return (
            <View style={css.container}>
                <TopSerach></TopSerach>
                <ProDetail detail={detail}></ProDetail>
                {/* <View style={{maxHeight: 'auto', height: 300}}> */}
                {(() => {
                    if (store.length) {
                        return <StoreList stores={store}></StoreList>
                    } else {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: 250, height: 250, resizeMode: 'cover', borderRadius: 125 }} source={require('../../assets/pexels-brakou-abdelghani-1723637.jpg')}></Image>
                            </View>
                        )
                    }
                })()}
                {/* </View> */}
            </View>
        )
    }
}

const TopSerach = () => {
    const [search, setSearch] = useState('');
    useEffect(() => { }, [])
    return (
        <View style={css.topSearch}>
            <View style={css.location}>
                <Icon name='location-arrow' size={40} color='#4c4c4c' />
            </View>
            <View style={css.search}>
                <Icon name='search' size={28} color='#4c4c4c' />
                <TextInput
                    value={search}
                    style={css.postCode}
                    onChangeText={(text) => {
                        setSearch(text);
                    }}
                    onFocus={() => {

                    }}
                    placeholder="Postcode of plaats"
                ></TextInput>
            </View>
        </View>
    );
}

const ProDetail = (props?: any) => {
    const [selected, setSelected] = useState(null);

    useEffect(() => { }, [props])
    return (
        <View style={css.detailContainer}>
            <View style={css.proImgage}>
                <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    source={{ uri: 'https://cdn11.bigcommerce.com/s-4cnnicdo9y/images/stencil/120x180/products/2845/19117/08962-6911-fancy__50291.1685064043.jpg?c=1' }}></Image>
            </View>
            <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>{props?.detail?.data?.site?.product?.name}</Text>
                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, alignItems: 'flex-end' }}>
                    <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={{}}
                    >
                        {props?.detail?.data?.site?.product?.variants?.edges.map((i?: any) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setSelected(i?.node?.options?.edges[0]?.node?.values?.edges[0]?.node?.entityId)
                                }}>
                                    <View style={{ height: 50, width: 50, backgroundColor: i?.node?.options?.edges[0]?.node?.values?.edges[0]?.node?.entityId == selected ? '#00003d' : '#d8d8d8', marginLeft: 6, borderRadius: 10, justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: i?.node?.options?.edges[0]?.node?.values?.edges[0]?.node?.entityId == selected ? 'white' : 'black' }}>{i?.node?.options?.edges[0]?.node?.values?.edges[0]?.node?.label} </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const StoreList = (props?: any) => {
    useEffect(() => {
    }, [])
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}>
            {
                props?.stores &&
                <FlatList
                    data={props?.stores}
                    keyExtractor={(item) => { return item?.store?.id }}
                    renderItem={({ item }) => {
                        return <StoreItem store={item}></StoreItem>
                    }}
                ></FlatList>
            }
        </ScrollView>
    )
}

const StoreItem = (props?: any) => {
    const [show, setShow] = useState(true);
    const navigation = useNavigation();
    const stock = useMemo(() => {
        if (props.store?.stock <= 0) {
            return {
                color: "red",
                label: "Op voorraad"
            }
        } else if (props.store?.stock == 1) {
            return {
                color: "green",
                label: "Laatste stuk"
            }
        } else {
            return {
                color: "green",
                label: "Bijna uitverkocht"
            }
        }
    }, [props.store?.stock])

    useEffect(() => {
        // console.log(props);
    }, [])
    return (
        <View style={{ paddingHorizontal: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}>{props?.store?.store?.name}</Text>
                <Text style={{ fontSize: 16, color: stock.color }}>{stock.label}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontSize: 16, marginRight: 12 }}>{props?.store?.store?.city}</Text>
                    <TouchableOpacity onPress={() => {
                        setShow(!show)
                    }}>
                        <FontAwesome5Icon name={!show ? 'chevron-up' : 'chevron-down'} size={16} color='#b2b2b2' />
                    </TouchableOpacity>
                </View>
                <>
                    <Collapsible collapsed={show}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingRight: 8 }}>
                                {/* <Text>{props?.store?.store?.name}</Text> */}
                                <Text>{props?.store?.store?.addressLine1}</Text>
                                <Text>{props?.store?.store?.addressLine2}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name='phone' size={18} color='#b2b2b2' onPress={() => {
                                        Linking.openURL(`tel:${props?.store?.store?.phoneNumber}`)
                                    }} />
                                    <Text style={{ marginLeft: 10 }}>{props?.store?.store?.phoneNumber}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name='google' size ={18} color='#b2b2b2' onPress={() => {
                                        Linking.openURL(`mailto:${props?.store?.store?.email}`)
                                    }} />
                                    <Text style={{ marginLeft: 10 }}>{props?.store?.store?.email}</Text>
                                </View> 
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ backgroundColor: 'black', padding: 8 }} onPress={() => {
                                    Linking.openURL(`myapp://app/WebInApp/${props?.store?.store?.websiteUrl}`) // open webview screen with param: url
                                    // Linking.openURL(`myapp://app/WebInApp/`) // open webview screen with not url
                                    // navigation.goBack(); // go back
                                    // navigation.navigate("PaperScreen", { screen: "PaperCategory", params: { category_id: 3 } }) //(khong chay)

                                }}>
                                    <Text style={{ color: 'white' }}>Winkel Bekijken</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Collapsible>
                </>
            </View>
            <View style={{ height: 1, backgroundColor: '#b2b2b2' }}></View>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    location: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#4c4c4c",
        justifyContent: "center",
        alignItems: "center"
    },
    search: {
        width: '80%',
        backgroundColor: '#e8e8e8',
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 10
    },
    postCode: {
        height: 50,
        borderColor: "green",
        borderRadius: 6,
        paddingLeft: 8,
        width: "90%",
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    topSearch: {
        justifyContent: 'center',
        flexDirection: "row",
    },
    detailContainer: {
        marginTop: 30,
        flexDirection: 'row',
        width: '100%',
        height: Dimensions.get('screen').height / 6,
    },
    proImgage: {
        width: Dimensions.get('screen').width / 5,
    }
});

export { Sdetail };