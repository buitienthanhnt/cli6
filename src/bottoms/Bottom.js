import React, { useEffect, useMemo, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // npm install react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/native-stack
// import { Icon } from '@expo/vector-icons';                             // chạy được cả trên web và android. xem icon: https://icons.expo.fyi || install: npm i @expo/vector-icons
import Icon from 'react-native-vector-icons/FontAwesome';                 // xem icon https://oblador.github.io/react-native-vector-icons/
import AccountScreen from "@bottoms/tabs/AccountScreen";
import HomeScreen from "@bottoms/tabs/HomeScreen";
import PaperScreen from "@bottoms/tabs/PaperScreen";
import MoreScreen from "@bottoms/tabs/MoreScreen";
import CodeScreen from "@bottoms/tabs/CodeScreen";
import { connect } from "react-redux";
import useNotification from "@hooks/useNotification";

const Tab = createBottomTabNavigator();
const BottomTabs = ({ navigation, route }) => {
    const { notifi_count } = useNotification();

    const bottomTabs = useMemo(() => {
        return [
            {
                name: 'HomeScreen',
                component: HomeScreen,
                options: {
                    tabBarLabel: "Home",
                    tabBarShowLabel: false,     // ẩn bottom_tab title(tiêu đề của thanh dưới trang)
                    tabBarIcon: ({ focused, color, size }) => {
                        return (<Icon name={"home"} size={26} color={color} />);
                    },
                }
            },
            {
                name: 'PaperScreen',
                component: PaperScreen,
                options: {
                    tabBarLabel: 'Papers',
                    tabBarIcon: ({ focused, color, size }) => <Icon name={focused ? 'truck' : 'list'} size={26} color={color} />
                }
            },
            {
                name: 'AccountScreen',
                component: AccountScreen,
                options: {
                    tabBarLabel: 'User',
                    tabBarIcon: ({ focused, color, size }) => (<Icon name={"bug"} size={26} color={color} />)
                }
            },
            {
                name: 'MoreScreen',
                component: MoreScreen,
                tabBarOptions: { showLabel: false },
                options: {
                    tabBarLabel: 'More',
                    tabBarIcon: ({ focused, color, size }) => (<Icon name={"windows"} size={26} color={color} />)
                }
            },
            {
                name: 'CodeScreen',
                component: CodeScreen,
                tabBarOptions: { showLabel: false },
                options: {
                    tabBarLabel: 'code',
                    tabBarBadge: notifi_count,
                    tabBarShowLabel: false,     // ẩn bottom_tab title(tiêu đề của thanh dưới trang)
                    tabBarIcon: ({ focused, color, size }) => (<Icon name={'code'} size={26} color={color} />)
                }
            },
        ];
    }, [notifi_count]);

    return (
        <Tab.Navigator screenOptions={
            ({ route }) => ({
                tabBarActiveTintColor: '#669ddd', // màu icon mặc định là xanh, dùng như này sẽ là màu cà chua.
                tabBarInactiveTintColor: 'gray',  // gray cũng là màu mặc định luôn.
                headerShown: false                // ẩn phần tiêu đề bên trên của: Tab.Navigator
            })
        }
            initialRouteName="HomeScreen"
        // tabBarOptions={{ showLabel: false }} // ẩn bottom_tab title(tiêu đề của thanh dưới trang)
        >
            {bottomTabs.map((tab, index) => {
                return (
                    <Tab.Screen
                        key={'tabs_' + index}
                        name={tab.name}
                        component={tab.component}
                        options={tab.options}
                    />
                )
            })}

        </Tab.Navigator>
    );
}

export default connect(
    state => {
        return {
            g_data: state.paperRe
        }
    },
    dispatch => {
        return {
            update_message: () => {
                dispatch({ type: "ON_MESSAGE", });
            }
        };
    }
)(BottomTabs);
