import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Button, Dimensions, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, LogBox } from "react-native";
import { connect } from "react-redux";

const TestRedux = (props)=>{
	console.log('123');
	return(
		<View style={{flex: 1, padding: 10}}>
			<Text>{props.g_data.number}</Text>
			<TouchableOpacity 
				style={{backgroundColor: 'violet', justifyContent: 'center', alignItems: 'center', borderRadius: 5, height: 30,}} 
				onPress={()=>{
					props.add_value(3)
				}}>
				<Text>add</Text>
			</TouchableOpacity>
			<Text></Text>

			<TouchableOpacity 
				style={{backgroundColor: 'violet', justifyContent: 'center', alignItems: 'center', borderRadius: 5, height: 30,}} 
				onPress={()=>{
					props.sub_value()
				}}>
				<Text>delete</Text>
			</TouchableOpacity>
		</View>
	);
}

export default connect(
	state => {
		return {g_data: state.numberRe}
	},
	dispatch =>{
		return{
			add_value: (value)=>{
				dispatch({
					type: 'ADD_NUMBER',
					value: value,
				})
			},
			sub_value: ()=>{
				dispatch({
					type: 'SUB_NUMBER',
				})
			},
		}
	}
)(TestRedux);