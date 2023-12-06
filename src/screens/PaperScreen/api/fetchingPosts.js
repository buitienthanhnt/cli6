import axios from 'react-native-axios';

const fetchingPosts = async () => {
    // console.log("=====>", 'fetchingPosts', url);
	const res = await axios.get(url);
	return res.data;
}
export default fetchingPosts;