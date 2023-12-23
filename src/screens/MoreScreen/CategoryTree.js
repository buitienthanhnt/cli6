import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity, ImageBackground } from "react-native";
import Config from "@config/Config";
import axios from 'react-native-axios';                                // npm i react-native-axios
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'; // https://fontawesome.com/v5/search?q=right&o=r
import Collapsible from 'react-native-collapsible';                    // npm install --save react-native-collapsible
import { useCategory } from "@hooks/Firebase";

const CategoryTree = (props) => {
    const useFirebase = false;

    const [category_id, setCategoryId] = useState(0);
    const [tree, setTree] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    const categoryTree = useCategory();

    const getCategoryTree = useCallback(async () => {
        try {
            let request = Config.custom_url() + Config.api_request.getCategoryTree + Config.buy_params({ category_id: category_id });
            const detail = await fetch(request);
            var result = await detail.json();
            setTree(result);
            setRefresh(false)
        } catch (error) { // goi request ban loi khong co mang kha lau
            console.log(error);
            setLoading(false);
        }
    }, [category_id])

    useEffect(() => {
        getCategoryTree();
    }, [category_id])

    if (! (tree || categoryTree)) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {loading && <Image source={require("../../assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>}
            </View>);
    } else {
        return (
            <ImageBackground style={css.backGroundView} source={require("../../assets/pexels-brakou-abdelghani-1723637.jpg")}>
                <FlatList
                    data={(tree || categoryTree)?.items || []}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return <CategoryItem data={item} navigation={props.navigation}></CategoryItem>
                    }}
                    refreshing={refresh}
                    onRefresh={() => {
                        () => {
                            setRefresh(true);
                            CategoryTree()
                        }
                    }}
                ></FlatList>
            </ImageBackground>
        )
    }
}

const CategoryItem = (props) => {
    const [status, setStatus] = useState(true)
    useEffect(() => { }, [])

    return (
        <View style={{ paddingLeft: 6, paddingRight: 6 }}>
            <View style={css.categoryItem}>
                <TouchableOpacity onPress={() => {
                    props?.navigation.navigate("PaperScreen", { screen: "PaperListCategory", params: { category_id: props?.data?.id } })
                }} style={{ width: '70%' }}>
                    <Text style={css.categoryItemName}>{props?.data?.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props?.data?.items && setStatus(!status);
                }}>
                    {props?.data?.items && <FontAwesome5Icon name={status ? 'plus' : 'chevron-down'} size={18} color='#000000' />}
                </TouchableOpacity>
            </View>
            {props?.data?.items &&
                <Collapsible collapsed={status}>
                    <View style={{ paddingLeft: 10, paddingRight: 8 }}>
                        <FlatList
                            data={props?.data?.items}
                            renderItem={({ item }) => {
                                return <CategoryItem data={item} navigation={props.navigation}></CategoryItem>
                            }}
                        ></FlatList>
                    </View>
                </Collapsible>}
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
    },
    backGroundView: {
        flex: 1,
        paddingTop: 12,
        resizeMode: "cover"
    },
    categoryItem: {
        padding: 4,
        paddingLeft: 10,
        margin: 2,
        backgroundColor: "#c69eff", //"#dddddd",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 15,
        borderRadius: 4
    },
    categoryItemName: {
        fontSize: 18,
        color: "#000000"
    }
})

export { CategoryTree };
