import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Button, Dimensions, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, LogBox } from "react-native";
import { connect } from "react-redux";
import { check, request, requestNotifications, PERMISSIONS, RESULTS } from 'react-native-permissions';
import useDispatchState from '@hooks/redux/useDispatchState';
import { _css } from "@styles/css";

const TestRedux = (props) => {
	const { actionReducer, updateState } = useDispatchState();
	return (
		<View style={{ flex: 1, padding: 10 }}>
			<Text>{props.g_data.number}</Text>
			<TouchableOpacity
				style={_css.button}
				onPress={() => {
					// props.add_value(3)
					updateState(actionReducer.addNumber, 4)
				}}>
				<Text>add</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={_css.button}
				onPress={() => {
					props.sub_value()
				}}>
				<Text>delete</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={_css.button}
				onPress={() => {
					check(PERMISSIONS.IOS.LOCATION_ALWAYS)
						.then((result) => {
							switch (result) {
								case RESULTS.UNAVAILABLE:
									console.log('This feature is not available (on this device / in this context)');
									break;
								case RESULTS.DENIED:
									console.log('The permission has not been requested / is denied but requestable');
									break;
								case RESULTS.LIMITED:
									console.log('The permission is limited: some actions are possible');
									break;
								case RESULTS.GRANTED:
									console.log('The permission is granted');
									break;
								case RESULTS.BLOCKED:
									console.log('The permission is denied and not requestable anymore');
									break;
							}
						})
						.catch((error) => {
							console.log('====================================');
							console.log(error);
						});
				}}>
				<Text>
					check permission
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={_css.button}
				onPress={() => {
					// requestNotifications().then((result)=>{
					// 	console.log('====================================');
					// 	console.log(result);
					// 	console.log('====================================');
					// });

					// request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
					// 	// …
					//   });

					// POST_NOTIFICATIONS
					request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS.LOCATION_ALWAYS).then((result) => {
						// …
						console.log(result);
					});
				}}>
				<Text>request</Text>
			</TouchableOpacity>
		</View>
	);
}

export default connect(
	state => {
		return { g_data: state.numberRe }
	},
	dispatch => {
		return {
			add_value: (value) => {
				dispatch({
					type: 'ADD_NUMBER',
					value: value,
				})
			},
			sub_value: () => {
				dispatch({
					type: 'SUB_NUMBER',
				})
			},
		}
	}
)(TestRedux);

const css = StyleSheet.create({
	button: {
		backgroundColor: 'violet', justifyContent: 'center',
		alignItems: 'center', borderRadius: 5, height: 30, marginVertical: 4
	}
})