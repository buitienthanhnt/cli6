import { useEffect, useState } from "react";

const useDemo = () => {
	const [value, setValue] = useState(1);
	useEffect(()=>{
		setInterval(() => {
			setValue(value => value+1);
		}, 2000);
	}, [])
	const data = [1, 2, 3, 4, 5, 6];

	return { d: data, val: value }
}

export default useDemo;