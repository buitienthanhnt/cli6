import { useCallback, useEffect, useState } from "react";
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const useCategory = () => {
	const [category, setCategory] = useState([]);

	useEffect(() => {
		const onValueChange = database().ref('newpaper/category').on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				let _data = [];
				snapshot.forEach(item => {
					_data = item.val();
				})
				setCategory(_data);
			};
		})

		return () => database().ref('newpaper/category').off('value', onValueChange);
	}, []);
	return category;
}

const usePapersFirebase = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const onData = database().ref('newpaper/papers').on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				let _data = [];
				snapshot.forEach(item => {
					_data.push(item.val());
				})
				setData(_data);
			};
		})

		return () => database().ref('newpaper/papers').off('value', onData);
	}, []);

	return {
		data: data
	}
}

const usePaperDetailFirebase = (paperId) => {
	const [data, setData] = useState([]);

	const loadData = useCallback(async () => {
		try {
			firestore().collection('detailContent').doc(paperId.toString()).get().then((snapshot) => { // doc phải là string, nếu là number có thể lỗi
				if (snapshot) {
					setData(snapshot._data);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [paperId]);

	useEffect(() => {
		loadData();
		// firestore().collection('detailContent').doc(paperId.toString()).onSnapshot((documentSnapshot)=>{
		// 	console.log('________________', documentSnapshot);
		// 	if (documentSnapshot) {
		// 		setData(documentSnapshot.data());
		// 	}
		// });
	}, [loadData]);

	return {
		detail: data
	}
}

export { useCategory, usePapersFirebase, usePaperDetailFirebase };