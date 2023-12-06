import React, { useState, useReducer, useEffect, useRef, useCallback } from "react";
import { Button, Text, View, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";

import axios from 'react-native-axios';
import Config from "@config/Config";

import { fechData, getAxios, anyAxios } from "@hooks/NetWorking";
import * as RootNavigation from "@hooks/Navigate";
import { useNavigation } from '@react-navigation/native';

// yarn add @react-native-masked-view/masked-view react-native-linear-gradient
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import { BasicTable, TopTable } from "../components/Table";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import functions, { firebase } from '@react-native-firebase/functions';

// https://firebase.google.com/docs/database/web/lists-of-data?authuser=0#filtering_data
import database from '@react-native-firebase/database'; // https://rnfirebase.io/reference/database/reference
// https://www.youtube.com/watch?v=bpI3Bbhlcas
// https://rnfirebase.io/firestore/pagination
// https://www.youtube.com/watch?v=LlvBzyy-558
// https://firebase.google.com/docs/database/extend-with-functions?gen=1st

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return { count: state.count + 0.1, showText: state.showText };
			break;
		case 'toggle':
			return { count: state.count, showText: !state.showText };
		default:
			return state;
			break;
	}
};

const Test = () => {
	// console.log('popopopoop');
	const [value, setValue] = useState(0);
	const [viture, setViture] = useState(false);
	const [email, setEmail] = useState('');
	const input = useRef(null);
	const navigation = useNavigation();

	// goi 1 lan dau tien, sau do goi theo thay doi cua tham so lang nghe neu tham so do thay doi. can dat sau tham so lang nghe
	// các hook có thể được đặt trong if(){} ví dụ: if(a ==1){useEffect(()=>{})} nhưng không nên làm như này có thể gây ra lỗi.
	useEffect(() => {
		console.log('noi dung nam trong ham useeffect');

		// fetch('https://jsonplaceholder.typicode.com/todos/1')
		// 	.then(response => response.json())
		// 	.then(json => console.log(json));

		axios({ method: "get", url: 'https://jsonplaceholder.typicode.com/posts/1/comments' }).then((response) => {
			// setEmail(response?.data[1].email || 'email not found');
			// console.log('+++++');
			// console.log(response.data[0]);


		}).catch((error) => {
			console.log(error);
		});

		// hàm được return sẽ chỉ chạy khi element bị xóa hoặc bị thoát(ví dụ như khi back khỏi màn hình này)  
		return ()=>{
			console.log('call in function return from ussect___');
		}

	}, [email, value])


	const fetchData = async () => {

		// let url = Config.custom_url() + Config.api_request.testData; // test Get api
		let url = Config.custom_url() + Config.api_request.testData;
		const value = await fechData(url, null, "GET"); 	// dùng  fetch với method post sẽ không vào throw error được(là 1 hạn chế nên ưu tiên dùng asios).
		console.log(value);
	}

	// demo: https://www.thunderclient.com/welcome
	const fetchAxios = async () => {
		// anyAxios
		let url = Config.custom_url() + Config.api_request.testPost; 	// testPost test Post api with param
		const value = await anyAxios(url, { a: 1, b: 2 }, "POST");   		// dùng cho method post
		console.log(value);
	}



	const [state, dispatch] = useReducer(reducer, { count: 5, showText: false })
	const add = () => {
		// setValue(_setData);
		setValue(_setData);
	}

	const toScreen = (name, params = {}) => {
		RootNavigation.Navigate(name, params); // to paper detail
		// RootNavigation.LinkingNavigate('Code');
	}

	// setValue nhuw nay dusng hon(bat gia tri thuc te gan nhat) la gan vowi gia tri truc tiesp
	const _setData = (prev) => {
		return prev + 1;
	}
	return (
		<View style={{ padding: 8 }}>
			<Text>{value}: vi du ve setValue useState Hook</Text>
			<Button title="add" onPress={() => {
				add();
				setViture(!viture)
			}}></Button>
			<Text>=================================</Text>

			<Text>{state.count}</Text>
			{state.showText && <Text>show text for demo hook useReducer use dispatch</Text>}
			<Button title="dispath" onPress={() => {
				dispatch({ type: 'ADD' })
				dispatch({ type: 'toggle' })
			}}></Button>
			<Text>{'\n'}</Text>

			<Button title="fetch data api" onPress={() => {
				fetchData()
			}}></Button>
			<Text>{'\n'}</Text>

			<Button title="to CodeScreen by Hook" onPress={() => {
				toScreen('CodeScreen')
			}}></Button>
			<Text>{'\n'}</Text>

			<Button title="fetch data api axios" onPress={() => {
				fetchAxios()
			}}></Button>
			<Text>{'\n'}</Text>

			<View style={{ marginVertical: 10 }}>
				<SkeletonPlaceholder borderRadius={4} speed={1200} backgroundColor={'rgba(0, 0, 167, 0.4)'}>
					<SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
						<SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
						<SkeletonPlaceholder.Item marginLeft={20} width={'100%'} paddingRight={20}>
							<SkeletonPlaceholder.Item width={'50%'} height={20} />
							<SkeletonPlaceholder.Item marginTop={6} width={'70%'} height={20} />
							<SkeletonPlaceholder.Item marginTop={6} height={20} width={'70%'} />
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
				</SkeletonPlaceholder>
			</View>

			<View style={{ marginVertical: 10 }}>
				<SkeletonPlaceholder borderRadius={4} speed={1500} backgroundColor={'rgba(0, 0, 167, 0.4)'}>
					<SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
						<SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
						<SkeletonPlaceholder.Item marginLeft={20} width={'100%'} paddingRight={20}>
							<SkeletonPlaceholder.Item width={'50%'} height={20} />
							<SkeletonPlaceholder.Item marginTop={6} width={'70%'} height={20} />
							<SkeletonPlaceholder.Item marginTop={6} height={20} width={'70%'} />
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
				</SkeletonPlaceholder>
			</View>


			{/* <SkeletonPlaceholder borderRadius={4} speed={1250}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ width: 60, height: 60, borderRadius: 50 }} />
					<View style={{ marginLeft: 20 }}>
						<Image style={{ width: '100%', height: 20 }} src={require('@assets/Ripple-1s-200px.gif')} />
						<Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
					</View>
				</View>
			</SkeletonPlaceholder> */}
		</View>
	);
}

const CloudFun = () => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		firebase.functions().useEmulator('localhost', 5001);
		// trên máy ảo dùng localhost; khi dùng máy thật thì dùng qua ip.
		// firebase.functions().useEmulator('localhost', 5001);
	}, []);

	const callCloudFunction = useCallback(() => {
		functions()
			.httpsCallable('listProducts')({ abc: 123 })
			.then(response => {
				console.log(response.data);
				setProducts(response.data);
				setLoading(false);
			});
	});

	return (
		<View style={{ padding: 10 }}>
			<Text>
				CloudFun demo
			</Text>
			<TouchableOpacity style={{ backgroundColor: 'rgba(62, 234, 78, 0.9)', justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 8 }}
				onPress={callCloudFunction}
			>
				<Text style={{ fontSize: 18, fontWeight: 500 }}>call to server cloud funvtion</Text>
			</TouchableOpacity>
		</View>
	)
};

const DataBase = () => {
	// lắng nghe thay đổi database trên firebase theo thời gian thực dung ham: on()
	const [data, setData] = useState([]);
	const orderType = "email"
	const [lastEmail, setLastEmail] = useState('');
	const page_size = 8;
	useEffect(() => {
		// const _database = database().ref('/user').limitToFirst(1).once() || tren xuong
		// const _database = database().ref('/user').limitToLast(3).once() ||duoi len
		// orderByChild sap xep theo: 'id'(to len truoc).
		// .orderByChild("id").startAt(15) || orderByChild("name").startAt("nan") sau khi sap xep bat dau voi gia tri id=15(neu khong co tra ve null)
		// orderByValue sap xep theo gia tri: https://firebase.google.com/docs/reference/js/v8/firebase.database.Query#orderbyvalue
		// database().ref('/user').orderByChild("id").limitToFirst(3) : sap xep theo id
		// database().ref('/user').orderByChild("id").equalTo(7): id co gia tri bang 7
		const _database = database().ref('/user').orderByChild(orderType).limitToFirst(page_size - 1).on('value', snapshot => { // .limitToFirst(10) orderByValue() // startAt orderByKey()
			if (snapshot) {
				const value = snapshot.val();
				if (value) {
					// var result = Object.keys(value).map((key) => {
					// 	let _value = value[key];
					// 	_value.key = key;
					// 	return _value;
					// });

					var result = [];
					let lastIndex = null;
					snapshot.forEach((snap) => { // phai dung qua forEach.
						const convert_value = snap.val();
						convert_value.key = snap.key;
						result.push(convert_value);
					});
					if (result) {
						setData(result);
						setLastEmail(lastIndex);
					}
				} else {
					console.log('not has data value');
				}
			}
		});
		return () => database().ref('/user').off('value', _database);
	}, []);

	const loadUser = () => {
		var ref = database().ref("user");
		ref.orderByChild(orderType).startAt(lastEmail).limitToFirst(page_size).once("value", function (snapshot) {
			let result = []; let _lastEmail = null;
			if (snapshot.numChildren() > 1) {

				snapshot.forEach((snap) => {
					if (snap.val().email !== lastEmail) {
						const convert_value = snap.val();
						convert_value.key = snap.key;
						result.push(convert_value);
						_lastEmail = convert_value.email;
					}
				});

				if (result && _lastEmail) {
					setLastEmail(email => _lastEmail);
					setData(old => [...old, ...result]);
				}
			}
		});
	};

	const getDb = (type) => {
		// const scores = database().ref('a').orderByValue().once('value');
		database()
			.ref(type || '/user').orderByValue()
			.once('value')
			.then(snapshot => {
				console.log('User datas: ', snapshot);
			});
	};

	// ghi de toan bo data cua nut tham chieu
	const setDb = () => {
		database()
			.ref('/user/123')
			.update({
				age: 32,
			})
			.then(() => console.log('Data updated.'));
	}

	const AddDb = () => {
		const addNewDb = () => {
			console.log('addNewDb');
			const newReference = database().ref('/user').push();
			console.log('Auto generated key: ', newReference.key);
			newReference
				.set({ "active": true, "id": 15, "name": "nan 2", "phone": "2345567", email: 'e@gmail.com' })
				.then(() => console.log('Data updated.'));
		};

		return (
			<View style={{ paddingVertical: 8 }}>
				<TouchableOpacity style={css.btn} onPress={addNewDb}>
					<Text>add new databases</Text>
				</TouchableOpacity>
			</View>
		)
	}

	const UpdateDB = async (id) => {
		database()
			.ref(`/user/${id}`)
			.update({
				name: 'name after update',
				address: "21b"
			})
			.then(() => console.log('Data updated.'));
	};

	const deleteDB = async (id) => {
		await database().ref(`/user/${id}`).remove();
	}

	const checkData = async (ref) => {
		// nhat dinh phai co: orderByKey
		// orderByChild('id').startAt(12).limitToFirst(2) // bat dau 12 lay tiep 2 phan tu
		// .orderByChild('id').startAt(12).endAt(16) // bat dau voi gia tri id 12 ket thuc voi 16
		// .orderByChild('id').equalTo(23) // sap xep theo id va id bang voi 23
		// .orderByKey().equalTo('-Ni3sDqBQZz5e1BkuweW') // sap xep theo key va bang: -Ni3sDqBQZz5e1BkuweW


		//
		// var commentsRef = await database.database().ref('device').orderByKey().startAt(0).endAt(16).once('value', (snapshot)=>{
		// 	console.log('_____+', snapshot.val());
		// 	return snapshot.val();
		// });
		// const element = database.database().ref('device').child('0'); // lay con
		// const element = database.database().ref('device').root; // lay toan bo database.(cha cua root la null)
		// const element = database.database().ref('device/0').parent; // lay phan tu cha cua: device/0 chinh la device.

		// console.log('key: ', element);
		// element.once('value', (snapshot)=>{
		// 		console.log(snapshot);
		// 	});

		// so sanh 2 phan tu
		// const ref1 = firebase.database().ref('user').orderByKey().endAt('xJ0kjSGheMMn');
		// const ref2 = firebase.database().ref('user').endAt('3voY2xJ0kjSGheMMn').orderByKey();
		// console.log('ref log ', ref1.isEqual(ref2)); // true || false


		// get and order by key(key phai chinh xac)
		firebase.database().ref('user').orderByChild('email').startAt('e@gmail').limitToFirst(4).once('value', (snapshot) => {
			let result = [];
			snapshot.forEach((snapshot) => { // phai dung qua forEach.
				result.push(snapshot.val());
			});
			console.log(result);
		});
	}

	return (
		<View style={{ flex: 1, padding: 10 }}>
			<Text>new databases screen</Text>
			<TouchableOpacity
				style={{ padding: 10, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(25, 190, 116, 0.7)', borderRadius: 10 }}
				onPress={() => { getDb() }}
			>
				<Text>get database from realtime firebase</Text>
			</TouchableOpacity>
			<AddDb></AddDb>

			<TouchableOpacity
				style={{ padding: 10, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(25, 190, 116, 0.7)', borderRadius: 10 }}
				onPress={() => { getDb('device') }}
			>
				<Text>get device</Text>
			</TouchableOpacity>

			<FlatList data={data}
				ListHeaderComponent={() => {
					return (
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ flex: 10 }}> id </Text>
							<Text style={{ flex: 50 }}> name </Text>
							<Text style={{ flex: 50 }}> email </Text>
							<Text style={{ flex: 20 }}> edit </Text>
							<Text style={{ flex: 20 }}> delete </Text>
						</View>
					)
				}}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => {
					return (
						<View style={{ flexDirection: 'row', paddingVertical: 2 }}>
							<Text style={{ flex: 10 }}> {item.id} </Text>
							<Text style={{ flex: 50 }}> {item.name} </Text>
							<Text style={{ flex: 50 }}> {item.email} </Text>
							<View style={{ paddingVertical: 1, flex: 20, justifyContent: 'center', alignItems: 'center' }}>
								<TouchableOpacity
									style={{ flex: 20, backgroundColor: 'rgba(150, 1, 215, 0.5)', borderRadius: 6, }}
									onPress={() => {
										UpdateDB(item.key);
									}}
								>
									<Text> edit </Text>
								</TouchableOpacity>
							</View>
							<View style={{ paddingVertical: 1, flex: 20, justifyContent: 'center', alignItems: 'center' }}>
								<TouchableOpacity
									style={{ backgroundColor: 'rgba(0, 208, 86, 0.7)', borderRadius: 6, }}
									onPress={() => {
										deleteDB(item.key)
									}}
								>
									<Text> delete </Text>
								</TouchableOpacity>
							</View>
							<View style={{ height: 1, backgroundColor: 'black' }}></View>
						</View>)
				}}></FlatList>

			<TouchableOpacity
				style={{ padding: 10, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(25, 190, 116, 0.7)', borderRadius: 10 }}
				onPress={() => {
					loadUser()
				}}
			>
				<Text>load more</Text>
			</TouchableOpacity>
			<Text>{'\n'}</Text>



			<TouchableOpacity
				style={{ padding: 10, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(25, 190, 116, 0.7)', borderRadius: 10 }}
				onPress={() => {
					// checkData("user");

					// var ref = database.database().ref("user/9"); // database.database().ref("user/9"):  {"active": true, "email": "e9@gmail.com", "id": 9, "name": "nan 9", "phone": "9999"}
					// ref.orderByChild("id").on("value", function (snapshot) {
					// 	console.log(snapshot); // getChild key=9: {"active": true, "email": "e9@gmail.com", "id": 9, "name": "nan 9", "phone": "9999"}
					// })

					var ref = database.database().ref("user/-Ni3sDqBQZz5e1BkuweW/active");
					ref.orderByValue().once("value", function (snapshot) {
						console.log('_____', snapshot); // getChild key=9: {"active": true, "email": "e9@gmail.com", "id": 9, "name": "nan 9", "phone": "9999"}
					})
				}}
			>
				<Text>check</Text>
			</TouchableOpacity>
		</View>
	);
};

const css = StyleSheet.create({
	btn: {
		padding: 10, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(25, 190, 116, 0.7)', borderRadius: 10
	}
});

const styles = StyleSheet.create({
	container: { padding: 5, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 40, backgroundColor: '#f1f8ff' },
	wrapper: { flexDirection: 'row' },
	title: { flex: 1, backgroundColor: '#f6f8fa' },
	row: { height: 28 },
	text: { textAlign: 'center' }
});

export { Test, CloudFun, DataBase };
