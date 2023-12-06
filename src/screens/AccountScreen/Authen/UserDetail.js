import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { firebase } from "@react-native-firebase/auth";

const UserDetail = ({navigation})=>{
    const user = firebase.auth().currentUser;

    if (user) {
        console.log(user);
        return (
            <View style={{padding: 12}}>
                <Text>Logined</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>user: {user.email}</Text>
                <Text></Text>
                <TouchableOpacity style={{backgroundColor: 'rgba(119, 193, 145, 0.8)', borderRadius: 18, height: 36, justifyContent: "center", alignItems: 'center'}} onPress={()=>{
                    firebase.auth()
                    .signOut()
                    .then(() => {
                        console.log('User signed out!');
                        navigation.goBack();
                    });
                }}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
                <Text></Text>

                <TouchableOpacity 
                    style={{backgroundColor: 'rgba(119, 193, 145, 0.8)', borderRadius: 18, height: 36, justifyContent: "center", alignItems: 'center'}} 
                    onPress={()=>{
                   user.sendEmailVerification().then(()=>{
                    console.log('sendEmailVerification success!,');
                   }).catch(()=>{

                   })
                }}>
                    <Text>send verify email</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export {UserDetail};