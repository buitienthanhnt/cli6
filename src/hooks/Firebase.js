import { useEffect, useState } from "react";
import database from '@react-native-firebase/database';

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

export { useCategory, usePapersFirebase };