import { useCallback, useEffect, useState } from "react";
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import firebaseType from "@utils/firebaseType";

const useCategory = () => {
	const [category, setCategory] = useState([]);

	useEffect(() => {
		const onValueChange = database().ref(firebaseType.realTime.categoryTree).on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				let _data = [];
				snapshot.forEach(item => {
					_data = item.val();
				})
				setCategory(_data);
			};
		})

		return () => database().ref(firebaseType.realTime.categoryTree).off('value', onValueChange);
	}, []);
	return category;
}

const usePapersFirebase = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const onData = database().ref(firebaseType.realTime.allPaper).orderByKey().on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				let _data = [];
				snapshot.forEach(item => {
					const data = item.val();
					if (data.id) {
						_data.push(data);
					} else {
						_data.push(data[Object.keys(data)[0]]);
					}
				})
				// _data.sort((a,b) => b.id - a.id); // sort by desc
				setData(_data.reverse()); // đảo ngược thứ tự data
				// setData(_data);
			};
		})

		return () => database().ref(firebaseType.realTime.allPaper).off('value', onData);
	}, []);

	return {
		data: data
	}
}

const usePaperDetailFirebase = (paperId) => {
	const [data, setData] = useState([]);

	const loadData = useCallback(async () => {
		try {
			firestore().collection(firebaseType.storeData.paperDetail).doc(paperId.toString()).get().then((snapshot) => { // doc phải là string, nếu là number có thể lỗi
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

const useCategoryTop = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const onData = database().ref(firebaseType.realTime.categoryTop).on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				snapshot.forEach(item => {
					setData(item.val());
				})
			};
		})

		return () => database().ref(firebaseType.realTime.categoryTop).off('value', onData);
	}, [])

	return {
		data: data
	};
}

const usePaperCategory = (categoryId) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const onData = database().ref(firebaseType.realTime.paperByCategory + categoryId).on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				let _data = [];
				snapshot.forEach(item => {
					_data.push(item.val());
				})
				setData(_data.reverse());
			};
		})

		return () => database().ref(firebaseType.realTime.paperByCategory + categoryId).off('value', onData);
	}, [categoryId]);

	return {
		data: data
	}
}

const useRelatedPaper = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const onData = database().ref(firebaseType.realTime.relatedPaper).orderByKey().limitToLast(6).on('value', (snapshot) => {
			if (snapshot.numChildren()) {
				let _data = [];
				snapshot.forEach(item => {
					_data.push(item.val());
				})
				setData(_data.reverse());
			}
		});
		return () => database().ref(firebaseType.realTime.relatedPaper).orderByKey().limitToLast(6).off('value', onData);
	}, [])
	return {
		data: data
	}
}

export {
	useCategory, usePapersFirebase, usePaperDetailFirebase,
	useCategoryTop, usePaperCategory, useRelatedPaper
};
